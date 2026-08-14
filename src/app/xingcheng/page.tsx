"use client";

import "./xingcheng.css";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

const PRIORITY_ATTRACTION_IMAGES = new Set(["city-wall", "terracotta", "huashan"]);

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
    id: "station-pickup",
    name: "接站",
    keywords: ["接站", "火车站", "高铁站", "车站", "接"],
    duration: "",
    description: "工作人员根据列车抵达时间提前等候，接到客人后乘车前往酒店，协助办理入住并介绍后续行程安排。",
    kind: "服务",
  },
  {
    id: "city-wall",
    name: "西安明城墙",
    keywords: ["城墙", "明城墙", "西安城墙"],
    duration: "约60分钟",
    description: "西安明城墙始建于明洪武年间，是中国现存规模宏大、保存完整的古代城垣之一。城墙、城门、敌楼、角楼和护城河共同展现传统城市防御体系，登城可沿古城轮廓远眺钟楼、街巷与现代西安，直观感受古都格局的延续。",
    kind: "景点",
    image: "/images/attractions/city-wall.webp",
  },
  {
    id: "xian-museum",
    name: "西安博物院",
    keywords: ["西安博物院", "博物院", "博物馆"],
    duration: "约1.5小时",
    description: "西安博物院由博物馆馆区、唐代小雁塔和荐福寺历史文化区组成。馆内以西安建都史和城市发展为主线，展示周秦汉唐以来的文物与城市生活；漫步园区还可欣赏小雁塔、古建筑和园林景观，理解古都长安的历史变迁。",
    kind: "景点",
  },
  {
    id: "bell-drum-square",
    name: "钟鼓楼广场",
    keywords: ["钟楼", "鼓楼", "钟鼓楼", "广场"],
    duration: "约40分钟",
    description: "钟鼓楼广场位于西安古城中心，连接明代钟楼、鼓楼及周边历史街区，是观察古城中轴和城市格局的重要位置。游客可近距离欣赏两座楼阁的建筑细节，了解古代击钟报晨、击鼓报暮的城市报时制度，并感受老城繁华街景。",
    kind: "景点",
  },
  {
    id: "muslim-quarter",
    name: "回民小吃街",
    keywords: ["回民街", "小吃街", "美食"],
    duration: "约1小时",
    description: "回民小吃街以北院门及周边街巷为核心，是西安回坊历史文化和市井生活的集中展示区。街区分布清真寺、传统民居、老字号与特色餐饮，可品尝牛羊肉泡馍、肉丸胡辣汤、甑糕等风味，在烟火气中感受多民族交流形成的饮食传统。",
    kind: "景点",
  },
  {
    id: "terracotta",
    name: "秦始皇兵马俑博物馆",
    keywords: ["兵马俑", "秦始皇", "秦俑"],
    duration: "约2小时",
    description: "秦始皇兵马俑博物馆以秦始皇帝陵兵马俑坑为核心，展示规模宏大的陶俑、陶马和秦代军事遗存。不同俑坑呈现步兵、车兵、骑兵等军阵布局，陶俑面貌与服饰各具特征，是了解秦代军制、雕塑艺术、工艺技术及统一帝国的重要窗口。",
    kind: "景点",
    image: "/images/attractions/terracotta.webp",
  },
  {
    id: "huaqing",
    name: "华清宫",
    keywords: ["华清宫", "华清池", "骊山"],
    duration: "约1.5小时",
    description: "华清宫坐落于骊山北麓，以天然温泉和唐代皇家宫苑文化著称。景区保存莲花汤、海棠汤等御汤遗址，并通过建筑、园林和展陈讲述唐玄宗与杨贵妃的历史故事；五间厅等旧址还记录了西安事变相关历史，兼具古代与近现代文化内涵。",
    kind: "景点",
    image: "/images/attractions/huaqing.webp",
  },
  {
    id: "huashan",
    name: "西岳华山",
    keywords: ["华山", "西岳", "爬山"],
    duration: "约5小时",
    description: "华山是中国五岳之一，以花岗岩峰林、峭壁深谷和险峻山势闻名。东、西、南、北、中五峰各具特色，沿途可见长空栈道、苍龙岭等代表性景观。游客可根据体力、天气和景区开放情况选择徒步或索道线路，体验雄奇壮阔的秦岭山岳风光。",
    kind: "景点",
    image: "/images/attractions/huashan.webp",
  },
  {
    id: "dayan-pagoda",
    name: "大雁塔北广场",
    keywords: ["大雁塔", "北广场", "音乐喷泉"],
    duration: "约40分钟",
    description: "大雁塔北广场位于大慈恩寺与大雁塔北侧，以唐文化主题景观、轴线式布局和音乐喷泉闻名。广场上的雕塑、灯饰与园林小品展现盛唐文化意象，可从开阔视角观赏大雁塔全貌，也是连接大慈恩寺、大唐不夜城等景区的重要城市公共空间。",
    kind: "景点",
  },
  {
    id: "everbright-city",
    name: "大唐不夜城",
    keywords: ["不夜城", "大唐不夜城", "夜景"],
    duration: "约1.5小时",
    description: "大唐不夜城以盛唐文化为主题，沿街设置唐风建筑、人物雕塑、艺术装置、文化场馆和商业空间。夜间灯光与街头演艺营造热闹的城市夜游氛围，游客可边走边看互动表演、体验文创与餐饮，在现代街区中感受长安文化的当代表达。",
    kind: "景点",
    image: "/images/attractions/everbright-city.webp",
  },
  {
    id: "dropoff",
    name: "机场送机",
    keywords: ["送机", "机场", "送"],
    duration: "",
    description: "根据返程航班时间合理安排送机，提前从酒店出发前往机场，途中确认行李与行程节点，抵达机场相应航站楼后结束本次接待服务。",
    kind: "服务",
  },
  {
    id: "station-dropoff",
    name: "送站",
    keywords: ["送站", "火车站", "高铁站", "车站", "送"],
    duration: "",
    description: "根据返程列车时间合理安排送站，提前从酒店出发前往火车站或高铁站，抵达后结束本次行程。",
    kind: "服务",
  },
];

const additionalLibrary: LibraryItem[] = [
  { id: "xiyue-temple", name: "西岳庙", keywords: ["西岳庙", "华岳庙", "岳庙"], duration: "约1.5小时", description: "西岳庙是历代帝王祭祀西岳华山神的重要场所，庙宇沿中轴线展开，分布棂星门、金城门、灏灵殿等建筑。其宫殿式格局、古柏、碑刻和琉璃构件保存了丰富的礼制与建筑信息，参观可了解中国古代山岳崇拜和皇家祭祀文化。", kind: "景点" },
  { id: "daci-en-temple", name: "大慈恩寺", keywords: ["大慈恩寺", "慈恩寺", "大雁塔"], duration: "约1.5小时", description: "大慈恩寺是唐代长安著名佛寺，也是大雁塔所在地。玄奘法师曾在此主持译经，大雁塔最初用于保存由印度带回的佛经与佛像。寺院通过殿宇、塔院和相关展陈呈现佛教传播、译经事业及中外文化交流，是认识盛唐佛教文化的重要场所。", kind: "景点" },
  { id: "gaojia-courtyard", name: "高家大院", keywords: ["高家大院", "高家宅院", "北院门"], duration: "约1小时", description: "高家大院位于北院门历史街区，是保存较完整的明清传统民居院落。宅院以多进院落、厅房、厢房和精细的砖木雕刻呈现关中民居格局，院内还常设皮影、剪纸等民俗展示，可从建筑与日常生活两个角度感受老西安的城市文化。", kind: "景点" },
  { id: "bailuyuan", name: "白鹿原影视城", keywords: ["白鹿原", "白鹿原影视城", "影视城"], duration: "约3小时", description: "白鹿原影视城以陈忠实小说《白鹿原》和关中地域文化为背景，建有白鹿村、滋水县城等实景街区。景区融合影视场景、地方演艺、民俗展示和特色餐饮，游客可穿行于传统村落与县城街巷，体验关中社会生活和文学故事的场景化呈现。", kind: "景点" },
  { id: "qinqiang", name: "非遗体验·秦腔", keywords: ["秦腔", "非遗", "非遗体验"], duration: "约1小时", description: "秦腔是流行于西北地区的传统戏曲，以高亢激越的唱腔、鲜明的板式和质朴豪放的表演见长。体验活动可通过唱段欣赏、脸谱与服饰讲解、基础身段或唱腔学习，认识生、旦、净、丑等行当，在互动中感受秦腔与关中方言、民俗生活的联系。", kind: "景点" },
  { id: "changan-twelve", name: "长安十二时辰主题街区", keywords: ["长安十二时辰", "十二时辰", "主题街区"], duration: "约2小时", description: "长安十二时辰主题街区以唐代长安城的市井生活为创意背景，通过唐风建筑、人物巡游、沉浸演艺、互动任务和特色餐饮营造多层次体验。游客可换装游览、观看剧情表演，在室内街巷中感受盛唐礼仪、乐舞、商业与节庆文化的现代表达。", kind: "景点" },
  { id: "daming-palace", name: "大明宫国家遗址公园", keywords: ["大明宫", "大明宫遗址", "遗址公园"], duration: "约2小时", description: "大明宫是唐代重要皇宫和政治中心，遗址公园以考古遗迹保护与展示为核心。游客可沿宫城中轴了解丹凤门、含元殿、宣政殿、紫宸殿等建筑格局，并通过复原模型、出土文物和数字展陈认识唐代宫廷制度、都城规划与盛唐气象。", kind: "景点" },
  { id: "beilin-museum", name: "西安碑林博物馆", keywords: ["碑林", "碑林博物馆", "西安碑林"], duration: "约1.5小时", description: "西安碑林博物馆由孔庙古建筑群、碑林和石刻艺术陈列组成，收藏历代碑石、墓志及石刻精品。馆内可见《开成石经》以及欧阳询、颜真卿、柳公权等名家碑刻，是系统了解中国书法流变、经典文献保存和古代石刻艺术的重要场所。", kind: "景点" },
  { id: "archaeology-museum", name: "陕西考古博物馆", keywords: ["考古博物馆", "陕西考古", "考古"], duration: "约2小时", description: "陕西考古博物馆以考古学科和陕西重要考古成果为主线，不仅展示出土文物，也呈现遗址调查、田野发掘、科技检测、文物保护与修复过程。参观者可从考古工作方法出发理解文明演进，认识文物从发现现场进入研究与展示空间的完整历程。", kind: "景点" },
  { id: "banpo-museum", name: "西安半坡博物馆", keywords: ["半坡", "半坡博物馆", "半坡遗址"], duration: "约1.5小时", description: "西安半坡博物馆依托约六千年前的新石器时代聚落遗址建立。遗址大厅展示房屋、窖穴、陶窑、墓葬和环壕等聚落遗迹，出土陶器、石器与骨器反映先民的生产生活、审美观念和社会组织，是认识仰韶文化与史前聚落的重要窗口。", kind: "景点" },
  { id: "tang-paradise", name: "大唐芙蓉园", keywords: ["大唐芙蓉园", "芙蓉园", "唐文化"], duration: "约2.5小时", description: "大唐芙蓉园以盛唐文化和皇家园林意象为主题，园内分布紫云楼、仕女馆、曲江流饮等仿唐建筑与水景。景区通过礼乐演艺、巡游、灯光和互动活动展现唐代诗歌、乐舞、服饰与节庆文化，夜间游览尤其适合感受华灯映水的唐风氛围。", kind: "景点" },
  { id: "xian-botanical", name: "西安植物园", keywords: ["西安植物园", "植物园", "花卉"], duration: "约2小时", description: "西安植物园兼具植物保护、科学研究、科普教育和休闲游览功能，设有多个植物专类园及季节性花卉展示区。游客可观察不同生态类型与植物群落，了解秦岭及西北地区植物多样性，在四季变化的园林景观中开展自然观察与亲子科普体验。", kind: "景点" },
  { id: "shuyuanmen", name: "书院门文化街", keywords: ["书院门", "书院门文化街", "文房四宝"], duration: "约1小时", description: "书院门文化街因关中书院而得名，街区连接古城墙、碑林及传统院落，聚集书画、篆刻、碑帖拓片、文房四宝和民间工艺店铺。漫步青石街巷，可观察书画创作与装裱技艺，感受西安延续至今的文人传统和古城生活气息。", kind: "景点" },
  { id: "yongxingfang", name: "永兴坊", keywords: ["永兴坊", "陕西美食", "非遗美食"], duration: "约1小时", description: "永兴坊以关中传统建筑和陕西地域文化为特色，集中展示三秦各地小吃、非遗技艺与民俗表演。游客可按地域品尝不同风味，观看传统手作和节庆活动，在院落式街区中了解陕西饮食背后的物产、生活习惯与地方文化差异。", kind: "景点" },
  { id: "daxingshan", name: "大兴善寺", keywords: ["大兴善寺", "兴善寺", "寺院"], duration: "约1小时", description: "大兴善寺历史悠久，隋唐时期是长安重要皇家寺院，也是佛教密宗经典翻译与传播的重要场所。寺院中轴分布山门、天王殿、大雄宝殿等建筑，环境清幽，参访可了解古代长安佛教发展、译经活动以及中外僧侣往来的历史。", kind: "景点" },
  { id: "xian-incident", name: "西安事变纪念馆", keywords: ["西安事变纪念馆", "西安事变", "纪念馆"], duration: "约1.5小时", description: "西安事变纪念馆依托张学良公馆、杨虎城止园别墅等相关旧址建立，通过文物、照片、档案和场景复原，讲述1936年西安事变的背景、经过与和平解决过程。参观可理解这一事件对停止内战、推动全民族抗战所产生的重要历史影响。", kind: "景点" },
  { id: "xian-romance", name: "《西安千古情》", keywords: ["千古情", "西安千古情", "演出"], duration: "约1小时", description: "《西安千古情》以大型歌舞、舞台机械、灯光影像和特效串联西安历史文化。从史前文明、周秦气象到汉唐盛世与丝路交流，演出以浓缩的艺术叙事呈现古都的重要历史片段，适合在较短时间内获得兼具视觉效果与地域文化的观演体验。", kind: "景点" },
  { id: "camel-bells", name: "《驼铃传奇》", keywords: ["驼铃传奇", "驼铃", "演出"], duration: "约1小时", description: "《驼铃传奇》以古丝绸之路上的商旅往来为故事背景，通过旋转舞台、机械装置、实景水火特效和演员表演，再现驼队出发、沿途历险与归来的旅程。演出突出长安作为丝路起点的开放气象，展现古代中外贸易与文化交流的想象图景。", kind: "景点" },
  { id: "zhang-residence", name: "张学良公馆", keywords: ["张学良公馆", "张学良", "公馆"], duration: "约1小时", description: "张学良公馆由多幢中西合璧建筑组成，是张学良在西安期间的重要居所和办公地点，也是西安事变相关活动的核心旧址之一。馆内通过旧居复原、历史照片与文献展陈，介绍张学良生平、西安事变的酝酿经过及和平解决的历史进程。", kind: "景点" },
  { id: "shaanxi-history", name: "陕西历史博物馆", keywords: ["陕西历史博物馆", "陕历博", "历史博物馆"], duration: "约2.5小时", description: "陕西历史博物馆以《陕西古代文明》基本陈列为核心，系统展示史前至明清时期陕西地区的发展，尤以周、秦、汉、唐文物见长。馆藏青铜器、陶俑、唐代金银器和墓葬壁画精品荟萃，是从陕西考古成果理解中华文明与古代丝路交流的重要场所。", kind: "景点", image: "/images/attractions/shaanxi-history.webp" },
  { id: "tang-west-market", name: "大唐西市", keywords: ["大唐西市", "西市", "丝路"], duration: "约1.5小时", description: "大唐西市所在区域承载唐长安西市的历史记忆，现以遗址展示、博物馆、商业街区和丝路文化体验相结合。游客可通过出土文物、市场复原和专题展陈了解唐代商品交易、胡商往来、货币使用及城市生活，感受古长安开放多元的商业气象。", kind: "景点" },
  { id: "hancheng-lake", name: "汉城湖景区", keywords: ["汉城湖", "汉城湖景区", "汉文化"], duration: "约2小时", description: "汉城湖景区依托汉长安城遗址周边水系建设，将湖泊生态、园林休闲与汉文化展示结合。沿湖可观察汉城墙遗迹及主题建筑，通过雕塑、展陈和景观节点了解汉长安城格局、汉代礼制与城市生活，适合慢行观景和文化休闲。", kind: "景点" },
  { id: "qinglong-temple", name: "青龙寺", keywords: ["青龙寺", "樱花", "寺院"], duration: "约1小时", description: "青龙寺是唐代长安重要佛寺，与中日佛教文化交流关系密切，日本僧人空海曾在此学习密法。寺院通过纪念建筑和相关展示讲述唐代佛教东传历史，园区环境清雅，春季樱花盛开时，古寺文化与花木景观相映成趣。", kind: "景点" },
  { id: "yisushe", name: "易俗社文化街区", keywords: ["易俗社", "易俗社街区", "秦腔"], duration: "约1.5小时", description: "易俗社文化街区以创办于1912年的秦腔剧社易俗社为核心，融合剧场、百年博物馆、传统戏楼、非遗展示和老字号商业。游客可了解秦腔剧目创作、演员培养及近现代城市文化，在展陈与现场演出中感受西安戏曲生活的延续。", kind: "景点" },
  { id: "xiying", name: "西影电影园区", keywords: ["西安电影制片厂", "西影厂", "西影电影园区"], duration: "约1.5小时", description: "西影电影园区由西安电影制片厂更新而来，保留摄影棚、办公建筑和电影工业遗存，并设置电影博物馆、艺术展览、文创与场景体验。参观可回顾中国西部电影的发展历程，了解经典影片、拍摄技术和一代电影人的创作故事。", kind: "景点" },
  { id: "qinling-four", name: "秦岭四宝科学公园", keywords: ["秦岭四宝", "四宝科学公园", "大熊猫"], duration: "约2.5小时", description: "秦岭四宝科学公园以大熊猫、朱鹮、金丝猴和羚牛四种秦岭珍稀动物为核心，兼具救护繁育、科学研究、保护教育和公众参观功能。游客可观察动物生活状态，了解秦岭生态系统、物种保护成果以及野生动物栖息地保护的重要性。", kind: "景点" },
  { id: "qinling-wildlife", name: "西安秦岭野生动物园", keywords: ["秦岭野生动物园", "野生动物园", "动物园"], duration: "约4小时", description: "西安秦岭野生动物园依托秦岭北麓自然环境，设置步行游览区、车行观赏区及多类动物场馆。园内汇集来自不同地区的野生动物，并配合行为展示与科普讲解，适合家庭游客在观赏动物的同时认识物种多样性和生态保护知识。", kind: "景点" },
  { id: "famen-temple", name: "法门文化景区", keywords: ["法门寺", "法门文化景区", "佛指舍利"], duration: "约3小时", description: "法门文化景区以法门寺、唐代塔基地宫遗址和法门寺博物馆为核心。地宫出土佛教文物、唐代宫廷奉纳器物及金银器、琉璃器、秘色瓷等珍品，集中反映唐代宗教礼仪、宫廷工艺与中外交流，是了解佛教文化和大唐艺术的重要目的地。", kind: "景点" },
  { id: "qianling", name: "乾陵", keywords: ["乾陵", "武则天", "唐陵"], duration: "约2小时", description: "乾陵是唐高宗李治与武则天的合葬陵，依梁山而建，神道两侧保存华表、翼马、石人石马、无字碑、述圣纪碑和蕃臣像等大型石刻。陵园格局与陪葬墓出土壁画、陶俑等文物，共同展现唐代皇家陵寝制度、雕刻艺术及开放多元的时代风貌。", kind: "景点" },
  { id: "hukou", name: "黄河壶口瀑布（陕西侧）", keywords: ["壶口瀑布", "黄河壶口", "陕西壶口"], duration: "约1.5小时", description: "黄河壶口瀑布位于秦晋峡谷之间，宽阔河面在壶口处骤然收束，河水奔涌跌落，形成浊浪翻滚、声震峡谷的壮观景象。不同水量和季节可见瀑布群、彩虹与冰挂等景观，是观察黄河地貌、感受黄土高原自然力量和黄河文化的重要地点。", kind: "景点", image: "/images/attractions/hukou.webp" },
  { id: "huangdi-mausoleum", name: "黄帝陵", keywords: ["黄帝陵", "轩辕黄帝", "桥山"], duration: "约2小时", description: "黄帝陵位于黄陵县桥山，是祭祀中华人文初祖轩辕黄帝的重要文化场所。景区由轩辕庙、古柏群、祭祀广场和陵区组成，保存黄帝手植柏等古树及历代碑刻。参观可了解中华民族的始祖记忆、国家祭典传统与延续千年的寻根文化。", kind: "景点" },
  { id: "yucha-canyon", name: "甘泉大峡谷（雨岔大峡谷）", keywords: ["雨岔大峡谷", "甘泉大峡谷", "雨岔"], duration: "约3小时", description: "甘泉大峡谷由流水长期冲蚀红色砂岩形成，峡谷狭长幽深，岩壁呈现流线、波纹和丰富色彩。阳光从谷顶进入后，岩层会随时间产生明暗与色调变化。游览需沿开放沟谷步行，并根据天气和景区安全安排欣赏独特的丹霞峡谷地貌。", kind: "景点" },
  { id: "wave-valley", name: "靖边波浪谷", keywords: ["波浪谷", "靖边波浪谷", "丹霞"], duration: "约3小时", description: "靖边波浪谷以红砂岩丹霞地貌著称，层层岩纹如波浪、指纹和流水般延展，是长期沉积与风化侵蚀共同形成的地质景观。景区内峡谷、崖壁和红色岩丘形态多样，不同光线下色彩变化明显，适合开展地质观察和自然风光摄影。", kind: "景点" },
  { id: "qiankun-bay", name: "延川黄河乾坤湾", keywords: ["乾坤湾", "黄河乾坤湾", "延川乾坤湾"], duration: "约2.5小时", description: "延川黄河乾坤湾位于黄河蛇曲地貌核心区域，黄河在黄土高原峡谷间形成巨大的弯曲河道。登临观景台可俯瞰河流、山梁、村落与沟壑交织的壮阔景观，并通过地质与人文展示了解黄河蛇曲形成及沿岸生产生活。", kind: "景点" },
  { id: "zaoyuan", name: "枣园革命旧址", keywords: ["枣园", "枣园革命旧址", "延安枣园"], duration: "约1.5小时", description: "枣园革命旧址又称“延园”，1944年10月至1947年3月曾是中共中央书记处所在地。这里见证了整风和大生产运动的深入开展、党的七大筹备以及革命形势的重要转折。现有中央书记处小礼堂、多处革命家旧居、“为人民服务”讲话台和中央医务所等遗址。", kind: "景点" },
  { id: "yangjialing", name: "杨家岭革命旧址", keywords: ["杨家岭", "杨家岭革命旧址", "延安"], duration: "约1.5小时", description: "杨家岭革命旧址曾是延安时期中共中央机关的重要驻地。期间，中共中央领导开展整风运动和大生产运动，召开延安文艺座谈会、六届七中全会及中国共产党第七次全国代表大会。景区保存中央大礼堂、中央办公厅、机关旧址及多处革命家旧居。", kind: "景点" },
  { id: "wangjiaping", name: "王家坪革命旧址", keywords: ["王家坪", "王家坪革命旧址", "延安"], duration: "约1小时", description: "王家坪革命旧址曾是中共中央革命军事委员会和八路军总部的重要驻地。旧址内保存军委礼堂、军委会议室、总政治部会议室及多处革命家旧居，通过建筑、照片和专题陈列呈现延安时期军事机关的工作生活，以及抗日战争和解放战争相关历史。", kind: "景点" },
  { id: "yanan-university", name: "延安大学", keywords: ["延安大学", "延大", "大学"], duration: "约1.5小时", description: "延安大学是中国共产党创办的第一所综合性大学，其历史可追溯至1937年创办的陕北公学。1941年多所干部学校合并成立延安大学，后又有鲁迅艺术文学院、自然科学院等并入。校园参访可结合校史了解革命年代的人才培养与新型教育实践。", kind: "景点" },
  { id: "yanan-revolution-museum", name: "延安革命纪念馆", keywords: ["延安革命纪念馆", "革命纪念馆", "延安纪念馆"], duration: "约2小时", description: "延安革命纪念馆以中共中央在延安十三年的历史为核心，通过革命文物、照片、档案、艺术场景和多媒体展示，系统呈现延安作为长征落脚点、抗战政治指导中心、新民主主义实践区域和夺取全国胜利出发点的重要历程，并讲述整风、大生产和转战陕北等重大事件。", kind: "景点" },
  { id: "return-to-yanan", name: "《再回延安》", keywords: ["再回延安", "演出", "延安演出"], duration: "约1小时", description: "《再回延安》是一部红色室内情景体验剧，以老红军日记为线索，通过“记忆的博物馆”“燎原的星火”“漫漫的长征路”“不朽的旗帜”四幕内容展开。观众跟随剧情行进换景，结合近距离表演、实景舞台和声光特效，沉浸感受长征岁月与延安精神。", kind: "景点" },
  { id: "baota-mountain", name: "宝塔山", keywords: ["宝塔山", "延安宝塔山", "宝塔"], duration: "约1.5小时", description: "宝塔山位于延安市区、延河之滨，是延安代表性的城市地标。山上的延安宝塔又称岭山寺塔，为八角九级楼阁式砖塔；景区还分布摩崖石刻、摘星楼、烽火台、范公井、嘉岭书院和古城墙等遗迹。登临山顶可俯瞰延安市区与黄土高原风貌。", kind: "景点", image: "/images/attractions/baota-mountain.webp" },
  { id: "nanniwan", name: "南泥湾", keywords: ["南泥湾", "延安南泥湾", "大生产运动"], duration: "约2小时", description: "南泥湾是延安时期大生产运动的重要发生地。景区通过旧址遗迹、纪念展陈、农田湿地和田园景观，讲述军民开展生产、改善物资条件的历史。游览可将革命传统教育与陕北乡村风光结合，理解“自己动手、丰衣足食”所体现的奋斗精神。", kind: "景点" },
  { id: "liangjiahe", name: "梁家河", keywords: ["梁家河", "知青旧居"], duration: "约2小时", description: "梁家河位于延川县文安驿镇，是黄土高原沟壑区的陕北村落。参观内容包括知青旧居、村史展陈、沼气池和生产生活遗迹，通过实物与口述资料呈现当地自然条件、知青劳动生活及村庄发展变化，可从基层视角了解陕北乡村社会与时代变迁。", kind: "景点" },
  { id: "nwpu", name: "西北工业大学", keywords: ["西北工业大学", "西工大", "大学"], duration: "约1.5小时", description: "西北工业大学是一所以航空、航天、航海等领域人才培养和科学研究见长的高校。校园参访可结合校史、科技成果和航空航天主题展示，了解学校在国防科技、工程教育及重大装备研发方面的发展，感受严谨务实的大学文化与创新氛围。", kind: "景点" },
  { id: "xjtu", name: "西安交通大学", keywords: ["西安交通大学", "西交大", "大学"], duration: "约1.5小时", description: "西安交通大学前身可追溯至1896年创办的南洋公学，20世纪50年代主体由上海迁至西安。校园参访可了解“西迁”历史、工程与医学等学科发展及代表性科研成果，在历史建筑、校史展陈和现代校园中感受大学精神与古都文脉的交融。", kind: "景点" },
];

const henanLibrary: LibraryItem[] = [
  {
    id: "henan-museum",
    name: "河南博物院",
    keywords: ["河南博物院", "河南省博物院", "博物院", "郑州博物馆"],
    duration: "约2小时",
    description: "河南博物院以中原文明发展为主线，馆藏涵盖史前文化、夏商周青铜文明、汉唐艺术及历代陶瓷等重要门类。通过考古文物与专题展览，可认识河南作为早期国家形成和多朝古都核心区域的历史地位，观察中华文明多元汇聚、连续发展的进程。",
    kind: "景点",
  },
  {
    id: "henan-erqi-memorial",
    name: "郑州二七纪念馆",
    keywords: ["郑州二七纪念馆", "二七纪念馆", "二七塔", "二七纪念塔"],
    duration: "约1小时",
    description: "郑州二七纪念馆以1923年京汉铁路工人大罢工为主题，依托二七纪念塔及专题陈列，通过文物、照片、档案和场景复原讲述铁路工人运动的背景与经过。参观可了解郑州铁路城市的发展，以及“二七”历史在中国工人运动史上的重要意义。",
    kind: "景点",
  },
  {
    id: "henan-drama-city",
    name: "只有河南·戏剧幻城",
    keywords: ["只有河南", "只有河南戏剧幻城", "戏剧幻城", "幻城"],
    duration: "约5小时",
    description: "只有河南·戏剧幻城以黄河文明和中原文化为创作根基，由夯土城墙、多个剧场和公共表演空间组成。不同剧目围绕土地、粮食、家园与传承展开，观众可自由选择观看路线，在室内外行进、沉浸表演与建筑光影中体验河南历史和普通人的故事。",
    kind: "景点",
  },
  {
    id: "henan-shaolin-temple",
    name: "少林寺",
    keywords: ["少林寺", "嵩山少林寺", "少林景区", "塔林", "少林功夫"],
    duration: "约2.5小时",
    description: "少林寺位于嵩山少室山麓，是中国佛教禅宗祖庭之一，并以少林功夫闻名。寺院中轴分布山门、天王殿、大雄宝殿等建筑，周边还有塔林、初祖庵等遗存。参访可了解禅宗发展、寺院制度、碑刻艺术以及禅武文化的传承。",
    kind: "景点",
    image: "/images/attractions/henan-shaolin-temple.webp",
  },
  {
    id: "henan-songyang-academy",
    name: "嵩阳书院",
    keywords: ["嵩阳书院", "重阳书院", "书院", "嵩阳", "四大书院"],
    duration: "约1小时",
    description: "嵩阳书院是中国古代著名书院之一，北宋时期是理学讲学和学术交流的重要场所。院落布局古朴严整，保存将军柏、碑刻和历代建筑。参观可了解古代书院的教学、祭祀与藏书功能，感受儒家教育传统与嵩山人文环境的结合。",
    kind: "景点",
  },
  {
    id: "henan-songshan",
    name: "嵩山",
    keywords: ["嵩山", "中岳嵩山", "太室山", "少室山", "登封爬山"],
    duration: "约4小时",
    description: "嵩山为五岳中的中岳，由太室山、少室山等山体组成，兼具古老地质遗迹、奇峰峡谷和深厚人文积淀。山麓分布寺庙、书院、古塔、汉阙和观星台等文化遗产，游览可结合登山观景，理解山岳崇拜、宗教、教育与古代科技的发展。",
    kind: "景点",
  },
  {
    id: "henan-zhongyue-temple",
    name: "中岳庙",
    keywords: ["中岳庙", "中岳大庙", "嵩山中岳庙", "道教建筑"],
    duration: "约1.5小时",
    description: "中岳庙位于嵩山太室山麓，是历代祭祀中岳山神的重要场所，也是规模宏大的道教宫观建筑群。庙宇沿中轴层层展开，保存古柏、碑刻、殿宇和彩绘，可从建筑布局和祭祀空间了解中国古代山岳信仰、道教文化与皇家礼制。",
    kind: "景点",
  },
  {
    id: "henan-qingming-park",
    name: "清明上河园",
    keywords: ["清明上河园", "清明山河园", "上河园", "开封宋城"],
    duration: "约4小时",
    description: "清明上河园以张择端《清明上河图》和北宋东京城生活为创意蓝本，通过城门、街市、河道、店铺与仿宋建筑营造市井场景。园内以全天候实景演出、民俗技艺和互动活动呈现宋代商业、节庆、百工与娱乐生活，适合沉浸体验宋文化。",
    kind: "景点",
    image: "/images/attractions/henan-qingming-park.webp",
  },
  {
    id: "henan-kaifeng-fu",
    name: "开封府",
    keywords: ["开封府", "包青天", "包公", "开封府景区"],
    duration: "约1.5小时",
    description: "开封府景区以北宋都城官署文化为主题，通过复建的府门、仪门、正厅、议事厅和牢狱等空间，展示古代衙署格局与司法行政制度。结合包拯等历史人物故事和情景演出，游客可了解北宋开封的城市治理、礼仪秩序与清官文化。",
    kind: "景点",
  },
  {
    id: "henan-wansui-mountain",
    name: "万岁山武侠城",
    keywords: ["万岁山武侠城", "万岁山", "大宋武侠城", "武侠城", "开封武侠城"],
    duration: "约4小时",
    description: "万岁山武侠城以宋文化和中国武侠题材为核心，设置古街、寨堡、擂台等场景，并以密集的实景演出、巡游和互动项目营造江湖氛围。游客可观看武术、攻城、水战等不同类型表演，在娱乐体验中感受开封的宋风市井与通俗武侠文化。",
    kind: "景点",
  },
  {
    id: "henan-baogong-shrine",
    name: "开封包公祠",
    keywords: ["开封包公祠", "包公祠", "包拯纪念馆", "包公湖"],
    duration: "约1小时",
    description: "开封包公祠是纪念北宋名臣包拯的专题文化场所，依托包公湖景观，通过大殿、碑刻、塑像和生平展陈介绍其仕宦经历与断案传说。参观可了解北宋政治文化，以及后世社会对清正廉明、公平执法精神的持续推崇。",
    kind: "景点",
  },
  {
    id: "henan-xiangguo-temple",
    name: "大相国寺",
    keywords: ["大相国寺", "相国寺", "开封相国寺", "皇家寺院"],
    duration: "约1小时",
    description: "大相国寺是开封历史悠久的佛教寺院，北宋时期曾是都城重要皇家寺院和佛教活动中心。寺内中轴分布天王殿、大雄宝殿、八角琉璃殿和藏经楼等建筑，相关造像与历史故事展现佛教文化、皇家礼仪及北宋东京的城市生活。",
    kind: "景点",
  },
  {
    id: "henan-kaifeng-museum",
    name: "开封博物馆",
    keywords: ["开封博物馆", "开封市博物馆", "开博", "开封历史"],
    duration: "约2小时",
    description: "开封博物馆以古都开封的城市发展和地域文化为主线，展示从史前、夏商周至北宋及后世的重要文物。馆内通过城摞城、宋代东京、黄河影响和地方艺术等内容，呈现开封作为多朝都城的繁盛、变迁以及城市与黄河相互塑造的历史。",
    kind: "景点",
  },
  {
    id: "henan-longmen-grottoes",
    name: "龙门石窟",
    keywords: ["龙门石窟", "洛阳石窟", "卢舍那大佛", "伊河石窟"],
    duration: "约3小时",
    description: "龙门石窟分布于洛阳伊河两岸的峭壁上，开凿始于北魏，历经多个朝代营造，以北魏和唐代造像最具代表性。古阳洞、宾阳洞和奉先寺等洞窟展现不同时期的佛教艺术与审美变化，是认识中国石刻艺术、宗教传播和都城文化的世界文化遗产。",
    kind: "景点",
    image: "/images/attractions/henan-longmen-grottoes.webp",
  },
  {
    id: "henan-white-horse-temple",
    name: "白马寺",
    keywords: ["白马寺", "洛阳白马寺", "释源", "佛教寺院"],
    duration: "约1.5小时",
    description: "白马寺始建于东汉，传统上被视为佛教传入中国后由官府营建的第一座寺院。寺内保存历代殿宇、造像和碑刻，并设有体现不同国家佛教建筑风格的文化园区。参访可了解佛经翻译、寺院制度形成及中国与亚洲各地佛教文化交流。",
    kind: "景点",
  },
  {
    id: "henan-peony-garden",
    name: "神州牡丹园",
    keywords: ["神州牡丹园", "洛阳牡丹园", "牡丹花", "白马寺牡丹园"],
    duration: "约2小时",
    description: "神州牡丹园以洛阳牡丹观赏和牡丹文化展示为特色，园内种植多种花色、花型和花期的牡丹品种，并结合唐风园林、温室展陈与文化活动。花期可集中欣赏牡丹群落，了解品种培育、传统审美及洛阳与牡丹延续千年的文化联系。",
    kind: "景点",
  },
  {
    id: "henan-jiuzhou-pool",
    name: "隋唐洛阳城九洲池",
    keywords: ["九洲池", "九州池", "隋唐洛阳城九洲池", "皇家园林"],
    duration: "约1.5小时",
    description: "九洲池是隋唐洛阳城宫城西侧的重要皇家园林遗址，因水池分隔为多个洲岛而得名。景区通过遗址保护、园林水系、亭台建筑和数字展示，呈现宫苑休憩、宴游与生态景观，帮助游客理解隋唐洛阳宫城布局及皇家园林艺术。",
    kind: "景点",
  },
  {
    id: "henan-yingtian-gate",
    name: "隋唐洛阳城应天门",
    keywords: ["应天门", "应天门遗址", "隋唐洛阳城应天门", "洛阳城门"],
    duration: "约1.5小时",
    description: "应天门是隋唐洛阳城宫城的南正门，也是举行朝会、赦令和接见等重大典礼的重要空间。现有建筑以考古遗址保护和形制展示为基础，通过城门台基、阙楼景观、专题展览和数字演绎，再现古代都城礼仪中轴与盛唐宫城气象。",
    kind: "景点",
  },
  {
    id: "henan-mingtang-tiantang",
    name: "隋唐洛阳城明堂天堂景区",
    keywords: ["明堂天堂", "天堂明堂", "明堂", "天堂", "隋唐洛阳城"],
    duration: "约2小时",
    description: "明堂天堂景区位于隋唐洛阳城宫城核心区，以武则天时期的明堂、天堂遗址为基础建设保护展示工程。明堂是重要礼制建筑，天堂与佛教活动相关。景区通过遗址层、建筑形制、文物展陈和沉浸演艺，讲述神都洛阳的政治礼仪与宫廷文化。",
    kind: "景点",
  },
  {
    id: "henan-lijing-gate",
    name: "丽景门",
    keywords: ["丽景门", "洛阳丽景门", "洛阳老城", "老城门"],
    duration: "约1小时",
    description: "丽景门景区以古城门建筑和洛阳老城街区为核心，城楼、城墙与传统街巷共同营造古都入口意象。登楼可俯瞰老城格局，进入街区后可体验地方小吃、手工艺和夜间市井生活，适合作为了解洛阳古城风貌的步行起点。",
    kind: "景点",
  },
  {
    id: "henan-laojun-mountain",
    name: "老君山",
    keywords: ["老君山", "洛阳老君山", "栾川老君山", "金顶", "伏牛山"],
    duration: "约5小时",
    description: "老君山位于伏牛山腹地，以花岗岩峰林、云海日出和山岳道教文化著称。游览线路串联峰林栈道、十里画屏和金顶道观群，高处可远眺层叠群山。游客应根据海拔、天气和体力选择索道与步行组合，体验自然奇峰与人文建筑相映的景观。",
    kind: "景点",
    image: "/images/attractions/henan-laojun-mountain.webp",
  },
  {
    id: "henan-luoyang-museum",
    name: "洛阳博物馆",
    keywords: ["洛阳博物馆", "洛博", "河洛文明", "洛阳文物"],
    duration: "约2小时",
    description: "洛阳博物馆以河洛文明与古都历史为主线，馆藏涵盖史前文化、夏商周青铜器、汉唐陶俑、唐三彩及历代艺术品。通过都城变迁、考古发现和专题珍品展，可理解洛阳长期作为政治文化中心的历史，以及中原文明与丝路交流的联系。",
    kind: "景点",
  },
  {
    id: "henan-wangcheng-park",
    name: "王城公园",
    keywords: ["王城公园", "洛阳王城公园", "牡丹园", "王城动物园"],
    duration: "约2小时",
    description: "王城公园因位于东周王城遗址区域而得名，是融合历史文化、园林景观、牡丹观赏和动物展示的城市公园。园内设有牡丹园、历史文化景观和游憩空间，春季可观赏多种牡丹，平时则适合了解洛阳城市园林与王城文化。",
    kind: "景点",
  },
  {
    id: "henan-suitang-botanical",
    name: "隋唐城遗址植物园",
    keywords: ["隋唐城遗址植物园", "隋唐植物园", "洛阳植物园", "牡丹园"],
    duration: "约2小时",
    description: "隋唐城遗址植物园位于隋唐洛阳城遗址区域，以遗址保护为基础，融合植物专类园、湖泊水系和城市休闲空间。园内牡丹、芍药及多种乔灌木随季节形成不同景观，游客可在自然观察中感受洛阳古城遗址与现代生态园林的结合。",
    kind: "景点",
  },
  {
    id: "henan-ancient-tomb-museum",
    name: "洛阳古墓博物馆",
    keywords: ["洛阳古墓博物馆", "古墓博物馆", "河南古代壁画馆", "洛阳古代艺术博物馆"],
    duration: "约2小时",
    description: "洛阳古墓博物馆又称河南古代壁画馆，以历代墓葬、帝陵遗址和墓室壁画为核心展示内容。馆内迁建复原多座典型墓葬，可进入地下空间观察墓室结构、画像砖石和随葬文化，系统了解古代丧葬制度、社会生活与艺术观念的演变。",
    kind: "景点",
  },
  {
    id: "henan-dikengyuan",
    name: "陕州地坑院",
    keywords: ["陕州地坑院", "地坑院", "三门峡地坑院", "地下四合院"],
    duration: "约2.5小时",
    description: "陕州地坑院是黄土高原地区独特的地下民居形式，院落从地面向下开挖，再在四壁修建窑洞，形成“见树不见村、进村不见房”的景观。景区通过传统院落、农具、剪纸、锣鼓书和饮食展示，呈现地坑院营造智慧与豫西民俗生活。",
    kind: "景点",
  },
  {
    id: "henan-sanmenxia-dam",
    name: "三门峡黄河大坝",
    keywords: ["三门峡黄河大坝", "三门峡大坝", "黄河大坝", "三门峡水利枢纽"],
    duration: "约1.5小时",
    description: "三门峡黄河大坝位于黄河干流，是新中国早期建设的大型水利枢纽之一。参观可近距离观察坝体、泄洪设施和库区景观，并通过相关展陈了解黄河治理、水利工程建设及三门峡城市发展的关系，感受现代工程与黄河峡谷地貌的结合。",
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
  const [brokenImages, setBrokenImages] = useState<Record<string, true>>({});
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
      const webpToJpeg = async (buffer: ArrayBuffer) => {
        const bitmap = await createImageBitmap(new Blob([buffer], { type: "image/webp" }));
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("图片转换失败");
        context.drawImage(bitmap, 0, 0);
        const jpeg = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("图片转换失败"))), "image/jpeg", 0.86);
        });
        return jpeg.arrayBuffer();
      };
      await Promise.all(
        photoIds.map(async (id) => {
          const item = itemById[id];
          if (!item?.image) return;
          const response = await fetch(item.image);
          if (!response.ok) throw new Error("图片读取失败");
          const raw = await response.arrayBuffer();
          photoBuffers.set(id, item.image.endsWith(".webp") ? await webpToJpeg(raw) : raw);
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
                            const ready = Boolean(item.image) && !brokenImages[item.id];
                            return (
                              <label key={id} className={`${ready ? "photo-card" : "photo-pending"}`}>
                                {ready && item.image ? (
                                  <span className="photo-card-media">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      unoptimized
                                      sizes="(max-width: 720px) 50vw, 180px"
                                      className="object-cover"
                                      loading={PRIORITY_ATTRACTION_IMAGES.has(item.id) ? "eager" : "lazy"}
                                      priority={PRIORITY_ATTRACTION_IMAGES.has(item.id)}
                                      onError={() => setBrokenImages((current) => ({ ...current, [item.id]: true }))}
                                    />
                                  </span>
                                ) : null}
                                <span className="photo-card-meta">
                                  <input
                                    type="checkbox"
                                    checked={day.photoItems.includes(id)}
                                    disabled={!ready || (!day.photoItems.includes(id) && day.photoItems.length >= 3)}
                                    onChange={() => togglePhoto(day, id)}
                                  />
                                  <span>{item.name}</span>
                                  {!ready && <small>图片待补</small>}
                                </span>
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
