const assert = require('node:assert/strict');
const fs = require('node:fs');
(async()=>{
  const url='http://127.0.0.1:4174/assets/videos/wechat/drink-tvc.mp4';
  const size=fs.statSync('assets/videos/wechat/drink-tvc.mp4').size;
  for(const [range,length,start,end] of [['bytes=0-1023',1024,0,1023],['bytes=-1024',1024,size-1024,size-1],['bytes=1024-',size-1024,1024,size-1]]){
    const res=await fetch(url,{headers:{Range:range}});
    assert.equal(res.status,206);
    assert.equal(res.headers.get('content-range'),`bytes ${start}-${end}/${size}`);
    assert.equal((await res.arrayBuffer()).byteLength,length);
  }
  for(const range of ['bytes=-0','bytes=-','bytes=9999999999999999999999-'])assert.equal((await fetch(url,{headers:{Range:range}})).status,416);
  console.log('Range requests and invalid ranges passed');
})().catch(e=>{console.error(e);process.exit(1)});
