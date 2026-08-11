"use client";

import "./xingcheng.css";

import { useMemo, useRef, useState } from "react";

type LibraryItem = {
  id: string;
  name: string;
  keywords: string[];
  duration: string;
  description: string;
  kind: "景点" | "服务";
  image?: string;
};

type DayPlan = {
  id: number;
  items: string[];
  query: string;
  touched: boolean;
  meals: string[];
  lodging: string;
  photoItems: string[];
};

const baseLibrary: LibraryItem[] = [
  {
    id: "pickup",
    name: "机场接机",
    keywords: ["接机", "机场", "接"],
    duration: "",
    description: "工作人员根据航班抵达时间提前在到达厅等候，接到客人后乘车前往酒店，协助办理入住手续，并简要介绍后续几天的行程安排、集合方式与注意事项。",
    kind: "服务",
  },
  {
    id: "city-wall",
    name: "西安明城墙",
    keywords: ["城墙", "明城墙", "西安城墙"],
    duration: "约60分钟",
    description: "西安明城墙始建于明代，是中国现存规模较大、保存较完整的古代城垣。游客可沿墙漫步或骑行，俯瞰城内外街巷与护城河，直观感受传统城郭格局、城门楼观与古都城市肌理风貌。",
    kind: "景点",
  },
  {
    id: "xian-museum",
    name: "西安博物院",
    keywords: ["西安博物院", "博物院", "博物馆"],
    duration: "约1.5小时",
    description: "西安博物院由博物馆、荐福寺与小雁塔共同组成，集文物展示、历史研究与园林游览于一体。馆内通过丰富馆藏呈现西安不同历史时期的城市变迁，游客可在塔院环境中感受古都文化积淀。",
    kind: "景点",
  },
  {
    id: "bell-drum-square",
    name: "钟鼓楼广场",
    keywords: ["钟楼", "鼓楼", "钟鼓楼", "广场"],
    duration: "约40分钟",
    description: "钟鼓楼广场位于西安市中心，钟楼与鼓楼隔广场相望，是古城中轴格局的重要标识。游客可近距离欣赏两座古建的飞檐斗拱与城市地标景观，适合了解西安城市空间演变并拍摄代表性照片。",
    kind: "景点",
  },
  {
    id: "muslim-quarter",
    name: "回民小吃街",
    keywords: ["回民街", "小吃街", "美食"],
    duration: "约1小时",
    description: "回民小吃街位于西安古城核心区域，沿街汇集羊肉泡馍、肉夹馍、胡辣汤等地方风味。街区烟火气浓厚，游客可自由漫步品尝小吃、选购伴手礼，感受回坊生活氛围与西安市井饮食文化。",
    kind: "景点",
  },
  {
    id: "terracotta",
    name: "秦始皇兵马俑博物馆",
    keywords: ["兵马俑", "秦始皇", "秦俑"],
    duration: "约2小时",
    description: "秦始皇兵马俑博物馆以规模宏大的秦代兵马俑坑闻名于世，陶俑按兵种排列，神态与服饰细节丰富。参观一、二、三号坑，可直观了解秦代军事编制、雕塑技艺与陵寝制度，是认识秦文明的重要窗口。",
    kind: "景点",
  },
  {
    id: "huaqing",
    name: "华清宫",
    keywords: ["华清宫", "华清池", "骊山"],
    duration: "约1.5小时",
    description: "华清宫坐落于骊山北麓，自古以温泉和宫苑景观著称，并与唐代宫廷故事、西安事变等历史密切相关。园内可参观温泉遗址、宫殿庭院与历史展陈，感受自然山水与盛唐文化交织的游览体验。",
    kind: "景点",
  },
  {
    id: "huashan",
    name: "西岳华山",
    keywords: ["华山", "西岳", "爬山"],
    duration: "约5小时",
    description: "华山为中国五岳之一，以壁立千仞、峰岭奇秀著称。游客可根据体力和开放情况选择登山路线，途经苍龙岭等险段，登顶后可远眺群峰云海，充分感受华山险峻山势、石阶栈道与自然风光。",
    kind: "景点",
  },
  {
    id: "dayan-pagoda",
    name: "大雁塔北广场",
    keywords: ["大雁塔", "北广场", "音乐喷泉"],
    duration: "约40分钟",
    description: "大雁塔北广场位于大慈恩寺北侧，是西安重要的城市文化广场。游客可在开阔空间远观大雁塔塔身与周边唐风建筑，感受古典地标与现代城市景观的融合，也是了解曲江文化区氛围的便捷地点。",
    kind: "景点",
  },
  {
    id: "everbright-city",
    name: "大唐不夜城",
    keywords: ["不夜城", "大唐不夜城", "夜景"],
    duration: "约1.5小时",
    description: "大唐不夜城以盛唐文化为主题，沿步行街分布景观雕塑、文化表演与特色商业店铺。夜色中灯光与街景相互映衬，游客可漫步观赏表演、体验唐风街区氛围，适合感受西安夜间文化生活。",
    kind: "景点",
  },
  {
    id: "dropoff",
    name: "机场送机",
    keywords: ["送机", "机场", "送"],
    duration: "",
    description: "根据返程航班时间合理安排送机，提前从酒店出发前往机场，途中确认行李与行程节点，抵达机场相应航站楼后结束本次接待服务。",
    kind: "服务",
  },
];

const additionalLibrary: LibraryItem[] = [
  { id: "xiyue-temple", name: "西岳庙", keywords: ["西岳庙", "华岳庙", "岳庙"], duration: "约1.5小时", description: "西岳庙是历代帝王祭祀西岳华山神的重要场所，建筑按中轴对称层层展开，格局庄严。游客可参观殿宇、碑刻与古树，了解华山信仰与礼制文化，感受宫殿式庙宇特有的肃穆气势与历史厚重感。", kind: "景点" },
  { id: "daci-en-temple", name: "大慈恩寺", keywords: ["大慈恩寺", "慈恩寺", "大雁塔"], duration: "约1.5小时", description: "大慈恩寺是唐长安著名佛寺，也是大雁塔所在地，与玄奘法师西行求法、译经弘法的历史密切相关。寺院殿宇庄严、古木苍郁，游客可在塔院参访中感受佛教文化传统与盛唐都城气象。", kind: "景点" },
  { id: "gaojia-courtyard", name: "高家大院", keywords: ["高家大院", "高家宅院", "北院门"], duration: "约1小时", description: "高家大院位于西安北院门历史街区，是保存较完整的明清民居院落。院落层层递进，砖雕木雕细腻，并设有地方民俗与影壁陈列。游客可近距离观察传统住宅格局，感受老西安宅院生活气息。", kind: "景点" },
  { id: "bailuyuan", name: "白鹿原影视城", keywords: ["白鹿原", "白鹿原影视城", "影视城"], duration: "约3小时", description: "白鹿原影视城以关中地域文化和作品《白鹿原》为背景，设有白鹿村、滋水县城等实景街区。游客可漫步黄土民居与市井街巷，观看民俗表演，体验影视场景与关中乡土风貌相结合的游览内容。", kind: "景点" },
  { id: "qinqiang", name: "非遗体验·秦腔", keywords: ["秦腔", "非遗", "非遗体验"], duration: "约1小时", description: "秦腔是流行于西北地区的传统戏曲，唱腔高亢激越、表演质朴豪放，被列入国家级非物质文化遗产。体验活动中可近距离了解唱腔、脸谱、服饰与舞台程式，感受秦地戏曲的艺术特色。", kind: "景点" },
  { id: "changan-twelve", name: "长安十二时辰主题街区", keywords: ["长安十二时辰", "十二时辰", "主题街区"], duration: "约2小时", description: "长安十二时辰主题街区以唐代市井文化与沉浸式体验为特色，融合唐风建筑、互动演艺、餐饮与文创。游客可步入仿唐街市，观看角色演绎与市井场景，感受热闹鲜活的盛唐生活氛围。", kind: "景点" },
  { id: "daming-palace", name: "大明宫国家遗址公园", keywords: ["大明宫", "大明宫遗址", "遗址公园"], duration: "约2小时", description: "大明宫曾是唐代重要的政治中枢之一，遗址公园保留夯土基址、宫门与殿址格局。通过遗迹现场、复原展示与数字展陈，游客可理解盛唐宫城的空间尺度，了解唐代都城制度与宫廷文化。", kind: "景点" },
  { id: "beilin-museum", name: "西安碑林博物馆", keywords: ["碑林", "碑林博物馆", "西安碑林"], duration: "约1.5小时", description: "西安碑林博物馆以历代碑石、墓志与石刻艺术收藏闻名，被誉为书法艺术宝库。馆内名碑荟萃，游客可近距离观赏碑文书法与石刻造像，了解中国文字、经史文献与石刻工艺的发展脉络。", kind: "景点" },
  { id: "archaeology-museum", name: "陕西考古博物馆", keywords: ["考古博物馆", "陕西考古", "考古"], duration: "约2小时", description: "陕西考古博物馆以考古学科发展与陕西重要考古发现为主线，系统展示调查、发掘、保护与修复过程。参观可从考古视角理解文物出土背景与文明演进，适合希望深入了解陕西考古成果的游客。", kind: "景点" },
  { id: "banpo-museum", name: "西安半坡博物馆", keywords: ["半坡", "半坡博物馆", "半坡遗址"], duration: "约1.5小时", description: "西安半坡博物馆依托新石器时代仰韶文化聚落遗址建立，保存有房屋、窖穴与墓葬等遗迹。结合出土陶器与生产工具展陈，游客可了解先民的居住布局、制陶技术与日常生活方式，认识史前文明。", kind: "景点" },
  { id: "tang-paradise", name: "大唐芙蓉园", keywords: ["大唐芙蓉园", "芙蓉园", "唐文化"], duration: "约2.5小时", description: "大唐芙蓉园以盛唐文化为主题，园内分布仿唐建筑、水景园林与文化演艺空间。白天可游览楼阁廊桥与湖景，夜晚灯光与水面相映，适合沉浸式感受唐风园林氛围与曲江历史文化特色。", kind: "景点" },
  { id: "xian-botanical", name: "西安植物园", keywords: ["西安植物园", "植物园", "花卉"], duration: "约2小时", description: "西安植物园汇集多类植物专园与季节性花卉景观，兼具科研、科普与休闲功能。游客可沿园路观察秦岭及各地代表性植物，了解植物多样性知识，在城市中获得亲近自然的游览体验。", kind: "景点" },
  { id: "shuyuanmen", name: "书院门文化街", keywords: ["书院门", "书院门文化街", "文房四宝"], duration: "约1小时", description: "书院门文化街紧邻关中书院旧址一带，沿街聚集书画、篆刻、文房四宝与传统工艺店铺。青石铺地、牌匾林立，游客可漫步选购文房用品、欣赏书法氛围，感受西安文脉延续的街巷气息。", kind: "景点" },
  { id: "yongxingfang", name: "永兴坊", keywords: ["永兴坊", "陕西美食", "非遗美食"], duration: "约1小时", description: "永兴坊集中展示陕西各地特色小吃与民俗文化，街区以传统建筑风格营造热闹市井氛围。游客可按口味自由品尝地方美食，观察非遗饮食制作场景，体验陕西饮食文化的丰富多样性。", kind: "景点" },
  { id: "daxingshan", name: "大兴善寺", keywords: ["大兴善寺", "兴善寺", "寺院"], duration: "约1小时", description: "大兴善寺是西安历史悠久的佛教寺院之一，与密宗传播历史关系密切。寺内殿宇整齐、古木苍翠，环境相对清幽。游客可沿中轴线参访殿堂，感受都市中的寺院氛围与佛教文化传统。", kind: "景点" },
  { id: "xian-incident", name: "西安事变纪念馆", keywords: ["西安事变纪念馆", "西安事变", "纪念馆"], duration: "约1.5小时", description: "西安事变纪念馆依托相关历史旧址设立，通过文物、图片、史料与复原陈列，系统呈现西安事变的背景、经过与影响。参观有助于理解近现代中国重要历史转折，感受旧址承载的时代记忆。", kind: "景点" },
  { id: "xian-romance", name: "《西安千古情》", keywords: ["千古情", "西安千古情", "演出"], duration: "约1小时", description: "《西安千古情》以大型舞台艺术串联西安历史文化脉络，借助舞美、灯光、音乐与演员表演呈现古都故事。演出节奏鲜明、场景转换丰富，适合集中感受地域文化与现代演艺结合的观演体验。", kind: "景点" },
  { id: "camel-bells", name: "《驼铃传奇》", keywords: ["驼铃传奇", "驼铃", "演出"], duration: "约1小时", description: "《驼铃传奇》以古丝绸之路商旅往来为背景，运用实景舞台、机械装置与水火特效讲述丝路故事。场面开阔、视听冲击感强，游客可在演出中感受丝路文化主题与当代舞台科技的结合。", kind: "景点" },
  { id: "zhang-residence", name: "张学良公馆", keywords: ["张学良公馆", "张学良", "公馆"], duration: "约1小时", description: "张学良公馆是西安事变重要旧址之一，由多幢中西合璧建筑组成。馆内通过旧居复原、图片文献与生平展陈，帮助游客了解张学良相关历史活动，以及公馆建筑本身的时代特征与历史价值。", kind: "景点" },
  { id: "shaanxi-history", name: "陕西历史博物馆", keywords: ["陕西历史博物馆", "陕历博", "历史博物馆"], duration: "约2.5小时", description: "陕西历史博物馆以周秦汉唐等时期文物见长，展陈系统呈现陕西古代文明发展脉络。青铜器、陶俑、金银器等馆藏丰富，游客可循时代顺序参观，深入了解中华文明与盛唐文化的重要侧面。", kind: "景点" },
  { id: "tang-west-market", name: "大唐西市", keywords: ["大唐西市", "西市", "丝路"], duration: "约1.5小时", description: "大唐西市所在区域承载唐长安西市的历史记忆，现融合博物馆、商业街区与丝路主题展示。游客可了解古代商贸交流与城市生活，在现代街区中感受唐长安作为国际都会的历史余韵与市井气息。", kind: "景点" },
  { id: "hancheng-lake", name: "汉城湖景区", keywords: ["汉城湖", "汉城湖景区", "汉文化"], duration: "约2小时", description: "汉城湖景区依托汉长安城遗址周边水系建设，将生态景观与汉文化主题相结合。沿湖可见园林绿化、水岸步道与主题建筑，适合在城市近郊散步观景，了解汉代都城地理与文化背景。", kind: "景点" },
  { id: "qinglong-temple", name: "青龙寺", keywords: ["青龙寺", "樱花", "寺院"], duration: "约1小时", description: "青龙寺是唐代佛教文化交流的重要场所，与中日佛教往来渊源深厚。寺院环境清雅，殿宇与花木相映；春季樱花盛开时景色尤佳，游客可在参访中感受寺院历史文脉与季节景观之美。", kind: "景点" },
  { id: "yisushe", name: "易俗社文化街区", keywords: ["易俗社", "易俗社街区", "秦腔"], duration: "约1.5小时", description: "易俗社文化街区围绕百年秦腔剧社营造，融合剧场、展陈、非遗体验与老字号商业。游客可了解秦腔发展历程，走进相关展示空间，感受戏曲艺术与西安近现代城市文化交织的街区氛围。", kind: "景点" },
  { id: "xiying", name: "西影电影园区", keywords: ["西安电影制片厂", "西影厂", "西影电影园区"], duration: "约1.5小时", description: "西影电影园区由西安电影制片厂更新而来，保留电影工业记忆，并融入展览、文创与场景体验。游客可走近摄影棚、道具与影片故事，了解西部电影发展脉络与西安影视文化的独特魅力。", kind: "景点" },
  { id: "qinling-four", name: "秦岭四宝科学公园", keywords: ["秦岭四宝", "四宝科学公园", "大熊猫"], duration: "约2.5小时", description: "秦岭四宝科学公园以大熊猫、朱鹮、金丝猴和羚牛等珍稀动物保护为核心，兼具救护繁育、科学研究与自然科普功能。游客可近距离了解秦岭物种保护成果，增强对生态环境与生物多样性的认识。", kind: "景点" },
  { id: "qinling-wildlife", name: "西安秦岭野生动物园", keywords: ["秦岭野生动物园", "野生动物园", "动物园"], duration: "约4小时", description: "西安秦岭野生动物园依托秦岭北麓自然环境布局，设有多种野生动物展区与科普体验项目。适合亲子家庭乘车或步行参观，观察动物习性与栖息环境，了解野生动物保护与生态知识。", kind: "景点" },
  { id: "famen-temple", name: "法门文化景区", keywords: ["法门寺", "法门文化景区", "佛指舍利"], duration: "约3小时", description: "法门文化景区以法门寺历史文化与唐代地宫考古发现闻名，寺院、博物馆与现代礼佛建筑共同构成游览空间。游客可了解佛指舍利相关历史、唐代珍宝与佛教文化在关中地区的深远影响。", kind: "景点" },
  { id: "qianling", name: "乾陵", keywords: ["乾陵", "武则天", "唐陵"], duration: "约2小时", description: "乾陵是唐高宗李治与武则天的合葬陵，依梁山为陵，神道石刻保存丰富。无字碑、述圣纪碑及石人石兽排列庄严，游客可沿神道参观，感受唐代皇家陵寝制度与山陵选址的恢宏气势。", kind: "景点" },
  { id: "hukou", name: "黄河壶口瀑布（陕西侧）", keywords: ["壶口瀑布", "黄河壶口", "陕西壶口"], duration: "约1.5小时", description: "黄河壶口瀑布因河水奔涌至狭窄河槽、形似巨壶倾泻而得名。站在陕西侧观景区域，可见浊浪翻卷、水雾蒸腾，涛声震耳，是近距离感受黄河磅礴气势与黄土高原自然力量的代表性景点。", kind: "景点" },
  { id: "huangdi-mausoleum", name: "黄帝陵", keywords: ["黄帝陵", "轩辕黄帝", "桥山"], duration: "约2小时", description: "黄帝陵位于桥山，是祭祀中华人文初祖轩辕黄帝的重要场所。陵区古柏苍翠，轩辕庙与陵园布局庄重，游客可了解传统祭祖礼仪与相关历史传说，感受中华文明源远流长的文化认同。", kind: "景点" },
  { id: "yucha-canyon", name: "甘泉大峡谷（雨岔大峡谷）", keywords: ["雨岔大峡谷", "甘泉大峡谷", "雨岔"], duration: "约3小时", description: "甘泉大峡谷由流水长期冲蚀红色砂岩形成，峡壁曲折幽深，光影与岩层色彩变化丰富。游客沿栈道或谷底行走，可近距离欣赏丹霞地质构造与峡谷形态，体验陕北别具一格的地貌景观。", kind: "景点" },
  { id: "wave-valley", name: "靖边波浪谷", keywords: ["波浪谷", "靖边波浪谷", "丹霞"], duration: "约3小时", description: "靖边波浪谷以红砂岩丹霞地貌闻名，岩层纹理如波浪起伏延展，在不同光线下呈现鲜明色彩层次。游客可沿步道观赏奇峰曲谷，拍摄独特地质形态，感受陕北极具辨识度的自然奇观。", kind: "景点" },
  { id: "qiankun-bay", name: "延川黄河乾坤湾", keywords: ["乾坤湾", "黄河乾坤湾", "延川乾坤湾"], duration: "约2.5小时", description: "乾坤湾位于黄河蛇曲国家地质公园核心区，黄河在峡谷间形成醒目的S形大转弯。登上观景台可俯瞰河湾全貌与黄土高原沟壑地貌，理解流水侵蚀塑造的地质过程，欣赏壮阔自然景色。", kind: "景点" },
  { id: "zaoyuan", name: "枣园革命旧址", keywords: ["枣园", "枣园革命旧址", "延安枣园"], duration: "约1.5小时", description: "枣园革命旧址是延安时期的重要革命旧址，保存有多处窑洞旧居、礼堂和办公场所。园区环境清幽，结合史料说明与现场参观，可了解当时的工作生活场景，以及相关历史事件的背景脉络。", kind: "景点" },
  { id: "yangjialing", name: "杨家岭革命旧址", keywords: ["杨家岭", "杨家岭革命旧址", "延安"], duration: "约1.5小时", description: "杨家岭革命旧址保留中央大礼堂、办公旧址及多处窑洞旧居，是了解延安时期重要会议与革命历程的关键节点。参观可结合展陈文字与旧址空间布局，认识建筑功能及其承载的历史意义。", kind: "景点" },
  { id: "wangjiaping", name: "王家坪革命旧址", keywords: ["王家坪", "王家坪革命旧址", "延安"], duration: "约1小时", description: "王家坪革命旧址曾是延安时期重要军事机关所在地，现保存礼堂、办公旧址与窑洞建筑。游客可通过旧址布局与展陈内容，了解相关军事工作历史，感受黄土高原上的革命旧址风貌。", kind: "景点" },
  { id: "liangjiahe", name: "梁家河村", keywords: ["梁家河", "梁家河村", "知青旧居"], duration: "约2小时", description: "梁家河村位于延川县黄土高原沟壑区，保留知青旧居、沼气池等参观点，并展示村庄生产生活与乡村发展变迁。游客可走进窑洞与田间场景，了解陕北乡村社会与知青岁月的历史记忆。", kind: "景点" },
  { id: "nwpu", name: "西北工业大学", keywords: ["西北工业大学", "西工大", "大学"], duration: "约1.5小时", description: "西北工业大学是一所以航空、航天、航海等领域见长的高等学府，校园内科研楼宇与绿化环境相映。参访可感受理工科大学学术氛围，了解学校发展历程、学科特色及科技人才培养方向。", kind: "景点" },
  { id: "xjtu", name: "西安交通大学", keywords: ["西安交通大学", "西交大", "大学"], duration: "约1.5小时", description: "西安交通大学是历史悠久的综合性研究型大学，校园兼具人文底蕴与现代学术氛围。参观可了解学校西迁历史、办学传统与校园文化景观，感受高等教育发展与城市文脉之间的紧密联系。", kind: "景点" },
];

const henanLibrary: LibraryItem[] = [
  {
    id: "henan-museum",
    name: "河南博物院",
    keywords: ["河南博物院", "河南省博物院", "博物院", "郑州博物馆"],
    duration: "约2小时",
    description: "河南博物院以中原文明发展为主线，馆藏跨越史前至明清多个时期，青铜器、陶瓷器、玉器和石刻等类别丰富。参观基本陈列与专题展览，可较系统地了解黄河文明、早期国家形成及中原地区的历史文化脉络。",
    kind: "景点",
  },
  {
    id: "henan-erqi-memorial",
    name: "郑州二七纪念馆",
    keywords: ["郑州二七纪念馆", "二七纪念馆", "二七塔", "二七纪念塔"],
    duration: "约1小时",
    description: "郑州二七纪念馆以二七纪念塔及相关陈列为核心，记录京汉铁路工人大罢工和二七精神的历史背景。馆内通过图片、文献和实物展示相关人物与事件，塔体也是郑州市中心具有代表性的城市地标。",
    kind: "景点",
  },
  {
    id: "henan-drama-city",
    name: "只有河南·戏剧幻城",
    keywords: ["只有河南", "只有河南戏剧幻城", "戏剧幻城", "幻城"],
    duration: "约5小时",
    description: "只有河南·戏剧幻城以黄河文明和中原文化为创作背景，通过大型剧场、微戏剧和院落空间讲述土地、粮食与传承的故事。园区面积较大，观看内容需按当天场次取舍，实际演出、开放区域及游览时长以景区公布为准。",
    kind: "景点",
  },
  {
    id: "henan-shaolin-temple",
    name: "少林寺",
    keywords: ["少林寺", "嵩山少林寺", "少林景区", "塔林", "少林功夫"],
    duration: "约2.5小时",
    description: "少林寺坐落于嵩山少室山腹地，始建于北魏，是中国佛教禅宗和少林武术文化的重要代表。游览可了解寺院建筑格局、佛教传承与武术文化，并结合开放情况参观塔林等区域，具体项目以景区当天安排为准。",
    kind: "景点",
  },
  {
    id: "henan-songyang-academy",
    name: "嵩阳书院",
    keywords: ["嵩阳书院", "重阳书院", "书院", "嵩阳", "四大书院"],
    duration: "约1小时",
    description: "嵩阳书院始建于北魏，后成为中国古代著名书院之一，是了解传统教育制度和儒家文化的重要场所。院内保存成组古建筑、碑刻和古柏，整体布局古朴严谨，可从建筑与陈列中感受古代书院的讲学传统。",
    kind: "景点",
  },
  {
    id: "henan-songshan",
    name: "嵩山",
    keywords: ["嵩山", "中岳嵩山", "太室山", "少室山", "登封爬山"],
    duration: "约4小时",
    description: "嵩山为五岳之中岳，由太室山、少室山等山体组成，兼具地质景观与深厚的人文积淀。不同游览线路可串联峰谷、寺观、书院和历史建筑，登山时间受所选入口、体力、天气及景区开放情况影响。",
    kind: "景点",
  },
  {
    id: "henan-zhongyue-temple",
    name: "中岳庙",
    keywords: ["中岳庙", "中岳大庙", "嵩山中岳庙", "道教建筑"],
    duration: "约1.5小时",
    description: "中岳庙位于嵩山南麓，是祭祀中岳神和展示道教文化的重要古建筑群。建筑沿中轴线层层展开，殿宇、碑刻与古柏共同构成庄严空间，参观可了解历代祭岳制度、传统建筑布局及中岳文化。",
    kind: "景点",
  },
  {
    id: "henan-qingming-park",
    name: "清明上河园",
    keywords: ["清明上河园", "清明山河园", "上河园", "开封宋城"],
    duration: "约4小时",
    description: "清明上河园以张择端《清明上河图》和北宋市井文化为创意基础，通过仿宋街巷、虹桥、水系及情景演艺营造宋代城市生活氛围。园内节目较多，建议结合当天演出表安排路线，具体场次与内容以景区公布为准。",
    kind: "景点",
  },
  {
    id: "henan-kaifeng-fu",
    name: "开封府",
    keywords: ["开封府", "包青天", "包公", "开封府景区"],
    duration: "约1.5小时",
    description: "开封府景区以北宋时期府衙文化和包公故事为展示主题，通过仿古建筑、陈列及情景活动介绍古代行政、司法与城市管理。这里属于现代建设的历史文化景区，适合结合开封古城背景了解北宋都城文化。",
    kind: "景点",
  },
  {
    id: "henan-wansui-mountain",
    name: "万岁山武侠城",
    keywords: ["万岁山武侠城", "万岁山", "大宋武侠城", "武侠城", "开封武侠城"],
    duration: "约4小时",
    description: "万岁山武侠城以宋文化和武侠题材为特色，园内设置古风街区、互动场景及多类演艺项目，游览氛围较为热闹。节目数量和时段可能随季节、节庆及运营安排调整，建议依据景区当天节目表选择观看内容。",
    kind: "景点",
  },
  {
    id: "henan-baogong-shrine",
    name: "开封包公祠",
    keywords: ["开封包公祠", "包公祠", "包拯纪念馆", "包公湖"],
    duration: "约1小时",
    description: "开封包公祠是纪念北宋名臣包拯的专题文化景区，围绕其生平事迹、清廉品格和民间影响设置殿堂与陈列。游客可结合历史资料了解包拯在开封任职的相关故事，并欣赏包公湖周边的古城景观。",
    kind: "景点",
  },
  {
    id: "henan-xiangguo-temple",
    name: "大相国寺",
    keywords: ["大相国寺", "相国寺", "开封相国寺", "皇家寺院"],
    duration: "约1小时",
    description: "大相国寺始建于北齐，北宋时期地位显著，与东京城宗教生活和城市文化关系密切。现有建筑沿中轴分布，寺内保留佛教造像与相关文化陈列，参观可感受古都开封的佛教传统和寺院空间格局。",
    kind: "景点",
  },
  {
    id: "henan-kaifeng-museum",
    name: "开封博物馆",
    keywords: ["开封博物馆", "开封市博物馆", "开博", "开封历史"],
    duration: "约2小时",
    description: "开封博物馆以开封城市历史和地域文化为主要展示内容，通过文物、模型及专题展览呈现古都发展、宋文化与地方民俗。参观可从考古遗存和馆藏资料中了解开封不同历史时期的城市变迁，具体展览以馆方安排为准。",
    kind: "景点",
  },
  {
    id: "henan-longmen-grottoes",
    name: "龙门石窟",
    keywords: ["龙门石窟", "洛阳石窟", "卢舍那大佛", "伊河石窟"],
    duration: "约3小时",
    description: "龙门石窟分布于洛阳伊河两岸，以北魏至唐代造像最具代表性，是中国石窟艺术的重要遗产。游客可沿崖壁欣赏不同规模的窟龛、佛像和题记，了解古代雕刻艺术、宗教传播以及洛阳作为都城的文化影响。",
    kind: "景点",
  },
  {
    id: "henan-white-horse-temple",
    name: "白马寺",
    keywords: ["白马寺", "洛阳白马寺", "释源", "佛教寺院"],
    duration: "约1.5小时",
    description: "白马寺始建于东汉，是中国佛教传播史上具有重要地位的寺院。院内传统殿宇、造像和碑刻展现汉地佛教建筑与历史传承，部分区域还呈现中外佛教文化交流特色，实际开放范围以寺院当天管理为准。",
    kind: "景点",
  },
  {
    id: "henan-peony-garden",
    name: "神州牡丹园",
    keywords: ["神州牡丹园", "洛阳牡丹园", "牡丹花", "白马寺牡丹园"],
    duration: "约2小时",
    description: "神州牡丹园以牡丹观赏和牡丹文化展示为特色，园内根据品种、花色及园林主题设置多个观赏区域。盛花期可欣赏不同类型牡丹与园林景观，非花期的观赏内容会有所不同，具体花况受气温、天气和养护安排影响。",
    kind: "景点",
  },
  {
    id: "henan-jiuzhou-pool",
    name: "隋唐洛阳城九洲池",
    keywords: ["九洲池", "九州池", "隋唐洛阳城九洲池", "皇家园林"],
    duration: "约1.5小时",
    description: "九洲池是隋唐洛阳城宫城西部皇家园林遗址的重要组成部分，现通过遗址保护、建筑展示和园林水景呈现宫苑格局。游览可了解隋唐时期都城规划与皇家园林文化，夜间景观及活动内容以景区实际开放安排为准。",
    kind: "景点",
  },
  {
    id: "henan-yingtian-gate",
    name: "隋唐洛阳城应天门",
    keywords: ["应天门", "应天门遗址", "隋唐洛阳城应天门", "洛阳城门"],
    duration: "约1.5小时",
    description: "应天门是隋唐洛阳城宫城正南门遗址的重要展示区，历史上承担朝廷礼仪与重大典礼功能。现有建筑采用遗址保护与阙楼形象展示相结合的方式，游客可了解隋唐都城中轴格局，并俯瞰周边城市景观。",
    kind: "景点",
  },
  {
    id: "henan-mingtang-tiantang",
    name: "隋唐洛阳城明堂天堂景区",
    keywords: ["明堂天堂", "天堂明堂", "明堂", "天堂", "隋唐洛阳城"],
    duration: "约2小时",
    description: "明堂天堂景区依托隋唐洛阳城宫城核心区遗址建设，重点展示武周时期明堂、天堂的历史功能与建筑形象。游客可通过遗址层、复原展示和数字展陈了解武则天时期的都城文化，演出和夜游内容以当天安排为准。",
    kind: "景点",
  },
  {
    id: "henan-lijing-gate",
    name: "丽景门",
    keywords: ["丽景门", "洛阳丽景门", "洛阳老城", "老城门"],
    duration: "约1小时",
    description: "丽景门位于洛阳老城历史街区西侧，是展现古城风貌的标志性城门景观。登临或穿行城门可感受城墙、楼阁与老街相连的空间关系，并可结合周边传统商业街区体验洛阳地方饮食与市井文化。",
    kind: "景点",
  },
  {
    id: "henan-laojun-mountain",
    name: "老君山",
    keywords: ["老君山", "洛阳老君山", "栾川老君山", "金顶", "伏牛山"],
    duration: "约5小时",
    description: "老君山位于洛阳栾川县，属于伏牛山系，以峰林地貌、云海景观和金顶建筑群受到游客关注。山地线路海拔变化较大，游览可结合步道与景区交通安排进行，实际时间受体力、天气、客流及开放情况影响。",
    kind: "景点",
  },
  {
    id: "henan-luoyang-museum",
    name: "洛阳博物馆",
    keywords: ["洛阳博物馆", "洛博", "河洛文明", "洛阳文物"],
    duration: "约2小时",
    description: "洛阳博物馆以河洛文明为基本展示主线，并设有珍宝、唐三彩、古代石刻和宫廷文物等专题展览。馆藏反映洛阳长期作为都城和文化中心的历史地位，适合系统了解河洛地区考古成果与古代艺术。",
    kind: "景点",
  },
  {
    id: "henan-wangcheng-park",
    name: "王城公园",
    keywords: ["王城公园", "洛阳王城公园", "牡丹园", "王城动物园"],
    duration: "约2小时",
    description: "王城公园因坐落于东周王城遗址一带而得名，融合城市园林、牡丹观赏和休闲游园等功能。春季牡丹文化活动期间景观较为集中，其他季节则以园林漫步和公共休闲为主，花况与活动以园方公布为准。",
    kind: "景点",
  },
  {
    id: "henan-suitang-botanical",
    name: "隋唐城遗址植物园",
    keywords: ["隋唐城遗址植物园", "隋唐植物园", "洛阳植物园", "牡丹园"],
    duration: "约2小时",
    description: "隋唐城遗址植物园建于隋唐洛阳城遗址区域，以植物收集、科普展示和遗址文化保护相结合。园内分布多类植物专园及牡丹观赏区域，适合休闲漫步；最佳观赏内容随季节变化，具体花期受天气影响。",
    kind: "景点",
  },
  {
    id: "henan-ancient-tomb-museum",
    name: "洛阳古墓博物馆",
    keywords: ["洛阳古墓博物馆", "古墓博物馆", "河南古代壁画馆", "洛阳古代艺术博物馆"],
    duration: "约2小时",
    description: "洛阳古墓博物馆以古代墓葬制度、典型墓室和壁画艺术为主要展示内容，将不同时期代表性墓葬进行保护性搬迁与复原陈列。馆内还设有北魏帝王陵等展示区域，可从地下空间了解古代丧葬观念和建筑艺术。",
    kind: "景点",
  },
  {
    id: "henan-dikengyuan",
    name: "陕州地坑院",
    keywords: ["陕州地坑院", "地坑院", "三门峡地坑院", "地下四合院"],
    duration: "约2.5小时",
    description: "陕州地坑院是豫西黄土塬地区独特的地下民居形式，院落由地面下挖并在四壁开凿窑洞形成，被称为“地下四合院”。景区通过传统院落、营造技艺和民俗展示，呈现当地居民因地制宜的生活智慧与非遗文化。",
    kind: "景点",
  },
  {
    id: "henan-sanmenxia-dam",
    name: "三门峡黄河大坝",
    keywords: ["三门峡黄河大坝", "三门峡大坝", "黄河大坝", "三门峡水利枢纽"],
    duration: "约1.5小时",
    description: "三门峡黄河大坝是黄河干流重要水利枢纽，可从工程景观和相关展示中了解黄河治理、水利建设及库区发展。参观范围可能受到水利运行、安全管理和季节调度影响，能否进入特定区域以景区当天规定为准。",
    kind: "景点",
  },
];

const library: LibraryItem[] = [...baseLibrary, ...additionalLibrary, ...henanLibrary];

const lodgingOptions = ["西安", "华山", "临潼", "延安", "壶口", "郑州", "洛阳", "三门峡", "开封", "登封", "不住宿"] as const;

const initialDays: DayPlan[] = [
  { id: 1, items: ["pickup"], query: "", touched: false, meals: [], lodging: "西安", photoItems: [] },
  { id: 2, items: ["city-wall", "huashan"], query: "", touched: false, meals: ["早餐"], lodging: "西安", photoItems: [] },
  { id: 3, items: ["dropoff"], query: "", touched: false, meals: ["早餐"], lodging: "不住宿", photoItems: [] },
];

const emptyDay = (id: number): DayPlan => ({
  id,
  items: [],
  query: "",
  touched: false,
  meals: [],
  lodging: id === 1 ? "西安" : "不住宿",
  photoItems: [],
});

export default function Home() {
  const [tripName, setTripName] = useState("西安华山3日游");
  const [days, setDays] = useState<DayPlan[]>(initialDays);
  const [feeIncluded, setFeeIncluded] = useState("");
  const [feeExcluded, setFeeExcluded] = useState("");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const dragRef = useRef<{ dayId: number; itemId: string } | null>(null);

  const itemById = useMemo(
    () => Object.fromEntries(library.map((item) => [item.id, item])),
    [],
  );

  const updateDay = (id: number, patch: Partial<DayPlan>) => {
    setDays((current) => current.map((day) => (day.id === id ? { ...day, ...patch } : day)));
  };

  const setDayCount = (count: number) => {
    setDays((current) =>
      Array.from({ length: count }, (_, index) => current[index] ?? emptyDay(index + 1)),
    );
  };

  const suggestionsFor = (day: DayPlan) => {
    const query = day.query.trim().toLowerCase();
    if (!query) return [];
    return library
      .filter((item) => !day.items.includes(item.id))
      .filter((item) =>
        [item.name, ...item.keywords].some((keyword) => keyword.toLowerCase().includes(query)),
      )
      .slice(0, 6);
  };

  const addItem = (day: DayPlan, itemId: string) => {
    updateDay(day.id, { items: [...day.items, itemId], query: "", touched: false });
  };

  const removeItem = (day: DayPlan, itemId: string) => {
    updateDay(day.id, {
      items: day.items.filter((id) => id !== itemId),
      photoItems: day.photoItems.filter((id) => id !== itemId),
    });
  };

  const toggleMeal = (day: DayPlan, meal: string) => {
    const meals = day.meals.includes(meal)
      ? day.meals.filter((value) => value !== meal)
      : [...day.meals, meal];
    updateDay(day.id, { meals });
  };

  const togglePhoto = (day: DayPlan, itemId: string) => {
    if (day.photoItems.includes(itemId)) {
      updateDay(day.id, { photoItems: day.photoItems.filter((id) => id !== itemId) });
      return;
    }
    if (day.photoItems.length >= 3) {
      setMessage(`Day${day.id}最多只能选择3张景区图片`);
      return;
    }
    updateDay(day.id, { photoItems: [...day.photoItems, itemId] });
    setMessage("");
  };

  const dropItem = (day: DayPlan, targetId: string) => {
    const dragging = dragRef.current;
    if (!dragging || dragging.dayId !== day.id || dragging.itemId === targetId) return;
    const next = [...day.items];
    const from = next.indexOf(dragging.itemId);
    const to = next.indexOf(targetId);
    next.splice(from, 1);
    next.splice(to, 0, dragging.itemId);
    updateDay(day.id, { items: next });
    dragRef.current = null;
  };

  const validate = () => {
    const hasName = tripName.trim().length > 0;
    const nextDays = days.map((day) => ({
      ...day,
      touched: day.query.trim().length > 0 || day.items.length === 0,
    }));
    setDays(nextDays);
    if (!hasName) {
      setMessage("请先填写行程名称");
      return false;
    }
    if (nextDays.some((day) => day.query.trim().length > 0 || day.items.length === 0)) {
      setMessage("有景点尚未从联想结果中确认，请检查红色输入框");
      setTimeout(() => document.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return false;
    }
    setMessage("");
    return true;
  };

  const exportDocx = async () => {
    if (!validate()) return;
    setExporting(true);
    try {
      const {
        AlignmentType,
        BorderStyle,
        Document,
        ImageRun,
        Packer,
        Paragraph,
        ShadingType,
        Table,
        TableCell,
        TableLayoutType,
        TableRow,
        TextRun,
        WidthType,
      } = await import("docx");

      const photoBuffers = new Map<string, ArrayBuffer>();
      const photoIds = [...new Set(days.flatMap((day) => day.photoItems))];
      await Promise.all(
        photoIds.map(async (id) => {
          const item = itemById[id];
          if (!item?.image) return;
          const response = await fetch(item.image);
          if (!response.ok) throw new Error("图片读取失败");
          photoBuffers.set(id, await response.arrayBuffer());
        }),
      );

      const border = { style: BorderStyle.SINGLE, size: 10, color: "C8B6A4" };
      const zeroSpacing = { before: 0, after: 0, line: 240 };
      const tableSeparator = () =>
        new Paragraph({
          spacing: { before: 0, after: 0, line: 1 },
          children: [new TextRun({ text: "", size: 1 })],
        });
      const formatLodgingLabel = (lodging: string) => (lodging === "不住宿" ? "不住宿" : `住：${lodging}`);
      const feeBodyParagraphs = (text: string) => {
        const lines = text.trim() ? text.replace(/\r\n/g, "\n").split("\n") : ["暂无说明"];
        return lines.map(
          (line) =>
            new Paragraph({
              spacing: zeroSpacing,
              children: [new TextRun({ text: line.length ? line : " " })],
            }),
        );
      };
      const buildFeeTable = (title: string, text: string) =>
        new Table({
          width: { size: 10000, type: WidthType.DXA },
          layout: TableLayoutType.FIXED,
          columnWidths: [10000],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 10000, type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                  margins: { top: 170, bottom: 170, left: 200, right: 200 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: title, bold: true, size: 27, color: "FFFFFF" })],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 10000, type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 140, bottom: 140, left: 200, right: 200 },
                  children: feeBodyParagraphs(text),
                }),
              ],
            }),
          ],
        });

      const summaryColumnWidths = [900, 5200, 2000, 1900];
      const summaryTable = new Table({
        width: { size: 10000, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: summaryColumnWidths,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 4,
                width: { size: 10000, type: WidthType.DXA },
                borders: { top: border, bottom: border, left: border, right: border },
                shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                margins: { top: 170, bottom: 170, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    spacing: zeroSpacing,
                    children: [new TextRun({ text: "简版行程安排", bold: true, size: 27, color: "FFFFFF" })],
                  }),
                ],
              }),
            ],
          }),
          ...days.map((day) => {
            const selected = day.items.map((id) => itemById[id]);
            const route = selected.map((item) => item.name).join(" → ") || "待安排";
            const meals = day.meals.length ? day.meals.join("、") : "不含餐";
            return new TableRow({
              children: [
                new TableCell({
                  width: { size: summaryColumnWidths[0], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: `D${day.id}`, bold: true })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: summaryColumnWidths[1], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: route })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: summaryColumnWidths[2], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: meals })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: summaryColumnWidths[3], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: formatLodgingLabel(day.lodging) })],
                    }),
                  ],
                }),
              ],
            });
          }),
        ],
      });

      const children: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: tripName.trim(), bold: true, size: 36, color: "2E2924" })],
        }),
        summaryTable,
      ];

      days.forEach((day) => {
        const selected = day.items.map((id) => itemById[id]);
        const detailContent: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [];

        const narrativeRuns: InstanceType<typeof TextRun>[] = [];
        selected.forEach((item, index) => {
          narrativeRuns.push(new TextRun({ text: `【${item.name}】`, bold: true, color: "8B3E2F" }));
          if (item.duration) {
            narrativeRuns.push(new TextRun({ text: `（游览${item.duration}）`, bold: true, color: "37322E" }));
          }
          narrativeRuns.push(new TextRun({ text: item.description, color: "37322E" }));
          if (index < selected.length - 1) {
            narrativeRuns.push(new TextRun({ text: "；", color: "37322E" }));
          }
        });
        detailContent.push(
          new Paragraph({
            spacing: { before: 60, after: 60, line: 360 },
            children: narrativeRuns.length
              ? narrativeRuns
              : [new TextRun({ text: "当天行程待安排。", color: "37322E" })],
          }),
        );

        const dayPhotos = day.photoItems
          .map((id) => itemById[id])
          .filter((item) => item?.image && photoBuffers.has(item.id))
          .slice(0, 3);
        if (dayPhotos.length) {
          const imageWidth = dayPhotos.length === 1 ? 420 : dayPhotos.length === 2 ? 260 : 165;
          const imageHeight = Math.round(imageWidth * 0.64);
          detailContent.push(
            new Paragraph({
              spacing: { before: 180, after: 100 },
              children: [new TextRun({ text: "行程图片", bold: true, color: "8B3E2F" })],
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: dayPhotos.map((item) =>
                    new TableCell({
                      width: { size: Math.floor(100 / dayPhotos.length), type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        bottom: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        left: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        right: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                      },
                      margins: { top: 100, bottom: 100, left: 80, right: 80 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new ImageRun({
                              type: "jpg",
                              data: photoBuffers.get(item.id)!,
                              transformation: { width: imageWidth, height: imageHeight },
                            }),
                          ],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 70 },
                          children: [new TextRun({ text: item.name, bold: true, size: 18, color: "5F5851" })],
                        }),
                      ],
                    }),
                  ),
                }),
              ],
            }),
          );
        }

        children.push(
          tableSeparator(),
          new Table({
            width: { size: 10000, type: WidthType.DXA },
            layout: TableLayoutType.FIXED,
            columnWidths: [5000, 5000],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    columnSpan: 2,
                    width: { size: 10000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                    margins: { top: 170, bottom: 170, left: 200, right: 200 },
                    children: [
                      new Paragraph({
                        spacing: zeroSpacing,
                        children: [
                          new TextRun({
                            text: `Day${day.id}  ${selected.map((item) => item.name).join(" · ")}`,
                            bold: true,
                            size: 27,
                            color: "FFFFFF",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 5000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "F8F3EC", type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [
                      new Paragraph({
                        spacing: zeroSpacing,
                        children: [
                          new TextRun({
                            text: `用餐：${day.meals.length ? day.meals.join("、") : "不含餐"}`,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 5000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "F8F3EC", type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [
                      new Paragraph({
                        spacing: zeroSpacing,
                        children: [new TextRun({ text: `住宿：${day.lodging}`, bold: true })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    columnSpan: 2,
                    width: { size: 10000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    margins: { top: 90, bottom: 120, left: 200, right: 200 },
                    children: detailContent,
                  }),
                ],
              }),
            ],
          }),
        );
      });

      children.push(
        tableSeparator(),
        buildFeeTable("费用包含", feeIncluded),
        tableSeparator(),
        buildFeeTable("费用不含", feeExcluded),
      );

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: "Microsoft YaHei", size: 22, color: "37322E" },
              paragraph: { spacing: { line: 340, after: 100 } },
            },
          },
        },
        sections: [
          {
            properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
            children,
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${tripName.trim().replace(/[\\/:*?"<>|]/g, "-")}.docx`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("Word文档已生成");
    } catch {
      setMessage("文档生成失败，请重试");
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="trip-builder">
      <header className="topbar">
        <div className="brand-mark">行</div>
        <div>
          <strong>行程生成器</strong>
          <span>简单选择，快速成稿</span>
        </div>
        <div className="library-count">景点资料库 · {library.length} 项</div>
      </header>

      <section className="setup-card" aria-label="行程基本信息">
        <label className={!tripName.trim() && message ? "field-error" : ""}>
          <span>行程名称</span>
          <input value={tripName} onChange={(event) => setTripName(event.target.value)} placeholder="例如：西安华山3日游" />
        </label>
        <label>
          <span>行程天数</span>
          <select value={days.length} onChange={(event) => setDayCount(Number(event.target.value))}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>{count} 天</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="sample-button"
          onClick={() => {
            setTripName("西安华山3日游");
            setDays(initialDays);
            setMessage("");
          }}
        >
          恢复示例
        </button>
      </section>

      <section className="days-section">
        <div className="section-heading">
          <div>
            <span>每日安排</span>
            <h2>按天添加景点</h2>
          </div>
          <p>输入关键词后，请点击联想结果确认</p>
        </div>

        <div className="timeline">
          {days.map((day) => {
            const suggestions = suggestionsFor(day);
            const invalid = day.touched && (day.query.trim().length > 0 || day.items.length === 0);
            return (
              <article className="day-card" key={day.id}>
                <div className="day-index">
                  <span>DAY</span>
                  <strong>{String(day.id).padStart(2, "0")}</strong>
                </div>
                <div className="day-content">
                  <div className="route-preview">
                    {day.items.length
                      ? day.items.map((id) => itemById[id].name).join("  →  ")
                      : "这一天还没有添加安排"}
                  </div>

                  <div className={`search-box ${invalid ? "field-error" : ""}`}>
                    <div className="selected-items">
                      {day.items.map((id) => (
                        <span
                          className="item-chip"
                          key={id}
                          draggable
                          onDragStart={() => { dragRef.current = { dayId: day.id, itemId: id }; }}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={() => dropItem(day, id)}
                          title="拖动可调整顺序"
                        >
                          <i aria-hidden="true">⋮⋮</i>
                          {itemById[id].name}
                          <button type="button" aria-label={`删除${itemById[id].name}`} onClick={() => removeItem(day, id)}>×</button>
                        </span>
                      ))}
                    </div>
                    <input
                      aria-label={`Day${day.id}景点关键词`}
                      value={day.query}
                      onChange={(event) => updateDay(day.id, { query: event.target.value, touched: false })}
                      onBlur={() => {
                        if (day.query.trim() || day.items.length === 0) updateDay(day.id, { touched: true });
                      }}
                      placeholder="输入景点关键词，例如：城墙、华山、接机"
                    />
                    {day.query.trim() && (
                      <div className="suggestions" role="listbox">
                        {suggestions.length ? suggestions.map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => addItem(day, item.id)}
                          >
                            <span>{item.name}<small>{item.kind}</small></span>
                            {item.duration && <em>{item.duration}</em>}
                          </button>
                        )) : <p>没有找到匹配项目</p>}
                      </div>
                    )}
                  </div>
                  {invalid && <p className="error-note">请从联想结果中选择景点或服务项目</p>}

                  <div className="day-options">
                    <fieldset>
                      <legend>当天含餐</legend>
                      <div className="meal-options">
                        {["早餐", "中餐", "晚餐"].map((meal) => (
                          <label key={meal}>
                            <input type="checkbox" checked={day.meals.includes(meal)} onChange={() => toggleMeal(day, meal)} />
                            <span>{meal}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label className="lodging-select">
                      <span>当天住宿</span>
                      <select value={day.lodging} onChange={(event) => updateDay(day.id, { lodging: event.target.value })}>
                        {lodgingOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="photo-picker">
                    <div className="photo-picker-title">
                      <strong>行程图片</strong>
                      <span>最多选择3张，统一放在当天文字最后</span>
                    </div>
                    <div className="photo-options">
                      {day.items.filter((id) => itemById[id].kind === "景点").length ? (
                        day.items
                          .filter((id) => itemById[id].kind === "景点")
                          .map((id) => {
                            const item = itemById[id];
                            const ready = Boolean(item.image);
                            return (
                              <label key={id} className={!ready ? "photo-pending" : ""}>
                                <input
                                  type="checkbox"
                                  checked={day.photoItems.includes(id)}
                                  disabled={!ready || (!day.photoItems.includes(id) && day.photoItems.length >= 3)}
                                  onChange={() => togglePhoto(day, id)}
                                />
                                <span>{item.name}</span>
                                {!ready && <small>图片待补</small>}
                              </label>
                            );
                          })
                      ) : (
                        <p>当天没有需要配图的景区</p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="fee-section" aria-label="费用说明">
        <label className="fee-box">
          <span>费用包含</span>
          <textarea
            value={feeIncluded}
            onChange={(event) => setFeeIncluded(event.target.value)}
            placeholder="请输入交通、住宿、门票、用餐、导游等包含项目，每行一项"
            rows={5}
          />
        </label>
        <label className="fee-box">
          <span>费用不含</span>
          <textarea
            value={feeExcluded}
            onChange={(event) => setFeeExcluded(event.target.value)}
            placeholder="请输入单房差、个人消费、自费项目等不包含项目，每行一项"
            rows={5}
          />
        </label>
      </section>

      <footer className="action-bar">
        <div>
          <strong>{tripName || "未命名行程"}</strong>
          <span>{days.length} 天 · 共 {days.reduce((sum, day) => sum + day.items.length, 0)} 个项目</span>
        </div>
        {message && <p className={message.includes("已生成") ? "success-message" : "status-message"}>{message}</p>}
        <button type="button" onClick={exportDocx} disabled={exporting}>
          {exporting ? "正在生成…" : "生成 Word 文档"}
        </button>
      </footer>
    </main>
  );
}
