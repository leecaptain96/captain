import { gsap as gsapEngine, ScrollTrigger as ScrollTriggerPlugin } from "../assets/vendor/gsap-bundle.min.js?v=20260630-perf";
import { aiVideos, musicTracks, profile, skills, soundProject, works } from "../data/portfolio.js?v=20260701-fields1";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const mediaUrl = (src) => `${src}?v=20260701-seek1`;

function hydrateProfile() {
  $("[data-profile-intro]").textContent = profile.introduction;
  $("[data-profile-second]").textContent = profile.secondParagraph;
  $("[data-capabilities]").innerHTML = profile.capabilities
    .map((item) => `<span>${item}</span>`)
    .join("");
  $("[data-fields]").innerHTML = profile.fields
    .map((item, index) => `<li><span>0${index + 1}</span>${item}</li>`)
    .join("");
  $("[data-email]").textContent = profile.contact.email;
  $("[data-email-link]").href = `mailto:${profile.contact.email}`;
  $("[data-wechat]").textContent = profile.contact.wechat;
  $("[data-phone]").textContent = profile.contact.phone;
  $("[data-douyin]").textContent = profile.contact.douyin;
}

function renderWorks() {
  $("[data-works]").innerHTML = works
    .map(
      (work, index) => `
      <article
        class="orbit-work"
        style="--orbit-index:${index}; --orbit-count:${works.length}; --orbit-delay:${(-34 * index / works.length).toFixed(2)}s"
        data-project="${work.id}"
        tabindex="0"
        role="button"
        aria-label="打开项目：${work.title}"
      >
        <div class="orbit-work-frame">
          <img src="${work.cover}" alt="${work.alt}" loading="lazy" />
          <span class="orbit-work-shade"></span>
          <span class="orbit-work-index">${work.index}</span>
          <span class="orbit-work-open">OPEN ↗</span>
        </div>
        <div class="orbit-work-caption">
          <strong>${work.title}</strong>
          <span>${work.type} / ${work.year}</span>
        </div>
      </article>`
    )
    .join("");
}

function hydrateSoundProject() {
  $("[data-sound-project-image]").src = soundProject.image;
  $("[data-sound-project-role]").textContent = `${soundProject.role} / ${soundProject.year}`;
  $("[data-sound-project-title]").textContent = soundProject.title;
  $("[data-sound-project-summary]").textContent = soundProject.summary;
  $("[data-sound-project-awards]").innerHTML = soundProject.awards
    .map((award) => `<p>${award}</p>`)
    .join("");
}

function bindVideoOverlay(container) {
  if (!container) return;
  const video = $("video", container);
  const button = $("[data-video-play]", container);
  if (!video || !button || button.dataset.bound === "true") return;
  button.dataset.bound = "true";

  const update = () => container.classList.toggle("is-playing", !video.paused && !video.ended);
  button.addEventListener("click", () => video.play().catch(() => {}));
  video.addEventListener("play", update);
  video.addEventListener("pause", update);
  video.addEventListener("ended", update);
  video.addEventListener("loadedmetadata", update);
  update();
}

function initExclusiveMediaPlayback() {
  document.addEventListener(
    "play",
    (event) => {
      const activeMedia = event.target;
      if (!(activeMedia instanceof HTMLMediaElement) || activeMedia.classList.contains("hero-video")) return;

      $$("audio, video").forEach((media) => {
        if (media !== activeMedia && !media.paused) media.pause();
      });
    },
    true
  );
}

function initHeroVariableProximity() {
  const container = $(".hero-content");
  const title = $(".hero-title");
  if (!container || !title || !window.matchMedia("(pointer: fine)").matches) return;

  const characters = [];
  $$(":scope > span", title).forEach((line) => {
    const label = line.textContent.trim();
    line.textContent = "";
    [...label].forEach((character) => {
      const span = document.createElement("span");
      span.className = "proximity-char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = character === " " ? "\u00a0" : character;
      line.append(span);
      characters.push(span);
    });
    const accessibleLabel = document.createElement("span");
    accessibleLabel.className = "sr-only";
    accessibleLabel.textContent = label;
    line.append(accessibleLabel);
  });

  const radius = 190;
  const centers = [];
  const previousStrengths = new Array(characters.length).fill(-1);
  let pointerX = -1000;
  let pointerY = -1000;
  let frameId = 0;
  let measureId = 0;
  let interactionMeasured = false;

  const measureCharacters = () => {
    measureId = 0;
    characters.forEach((character, index) => {
      const rect = character.getBoundingClientRect();
      centers[index] = {
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + rect.height / 2 + window.scrollY
      };
    });
  };

  const scheduleMeasure = () => {
    interactionMeasured = false;
    if (!measureId) measureId = requestAnimationFrame(measureCharacters);
  };

  const render = () => {
    frameId = 0;
    const pagePointerX = pointerX + window.scrollX;
    const pagePointerY = pointerY + window.scrollY;
    characters.forEach((character, index) => {
      const center = centers[index];
      if (!center) return;
      const distance = Math.hypot(pagePointerX - center.x, pagePointerY - center.y);
      const normalized = Math.max(0, 1 - distance / radius);
      const strength = normalized * normalized;
      if (Math.abs(strength - previousStrengths[index]) < 0.018) return;
      previousStrengths[index] = strength;
      character.style.setProperty("--proximity-shift", `${(-0.055 * strength).toFixed(4)}em`);
      character.style.setProperty("--proximity-scale-x", (1 + strength * 0.08).toFixed(3));
      character.style.setProperty("--proximity-scale-y", (1 + strength * 0.12).toFixed(3));
      character.style.setProperty("--proximity-acid", `${(strength * 13).toFixed(2)}%`);
    });
  };

  const schedule = () => {
    if (!frameId) frameId = requestAnimationFrame(render);
  };

  container.addEventListener("pointermove", (event) => {
    if (!interactionMeasured) {
      measureCharacters();
      interactionMeasured = true;
    }
    pointerX = event.clientX;
    pointerY = event.clientY;
    schedule();
  }, { passive: true });

  container.addEventListener("pointerleave", () => {
    pointerX = -1000;
    pointerY = -1000;
    schedule();
  });

  measureCharacters();
  window.addEventListener("resize", scheduleMeasure, { passive: true });
  document.fonts?.ready.then(scheduleMeasure);
}

function initHeroNoise() {
  const canvas = $("[data-hero-noise]");
  const hero = $(".hero");
  if (!canvas || !hero) return;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const patternSize = 220;
  const refreshInterval = 4;
  const patternAlpha = 15;
  canvas.width = patternSize;
  canvas.height = patternSize;

  const imageData = context.createImageData(patternSize, patternSize);
  const pixels = imageData.data;
  let animationId = 0;
  let frame = 0;
  let visible = true;

  const draw = () => {
    for (let index = 0; index < pixels.length; index += 4) {
      const value = Math.random() * 255;
      pixels[index] = value;
      pixels[index + 1] = value;
      pixels[index + 2] = value;
      pixels[index + 3] = patternAlpha;
    }
    context.putImageData(imageData, 0, 0);
  };

  const loop = () => {
    if (!visible || document.hidden) {
      animationId = 0;
      return;
    }
    if (frame % refreshInterval === 0) draw();
    frame += 1;
    animationId = requestAnimationFrame(loop);
  };

  const start = () => {
    if (!animationId && visible && !document.hidden) animationId = requestAnimationFrame(loop);
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    }
  }, { threshold: 0.01 });

  observer.observe(hero);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && animationId) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    } else {
      start();
    }
  });
  draw();
  start();
}

function initAmbientMotion() {
  const media = $(".hero-media");
  if (media) {
    gsapEngine.to(media, {
      scale: 1.018,
      xPercent: -0.45,
      yPercent: 0.35,
      duration: 13,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  $$(".section-head, .works-head, .media-head").forEach((heading) => {
    gsapEngine.fromTo(
      heading,
      { "--line-reveal": 0 },
      {
        "--line-reveal": 1,
        duration: 1.45,
        ease: "power4.inOut",
        scrollTrigger: { trigger: heading, start: "top 86%", once: true }
      }
    );
  });
}

function renderMediaLab() {
  const reelPlayer = $("[data-reel-player]");
  const reelNow = $("[data-reel-now]");
  const reelList = $("[data-reel-list]");
  const reelCode = $("[data-reel-code]");
  const musicPlayer = $("[data-music-player]");
  const musicNow = $("[data-music-now]");
  const musicList = $("[data-music-list]");
  bindVideoOverlay($(".reel-screen"));

  const barWork = works.find((item) => item.id === "bar-space");
  const mediaVideos = [
    ...aiVideos.map((video) => ({ ...video, label: "AI VIDEO WORK" })),
    ...(barWork
      ? [{
          id: barWork.id,
          title: barWork.title,
          category: "实拍 / 拍摄与剪辑",
          duration: barWork.duration,
          src: barWork.video,
          poster: barWork.cover,
          label: "REAL SHOOT / EDIT WORK"
        }]
      : [])
  ];

  const setVideo = (id) => {
    const video = mediaVideos.find((item) => item.id === id) || mediaVideos[0];
    reelPlayer.pause();
    reelPlayer.src = mediaUrl(video.src);
    reelPlayer.poster = video.poster;
    reelPlayer.setAttribute("aria-label", `${video.title}视频作品`);
    reelPlayer.load();
    reelCode.textContent = `${video.label} / LOCAL PREVIEW`;
    reelNow.innerHTML = `<span>${video.category}</span><h3>${video.title}</h3><p>${video.duration} / ${video.label}</p>`;
    $$('[data-video-id]', reelList).forEach((button) => {
      button.classList.toggle("is-active", button.dataset.videoId === video.id);
      button.setAttribute("aria-pressed", String(button.dataset.videoId === video.id));
    });
  };

  reelList.innerHTML = mediaVideos
    .map(
      (video, index) => `
        <button type="button" data-video-id="${video.id}" aria-pressed="false">
          <span>0${index + 1}</span>
          <strong>${video.title}</strong>
          <small>${video.category}</small>
          <i>${video.duration}</i>
        </button>`
    )
    .join("");
  reelList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-video-id]");
    if (button) setVideo(button.dataset.videoId);
  });

  const setTrack = (id) => {
    const track = musicTracks.find((item) => item.id === id) || musicTracks[0];
    musicPlayer.pause();
    musicPlayer.src = track.src;
    musicPlayer.setAttribute("aria-label", `${track.title} AI 音乐作品`);
    musicPlayer.load();
    musicNow.innerHTML = `<span>NOW PLAYING / ${track.mood}</span><h4>${track.title}</h4><p>${track.duration}</p>`;
    $$('[data-track-id]', musicList).forEach((button) => {
      button.classList.toggle("is-active", button.dataset.trackId === track.id);
      button.setAttribute("aria-pressed", String(button.dataset.trackId === track.id));
    });
  };

  musicList.innerHTML = musicTracks
    .map(
      (track, index) => `
        <button type="button" data-track-id="${track.id}" aria-pressed="false">
          <span>0${index + 1}</span><strong>${track.title}</strong><small>${track.mood}</small><i>${track.duration}</i>
        </button>`
    )
    .join("");
  musicList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-track-id]");
    if (button) setTrack(button.dataset.trackId);
  });

  setVideo(mediaVideos[0].id);
  setTrack(musicTracks[0].id);
}

function renderSkills() {
  $("[data-skills]").innerHTML = skills
    .map(
      (skill) => `
      <article class="skill-item reveal">
        <span class="skill-number">${skill.number}</span>
        <div class="skill-name">
          <h3>${skill.title}</h3>
          <p>${skill.english}</p>
        </div>
        <p class="skill-detail">${skill.detail}</p>
        <span class="skill-arrow">↘</span>
      </article>`
    )
    .join("");
}

function projectTemplate(work) {
  return `
    <header class="project-topbar">
      <a class="project-brand" href="#top">LI JIAMIN / PROJECT ARCHIVE</a>
      <button class="project-close" type="button" data-project-close aria-label="关闭项目详情">
        <span>CLOSE</span><i></i><i></i>
      </button>
    </header>

    <article class="project-archive">
      <section class="project-hero">
        <img src="${work.cover}" alt="${work.alt}" />
        <div class="project-hero-shade"></div>
        <div class="project-hero-copy">
          <p>${work.index} / ${work.type.toUpperCase()} / ${work.year}</p>
          <h2 id="project-dialog-title">${work.title}</h2>
          <span>${work.englishTitle}</span>
        </div>
        <div class="project-credit">
          <span>ROLE<br /><b>${work.role}</b></span>
          <span>FORMAT<br /><b>${work.typeZh}</b></span>
          <span>DURATION<br /><b>${work.duration}</b></span>
        </div>
      </section>

      <section class="archive-section project-overview">
        <div class="archive-index">A / PROJECT BACKGROUND</div>
        <h3>${work.short}</h3>
        <p>${work.background}</p>
      </section>

      <section class="archive-section project-concept">
        <div class="archive-index">B / CREATIVE CONCEPT</div>
        <div class="concept-image"><img src="${work.frames[1]}" alt="${work.title}概念视觉" /></div>
        <div class="concept-copy">
          <h3>创意说明</h3>
          <p>${work.concept}</p>
          <div class="concept-tags"><span>VISUAL SYSTEM</span><span>NARRATIVE</span><span>LIGHTING</span></div>
        </div>
      </section>

      <section class="archive-section project-storyboard">
        <div class="archive-index">C / STORYBOARD</div>
        <div class="storyboard-grid">
          ${work.frames
            .map(
              (frame, index) => `
              <figure>
                <img src="${frame}" alt="${work.title}分镜 ${index + 1}" />
                <figcaption>SCENE 0${index + 1} <span>${["ESTABLISHING", "OBJECT / DETAIL", "CHARACTER / CLOSE"][index]}</span></figcaption>
              </figure>`
            )
            .join("")}
        </div>
      </section>

      <section class="archive-section project-settings">
        <div class="archive-index">D / CHARACTER & WORLD</div>
        <div class="setting-block">
          <span>01</span><h3>角色设定</h3><p>${work.character}</p>
        </div>
        <div class="setting-block">
          <span>02</span><h3>场景设定</h3><p>${work.scene}</p>
        </div>
      </section>

      <section class="archive-section project-video">
        <div class="archive-index">E / FILM</div>
        <div class="video-placeholder">
          <video controls playsinline preload="metadata" poster="${work.cover}" aria-label="${work.title}作品视频">
            <source src="${mediaUrl(work.video)}" type="video/mp4" />
            当前浏览器不支持视频播放。
          </video>
          <button class="video-play-overlay" type="button" data-video-play aria-label="播放${work.title}"><span></span></button>
          <small>${work.kind === "live-action" ? "REAL SHOOT / EDIT WORK" : "REAL AI WORK"} / LOCAL VIDEO PREVIEW / ${work.duration}</small>
        </div>
      </section>

      <footer class="project-end">
        <p>END OF PROJECT / ${work.englishTitle}</p>
        <button type="button" data-project-close>返回作品列表 ↑</button>
      </footer>
    </article>`;
}

function initProjectDialog() {
  const dialog = $("[data-project-dialog]");
  const content = $("[data-project-content]");

  const openProject = (id) => {
    const work = works.find((item) => item.id === id);
    if (!work) return;
    content.innerHTML = projectTemplate(work);
    bindVideoOverlay($(".video-placeholder", content));
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("dialog-open");
    $("[data-project-close]", content)?.focus({ preventScroll: true });
  };

  const closeProject = () => {
    dialog.close();
    document.body.classList.remove("dialog-open");
  };

  $$('[data-project]').forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.project));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(card.dataset.project);
      }
    });
  });

  content.addEventListener("click", (event) => {
    if (event.target.closest("[data-project-close]")) closeProject();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeProject();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProject();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
}

function initNavigation() {
  const header = $("[data-header]");
  const toggle = $(".menu-toggle");
  const mobileMenu = $(".mobile-menu");

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const next = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(next));
    mobileMenu.classList.toggle("is-open", next);
    document.body.classList.toggle("menu-open", next);
  });
  $$("a", mobileMenu).forEach((link) => link.addEventListener("click", closeMenu));
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6%" }
  );

  $$(".reveal").forEach((element) => observer.observe(element));
}

function injectKineticTitles() {
  $$('[data-motion-title]:not(.hero)').forEach((section) => {
    if ($('.kinetic-title', section)) return;
    const title = document.createElement('div');
    title.className = 'kinetic-title';
    title.setAttribute('aria-hidden', 'true');
    title.textContent = section.dataset.motionTitle;
    section.prepend(title);
  });
}

function initCinematicMotion() {
  const gsap = gsapEngine;
  const ScrollTrigger = ScrollTriggerPlugin;
  if (!gsap || !ScrollTrigger) return false;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  document.body.classList.add('force-motion', 'gsap-active');
  injectKineticTitles();

  const heroLines = $$('.hero-title > span');
  const intro = gsap.timeline({
    defaults: { ease: 'power4.inOut' },
    onComplete: () => ScrollTrigger.refresh()
  });

  gsap.set(['.site-header', '.hero-kicker', '.hero-bottom', '.scroll-cue', '.hero-rail'], { autoAlpha: 0 });
  gsap.set(heroLines, { autoAlpha: 0, yPercent: 120, scaleX: 0.72, transformOrigin: 'left center' });

  intro
    .fromTo('.hero-media video', { scale: 1.16, filter: 'brightness(0.48)' }, { scale: 1.035, filter: 'brightness(1)', duration: 1.65 }, 0)
    .to('.site-header', { autoAlpha: 1, duration: 0.65 }, 0.12)
    .to('.hero-kicker', { autoAlpha: 1, y: 0, duration: 0.75 }, 0.2)
    .to(heroLines, { autoAlpha: 1, yPercent: 0, scaleX: 1, stagger: 0.12, duration: 1.05 }, 0.28)
    .to('.hero-bottom', { autoAlpha: 1, y: 0, duration: 0.82 }, 0.7)
    .to(['.scroll-cue', '.hero-rail'], { autoAlpha: 1, duration: 0.65, stagger: 0.07 }, 0.94);

  gsap.to('.hero-media video', {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
  });

  $$('[data-motion-title]:not(.hero)').forEach((section) => {
    const kinetic = $('.kinetic-title', section);
    if (kinetic) {
      gsap.fromTo(
        kinetic,
        { xPercent: -34, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: 1.7,
          ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 82%', once: true }
        }
      );
    }

    const targets = $$(
      '.section-id, .eyebrow, .display-title, .lead, .body-copy, .about-aside, .fact, .sound-case-copy > *, .reel-panel > *, .music-intro, .music-player, .skill-item, .experience-inner > *, .contact-kicker, .contact-title, .contact-grid > *',
      section
    );
    if (targets.length) {
      gsap.fromTo(
        targets,
        { y: 86, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.095,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 74%', once: true }
        }
      );
    }
  });

  $$('.sound-case-visual, .reel-screen').forEach((frame) => {
    const isSoundProject = frame.classList.contains('sound-case-visual');
    gsap.fromTo(
      frame,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: isSoundProject ? 0.85 : 1.55,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: frame, start: 'top 82%', once: true }
      }
    );
    const media = $('img, video', frame);
    if (media) {
      gsap.fromTo(
        media,
        { scale: 1.16, xPercent: -5 },
        {
          scale: 1,
          xPercent: 0,
          duration: isSoundProject ? 1 : 1.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: frame, start: 'top 82%', once: true }
        }
      );
    }
  });

  const orbitIntro = gsap.timeline({
    scrollTrigger: { trigger: '.orbit-stage', start: 'top 80%', once: true }
  });
  orbitIntro
    .fromTo('.orbit-track', { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 1.15, ease: 'power3.out' })
    .fromTo('.orbit-center-copy', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, 0.18)
    .fromTo(
      '.orbit-work-frame',
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', stagger: 0.09, duration: 0.82, ease: 'power4.inOut' },
      0.28
    )
    .fromTo(
      '.orbit-work-frame img',
      { scale: 1.1 },
      { scale: 1.04, stagger: 0.09, duration: 1, ease: 'power3.out' },
      0.28
    );

  return true;
}

function initRuntimeEfficiency() {
  const heroVideo = $('.hero-video');
  const orbitStage = $('.orbit-stage');
  if (!heroVideo && !orbitStage) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroVideo) {
          if (entry.isIntersecting && !document.hidden) heroVideo.play().catch(() => {});
          else heroVideo.pause();
        }
        if (entry.target === orbitStage) {
          orbitStage.classList.toggle('is-orbit-active', entry.isIntersecting);
        }
      });
    },
    { threshold: 0.01, rootMargin: '180px 0px' }
  );

  if (heroVideo) observer.observe(heroVideo);
  if (orbitStage) observer.observe(orbitStage);

  document.addEventListener('visibilitychange', () => {
    if (!heroVideo) return;
    if (document.hidden) heroVideo.pause();
    else if (heroVideo.getBoundingClientRect().bottom > 0) heroVideo.play().catch(() => {});
  });
}

function initPointer() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const cursor = $(".cursor");
  if (!cursor) return;
  const moveX = gsapEngine.quickTo(cursor, "x", { duration: 0.32, ease: "power3.out" });
  const moveY = gsapEngine.quickTo(cursor, "y", { duration: 0.32, ease: "power3.out" });

  window.addEventListener("mousemove", (event) => {
    moveX(event.clientX);
    moveY(event.clientY);
    cursor.classList.add("is-active");
  }, { passive: true });

  $$(".orbit-work, .work-card").forEach((card) => {
    card.addEventListener("mouseenter", () => cursor.classList.add("is-view"));
    card.addEventListener("mouseleave", () => cursor.classList.remove("is-view"));
  });
}

function initHeroParallax() {
  if (document.body.classList.contains('gsap-active')) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const media = $(".hero-media video, .hero-media img");
  if (!media) return;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY < window.innerHeight * 1.2) {
        media.style.transform = `scale(1.035) translate3d(0, ${window.scrollY * 0.08}px, 0)`;
      }
    },
    { passive: true }
  );
}

hydrateProfile();
hydrateSoundProject();
renderWorks();
renderMediaLab();
renderSkills();
initExclusiveMediaPlayback();
initHeroNoise();
initHeroVariableProximity();
initProjectDialog();
initNavigation();
if (!initCinematicMotion()) initReveal();
initAmbientMotion();
initRuntimeEfficiency();
initPointer();
initHeroParallax();
