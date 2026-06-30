import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav"
};

const mediaExtensions = new Set([".mp4", ".mp3", ".wav"]);
const compressibleExtensions = new Set([".html", ".css", ".js", ".json", ".svg"]);

function sendStream(response, filePath, streamOptions, gzip = false) {
  const stream = createReadStream(filePath, streamOptions);
  stream.on("error", () => {
    if (!response.headersSent) response.writeHead(500);
    response.end();
  });
  if (gzip) stream.pipe(createGzip({ level: 6 })).pipe(response);
  else stream.pipe(response);
}

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = normalize(join(root, relativePath));

    if (!filePath.startsWith(root)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    const initialInfo = await stat(filePath);
    const resolvedPath = initialInfo.isDirectory() ? join(filePath, "index.html") : filePath;
    const info = initialInfo.isDirectory() ? await stat(resolvedPath) : initialInfo;
    const extension = extname(resolvedPath).toLowerCase();
    const contentType = mimeTypes[extension] || "application/octet-stream";
    const etag = `W/\"${info.size}-${Math.trunc(info.mtimeMs).toString(16)}\"`;
    const needsRevalidation = compressibleExtensions.has(extension);
    const baseHeaders = {
      "Content-Type": contentType,
      "Cache-Control": needsRevalidation ? "no-cache" : "public, max-age=3600, must-revalidate",
      ETag: etag
    };

    if (request.headers["if-none-match"] === etag && !request.headers.range) {
      response.writeHead(304, baseHeaders).end();
      return;
    }

    const range = mediaExtensions.has(extension) ? request.headers.range : undefined;
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match) {
        response.writeHead(416, { ...baseHeaders, "Content-Range": `bytes */${info.size}` }).end();
        return;
      }

      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
      if (start > end || start >= info.size) {
        response.writeHead(416, { ...baseHeaders, "Content-Range": `bytes */${info.size}` }).end();
        return;
      }

      response.writeHead(206, {
        ...baseHeaders,
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${info.size}`,
        "Content-Length": end - start + 1
      });
      if (request.method === "HEAD") response.end();
      else sendStream(response, resolvedPath, { start, end });
      return;
    }

    const acceptsGzip = /\bgzip\b/.test(request.headers["accept-encoding"] || "");
    const useGzip = acceptsGzip && compressibleExtensions.has(extension) && info.size > 1024;
    response.writeHead(200, {
      ...baseHeaders,
      ...(mediaExtensions.has(extension) ? { "Accept-Ranges": "bytes" } : {}),
      ...(useGzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : { "Content-Length": info.size })
    });
    if (request.method === "HEAD") response.end();
    else sendStream(response, resolvedPath, undefined, useGzip);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}`);
});
