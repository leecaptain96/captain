export const profile = {
  name: "李家民",
  romanizedName: "LI JIAMIN",
  title: "AI Director · Creative Filmmaker",
  introduction:
    "我是一名内容创作者，从创意和剧本出发，用拍摄、剪辑与声音制作完成作品，也有真人出镜和个人账号运营经验。",
  secondParagraph:
    "从音乐达人的录音混音，到品牌短视频的脚本、拍摄剪辑，再到电商直播与个人账号运营，我积累了制作、表达和传播三端的实践。现在把 AI 影像融入创作流程，结合镜头设计、真实拍摄与声音制作完成内容，也能参与产品话术、视频分发与数据分析。",
  capabilities: [
    "创意策划",
    "剧本创作",
    "镜头设计",
    "导演执行",
    "视觉设计",
    "角色设计",
    "后期剪辑",
    "声音设计",
    "热点洞察",
    "电影质感控制",
    "出镜表达",
    "产品话术",
    "账号运营",
    "数据分析"
  ],
  fields: ["品牌广告", "AI短视频", "AI叙事短片", "AI视觉设计", "声音制作", "创意策划"],
  contact: {
    email: "479669907@qq.com",
    phone: "18759667939",
    wechat: "papaioo",
    douyin: "查看个人账号作品与数据"
  }
};

export const soundProject = {
  title: "微电影《入侵者》",
  englishTitle: "THE INVADERS",
  year: "2023",
  image: "./assets/images/real/invaders-sound-project.webp",
  role: "声音制作 / 独立负责",
  summary:
    "从拍摄现场到最终交付，独立完成整部微电影的声音工作。声音不是后期补丁，而是从前期录音开始就参与叙事结构。",
  awards: [
    "Falcon International Film Festival · 最佳剧情奖",
    "World Film Carnival — Singapore · 杰出成就奖"
  ]
};

const removedVideoIds = new Set([
  "bar-space",
  "la-monster",
  "live-action-ad",
  "chinese-style",
  "white-robe",
  "foundation",
  "soda-ad",
  "creative-point",
  "creative-point-2",
  "creative-point-3"
]);

export const works = [
  {
    id: "bar-space",
    index: "01",
    title: "酒吧",
    englishTitle: "BAR SPACE FILM",
    kind: "live-action",
    type: "Live Action Film",
    typeZh: "实拍空间短片",
    year: "2026",
    duration: "00' 24\"",
    role: "拍摄 / 剪辑",
    cover: "./assets/images/real/frame-bar-03.jpg",
    video: "./assets/videos/real/bar-shoot-edit.mp4",
    alt: "酒吧室内的服务人物与酒水陈列",
    short: "用真实拍摄与剪辑呈现酒吧空间、人物和现场氛围。",
    background:
      "一支酒吧空间实拍短片，由我负责现场拍摄与后期剪辑。内容围绕外部识别、室内陈设、人物服务和环境氛围展开。",
    concept:
      "从户外招牌进入室内，以环境建立、细节观察和人物动作构成游览节奏；剪辑保持轻快，让观众在短时间内理解空间特色。",
    character:
      "人物不承担表演性剧情，而是作为空间服务和真实生活感的组成部分，通过自然动作连接不同区域。",
    scene:
      "镜头覆盖门店入口、吧台、酒水陈列与人物服务，利用现场光线和运动镜头保留真实到店体验。",
    frames: [
      "./assets/images/real/frame-bar-01.jpg",
      "./assets/images/real/frame-bar-02.jpg",
      "./assets/images/real/frame-bar-03.jpg"
    ]
  },
  {
    id: "fall",
    index: "02",
    title: "坠落",
    englishTitle: "FALL",
    type: "AI Sci-Fi Film",
    typeZh: "AI 实拍科幻",
    year: "2026",
    duration: "00' 55\"",
    role: "AI 导演 / 画面制作 / 剪辑",
    cover: "./assets/images/real/poster-fall.jpg",
    video: "./assets/videos/ai/fall.mp4",
    alt: "科幻世界中悬浮于云层的巨大机械环",
    short: "以真实摄影逻辑构建宏大尺度的科幻世界。",
    background:
      "一支实拍质感与 AI 科幻视觉融合的短片练习。重点测试超现实尺度、环境连续性和人物在巨型场景中的可信关系。",
    concept:
      "画面从可感知的真实地貌出发，再逐步引入机械环等超现实元素。通过统一云层方向、光源和空气透视，让奇观仍然保有摄影感。",
    character:
      "人物始终保持小比例出现，承担尺度参照和情绪入口。服装与动作尽量克制，让观众先相信环境，再进入故事。",
    scene:
      "以阴天自然光、远景地貌和云层体积为视觉锚点，镜头节奏由建立世界到靠近人物逐层收紧。",
    frames: [
      "./assets/images/real/frame-fall-01.jpg",
      "./assets/images/real/frame-fall-02.jpg",
      "./assets/images/real/frame-fall-03.jpg"
    ]
  },
  {
    id: "anime-fight",
    index: "04",
    title: "日漫打斗",
    englishTitle: "ANIME FIGHT",
    type: "AI Animation",
    typeZh: "AI 动漫动作",
    year: "2026",
    duration: "00' 30\"",
    role: "动作设计 / AI 影像 / 剪辑",
    cover: "./assets/images/real/poster-anime-fight.jpg",
    video: "./assets/videos/ai/anime-fight.mp4",
    alt: "红色服装的动漫角色高速战斗特写",
    short: "围绕动作连贯性、角色稳定性与速度感的动漫实验。",
    background:
      "以高强度战斗段落为核心，测试 AI 动画在角色造型、空间方向和连续动作上的稳定性。",
    concept:
      "先确定人物轮廓与红黑色视觉锚点，再用近景冲击、运动模糊和快速景别变化建立力量感。",
    character:
      "持续锁定发型、面部结构、服装配色和武器关系，减少动作镜头中常见的角色漂移。",
    scene:
      "环境以深色废墟和冷色天空为基线，通过暖色角色形成清晰前后景层次。",
    frames: [
      "./assets/images/real/frame-anime-fight-01.jpg",
      "./assets/images/real/frame-anime-fight-02.jpg",
      "./assets/images/real/frame-anime-fight-03.jpg"
    ]
  },
  {
    id: "white-rose",
    index: "04",
    title: "白玫瑰",
    englishTitle: "WHITE ROSE",
    type: "AI Live-Action Film",
    typeZh: "AI 实拍叙事",
    year: "2026",
    duration: "01' 03\"",
    role: "AI 导演 / 叙事设计 / 后期",
    cover: "./assets/images/real/poster-white-rose.jpg",
    video: "./assets/videos/ai/white-rose.mp4",
    alt: "暖色书房中交谈的两位西装男士",
    short: "以人物关系和光影氛围驱动的实拍感叙事影像。",
    background:
      "围绕人物关系和戏剧氛围展开的 AI 实拍短片，重点控制室内场景、人物表演与镜头间的情绪连贯。",
    concept:
      "用暖色壁炉光、深色木质空间和夜景窗光建立经典电影气质，让 AI 生成画面靠近真实布光与镜头表达。",
    character:
      "通过服装、年龄、发型和光位建立人物锚点，并把表情变化控制在叙事需要的范围内。",
    scene:
      "室内主场景强调暖冷对比和空间纵深，避免无目的的华丽运镜，让对话与情绪成为画面核心。",
    frames: [
      "./assets/images/real/frame-white-rose-01.jpg",
      "./assets/images/real/frame-white-rose-02.jpg",
      "./assets/images/real/frame-white-rose-03.jpg"
    ]
  },
  {
    id: "foundation",
    index: "05",
    title: "粉底液",
    englishTitle: "FOUNDATION",
    type: "AI E-commerce Film",
    typeZh: "AI 电商概念广告",
    year: "2026",
    duration: "00' 15\"",
    role: "广告创意 / AI 画面 / 剪辑",
    cover: "./assets/images/real/poster-foundation.jpg",
    video: "./assets/videos/ai/foundation.mp4",
    alt: "白玫瑰与暖色光线中的粉底产品概念画面",
    short: "用产品材质、布光和节奏完成电商广告概念练习。",
    background:
      "非商业委托的 AI 电商概念练习，目标是在短时长里完成产品登场、质感特写和价值感建立。",
    concept:
      "以暖金色光线、白玫瑰和石材形成柔与硬的材质对照，让产品成为画面中唯一稳定的视觉中心。",
    character:
      "产品即角色。通过固定外形、材质反光和包装细节维持镜头之间的识别一致性。",
    scene:
      "场景控制在单一桌面尺度，以近景和特写为主，让光线变化承担转场功能。",
    frames: [
      "./assets/images/real/frame-foundation-01.jpg",
      "./assets/images/real/frame-foundation-02.jpg",
      "./assets/images/real/frame-foundation-03.jpg"
    ]
  },
  {
    id: "la-monster",
    index: "01",
    title: "洛杉矶怪兽",
    englishTitle: "LOS ANGELES MONSTER",
    type: "AI Sci-Fi Film",
    typeZh: "AI 城市科幻",
    year: "2026",
    duration: "00' 27\"",
    role: "AI 导演 / 世界观设计 / 剪辑",
    cover: "./assets/images/real/poster-la-monster.jpg",
    video: "./assets/videos/ai/la-monster.mp4",
    alt: "巨型透明生物悬浮在洛杉矶城市上空",
    short: "用宏大尺度与城市地标构建具有新闻现场感的怪兽影像。",
    background: "以洛杉矶遭遇未知巨型生物为核心概念，将熟悉的城市空间转化为带有灾难片气质的科幻现场。",
    concept: "通过地标建筑、云层和巨型透明生物之间的尺度关系制造可信度，让超现实事件保持真实摄影与目击影像的质感。",
    character: "怪兽采用半透明水母形态，以材质、轮廓和缓慢运动形成辨识度，并在不同镜头中维持体量一致。",
    scene: "场景围绕城市天际线、街道与远距离观察视角展开，以自然光和空气透视统一空间层次。",
    frames: [
      "./assets/images/real/frame-la-monster-01.jpg",
      "./assets/images/real/frame-la-monster-02.jpg",
      "./assets/images/real/frame-la-monster-03.jpg"
    ]
  },
  {
    id: "creative-point",
    index: "03",
    title: "创意点",
    englishTitle: "CREATIVE POINT",
    type: "AI Concept Film",
    typeZh: "AI 超现实视觉",
    year: "2026",
    duration: "00' 06\"",
    role: "创意概念 / AI 视觉 / 剪辑",
    cover: "./assets/images/real/poster-creative-point.jpg",
    video: "./assets/videos/ai/creative-point.mp4",
    alt: "办公空间中悬浮的手部与黑色方块",
    short: "把日常办公空间转化为短促、陌生而有记忆点的超现实瞬间。",
    background: "一次围绕视觉奇点展开的短片练习，用极短时长测试单一创意在画面中的注意力抓取能力。",
    concept: "以冷静的办公环境作为现实基底，再植入悬浮肢体与几何物体，通过反差形成第一眼记忆点。",
    character: "弱化传统人物叙事，让手部和悬浮物成为动作主体，以形态变化驱动画面。",
    scene: "采用低饱和办公空间、浅景深和稳定机位，让异常元素显得更加真实。",
    frames: [
      "./assets/images/real/frame-creative-point-01.jpg",
      "./assets/images/real/frame-creative-point-02.jpg",
      "./assets/images/real/frame-creative-point-03.jpg"
    ]
  },
  {
    id: "soda-ad",
    index: "04",
    title: "汽水广告",
    englishTitle: "SODA AD",
    type: "AI Commercial Film",
    typeZh: "AI 饮料广告",
    year: "2026",
    duration: "00' 15\"",
    role: "广告创意 / AI 视觉 / 剪辑",
    cover: "./assets/images/real/poster-soda-ad.jpg",
    video: "./assets/videos/ai/soda-ad.mp4",
    alt: "夜景中手持带有水珠的绿色汽水罐",
    short: "用夜景、冷凝水珠和近距离镜头强化饮料的清爽感与年轻气质。",
    background: "面向短视频平台的 AI 饮料广告练习，在十五秒内完成产品露出、情绪建立与记忆点收束。",
    concept: "以城市夜景和绿色罐体建立色彩识别，通过开罐、气泡与水珠特写传达冰爽口感。",
    character: "产品是唯一主角，人物只保留手部与局部动作，避免分散品牌注意力。",
    scene: "场景使用夜间城市散景与近距离手持视角，形成真实、年轻且适合社交媒体传播的生活感。",
    frames: [
      "./assets/images/real/frame-soda-ad-01.jpg",
      "./assets/images/real/frame-soda-ad-02.jpg",
      "./assets/images/real/frame-soda-ad-03.jpg"
    ]
  },
  {
    id: "dark-dragon",
    index: "03",
    title: "暗黑龙战士",
    englishTitle: "DARK DRAGON WARRIOR",
    type: "AI Fantasy Film",
    typeZh: "AI 暗黑奇幻",
    year: "2026",
    duration: "00' 42\"",
    role: "AI 导演 / 角色设计 / 剪辑",
    cover: "./assets/images/real/poster-dark-dragon.jpg",
    video: "./assets/videos/ai/dark-dragon.mp4",
    alt: "暗黑奇幻世界中的龙战士角色",
    short: "以暗黑美术、角色一致性和战斗氛围构建奇幻影像。",
    background: "围绕龙战士与黑暗世界展开的 AI 奇幻短片，重点测试角色造型、环境尺度和连续镜头中的风格稳定性。",
    concept: "使用低明度环境、冷色雾气与局部火光建立压迫感，让角色轮廓和力量感成为画面核心。",
    character: "持续锁定盔甲结构、龙元素、武器和面部特征，在动作变化中保持角色身份统一。",
    scene: "场景由荒原、遗迹与暗色天空构成，通过逆光、烟雾和空间纵深强化史诗气质。",
    frames: [
      "./assets/images/real/frame-dark-dragon-01.jpg",
      "./assets/images/real/frame-dark-dragon-02.jpg",
      "./assets/images/real/frame-dark-dragon-03.jpg"
    ]
  },
  {
    id: "creative-point-2",
    index: "06",
    title: "创意点 2",
    englishTitle: "CREATIVE POINT II",
    type: "AI Luxury Visual",
    typeZh: "AI 奢侈品视觉",
    year: "2026",
    duration: "00' 09\"",
    role: "创意概念 / AI 视觉 / 剪辑",
    cover: "./assets/images/real/poster-creative-point-2.jpg",
    video: "./assets/videos/ai/creative-point-2.mp4",
    alt: "哥特式空间中的唇膏与超现实人物",
    short: "将奢侈品、宗教建筑与超现实构图组合成强记忆点视觉。",
    background: "以高端美妆产品为视觉核心的 AI 概念短片，探索奢侈品广告在短时长中的仪式感与视觉冲击。",
    concept: "通过哥特式建筑、对称构图、红黑金配色和悬浮人物，把产品塑造成具有神圣感的视觉图腾。",
    character: "人物作为产品仪式的引导者，以统一黑色造型和对称动作维持画面秩序。",
    scene: "场景结合教堂结构、装饰艺术与超现实尺度，利用中心透视突出产品位置。",
    frames: [
      "./assets/images/real/frame-creative-point-2-01.jpg",
      "./assets/images/real/frame-creative-point-2-02.jpg",
      "./assets/images/real/frame-creative-point-2-03.jpg"
    ]
  }
].filter(({ id }) => !removedVideoIds.has(id));

export const featuredWorkIds = ["fall", "dark-dragon", "anime-fight"];

export const aiVideos = [
  { id: "drink-tvc", title: "饮品 TVC", category: "AI 饮品广告", duration: "00:30", src: "./assets/videos/ai/drink-tvc.mp4", poster: "./assets/images/aesthetic/drink-tvc-1.webp" },
  { id: "la-monster", title: "洛杉矶怪兽", category: "AI 城市科幻", duration: "00:27", src: "./assets/videos/ai/la-monster.mp4", poster: "./assets/images/real/poster-la-monster.jpg" },
  { id: "fall", title: "真人科幻", category: "AI 真人科幻", duration: "00:55", src: "./assets/videos/ai/fall.mp4", poster: "./assets/images/real/poster-fall.jpg" },
  { id: "white-rose", title: "剧情", category: "AI 剧情叙事", duration: "01:03", src: "./assets/videos/ai/white-rose.mp4", poster: "./assets/images/real/poster-white-rose.jpg" },
  { id: "anime-fight", title: "日漫打斗", category: "AI 动漫", duration: "00:30", src: "./assets/videos/ai/anime-fight.mp4", poster: "./assets/images/real/poster-anime-fight.jpg" },
  { id: "dark-dragon", title: "动漫", category: "AI 动漫", duration: "00:42", src: "./assets/videos/ai/dark-dragon.mp4", poster: "./assets/images/real/poster-dark-dragon.jpg" },
  { id: "white-robe", title: "白袍", category: "AI 动漫", duration: "00:21", src: "./assets/videos/ai/white-robe.mp4", poster: "./assets/images/real/poster-white-robe.jpg" },
  { id: "foundation", title: "粉底液电商广告", category: "AI 电商", duration: "00:15", src: "./assets/videos/ai/foundation.mp4", poster: "./assets/images/real/poster-foundation.jpg" },
  { id: "soda-ad", title: "汽水广告", category: "AI 饮料广告", duration: "00:15", src: "./assets/videos/ai/soda-ad.mp4", poster: "./assets/images/real/poster-soda-ad.jpg" },
  { id: "live-action-ad", title: "骑马", category: "AI 广告视觉", duration: "00:15", src: "./assets/videos/ai/live-action-ad.mp4", poster: "./assets/images/real/poster-live-action-ad.jpg" },
  { id: "flower-car", title: "文艺广告", category: "AI 文艺广告", duration: "00:11", src: "./assets/videos/ai/flower-car.mp4", poster: "./assets/images/real/poster-flower-car.jpg" },
  { id: "mr-coward", title: "胆小鬼先生", category: "AI 叙事短片", duration: "00:17", src: "./assets/videos/ai/mr-coward.mp4", poster: "./assets/images/real/poster-mr-coward.jpg" },
  { id: "chinese-style", title: "国风", category: "AI 国风视觉", duration: "00:15", src: "./assets/videos/ai/chinese-style.mp4", poster: "./assets/images/real/poster-chinese-style.jpg" },
  { id: "creative-point", title: "创意点", category: "AI 超现实视觉", duration: "00:06", src: "./assets/videos/ai/creative-point.mp4", poster: "./assets/images/real/poster-creative-point.jpg" },
  { id: "creative-point-2", title: "创意点 2", category: "AI 奢侈品视觉", duration: "00:09", src: "./assets/videos/ai/creative-point-2.mp4", poster: "./assets/images/real/poster-creative-point-2.jpg" }
].filter(({ id }) => !removedVideoIds.has(id));

export const visualStudies = [
  { id: "creative-point-2", title: "广告", direction: "奢侈品视觉 · 仪式感与对称构图" },
  { id: "foundation", title: "电商", direction: "电商视觉 · 材质与暖金色光影" },
  { id: "car-visual", title: "汽车广告", direction: "AI 汽车广告 · 场景尺度与车身光影" },
  { id: "watch-visual", title: "手表广告", direction: "AI 产品广告 · 运动生活与产品质感" },
  { id: "mouse-visual", title: "鼠标电商", direction: "AI 科技视觉 · 材质细节与光轨构图" },
  { id: "creative-point-3", title: "创意", direction: "超现实视觉 · 身体与天空的空间转换" },
  { id: "white-robe", title: "动漫", direction: "幻想世界 · 建筑尺度与空气透视" },
  { id: "chinese-style", title: "国风", direction: "东方水墨 · 留白与笔触" },
  { id: "la-monster", title: "电影", direction: "电影感城市 · 自然光与人物情绪" },
  { id: "soda-ad", title: "汽水广告", direction: "饮品视觉 · 青绿色调与城市生活" },
  { id: "bullet-time", title: "日系", direction: "日系影像 · 海岸、自然光与动态姿态", frameCount: 1 },
  { id: "japanese-light", title: "日系光影", direction: "AI 日系影像 · 海岸留白与暖光人像" },
  { id: "creative-point", title: "剧情广告", direction: "超现实创意 · 日常物件与视觉反差" },
  { id: "tell-2", title: "电影短片", direction: "电影叙事 · 暖冷对比与人物关系" },
  { id: "hamster", title: "动漫剧情", direction: "拟人角色 · 复古服饰与奇幻空间" },
  { id: "korean-drama", title: "韩剧剧情", direction: "韩剧氛围 · 雨夜光影与人物互动" },
  { id: "dream-study", title: "意识流", direction: "梦境视觉 · 超现实意象与冷色空间" },
  { id: "mystic-forest", title: "神秘森林", direction: "奇幻美术 · 森林层次与冷暖光影", frameCount: 1 },
  { id: "live-ad-study", title: "真人广告类", direction: "广告影像 · 山野场景与人物质感" }
];

export const skills = [
  { number: "01", title: "AI 视频生成", english: "GENERATIVE FILM", detail: "从风格测试、角色锚定到镜头生成与连续性修正。" },
  { number: "02", title: "商业广告创意", english: "COMMERCIAL CONCEPT", detail: "把品牌命题转化为可拍、可传播、可交付的视觉概念。" },
  { number: "03", title: "分镜与镜头设计", english: "STORYBOARDING", detail: "用景别、运动、视线与节奏预先建立成片逻辑。" },
  { number: "04", title: "真实感画面控制", english: "VISUAL REALISM", detail: "控制光线、材质、镜头参数与表演细节，减少 AI 感。" },
  { number: "05", title: "编导、出镜与账号运营", english: "CONTENT & PERFORMANCE", detail: "有脚本输出、剧情参演、一饰多角与个人账号运营经验，参与视频投放和数据分析。" },
  { number: "06", title: "后期剪辑与包装", english: "EDIT & FINISH", detail: "剪辑、调色、字幕包装与节奏控制的一体化执行。" },
  { number: "07", title: "录音混音与 AI 音乐", english: "RECORDING & MIX", detail: "有音乐达人录音混音、微电影同期与后期声音制作经验；熟悉 Cubase、FabFilter、Waves 等插件及软音源，会使用 AI 制作音乐。" },
  { number: "08", title: "电商内容与直播表达", english: "COMMERCE & LIVE", detail: "做过电商产品拍摄、剪辑包装与内容分发，也有 Shopee 直播讲解、产品话术整理、选品协助和客户维护经验。" },
  { number: "09", title: "快速学习与团队协作", english: "WORKFLOW & COLLABORATION", detail: "把新工具融入制作流程，有跨团队协作经验，能够结合制作任务与内容反馈调整执行。" }
];
