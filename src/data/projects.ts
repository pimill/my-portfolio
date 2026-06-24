import { Project } from '../types';
import psychedelicImg from '../assets/images/psychedelic.jpg';
import snakeCnyImg from '../assets/images/snake-cny.jpg';
import forestHandImg from '../assets/images/forest-hand.jpg';

export const projects: Project[] = [
  {
    id: "1",
    title: "虛",
    category: "海報設計",
    coverImage: psychedelicImg,
    heroImage: psychedelicImg,
    description: "一張以抽象線稿構築的海報創作，透過糾結纏繞的白色線條，描繪意識流動與感知擴散的瞬間。",
    concept: "以鹿首般的有機形體作為視覺核心，讓線條從具象逐漸瓦解成抽象的漩渦與漸層，象徵知覺從清晰走向迷幻的過程；深色漸層背景則營造出沉浸、向內探索的氛圍。",
    specs: ["尺寸：A3（297 × 420 mm）", "解析度：300 dpi", "色彩模式：CMYK（印刷規格）", "格式：直式海報"],
    colorPalette: ["#0A0F0F", "#203232", "#455354", "#9DA5A6", "#FFFFFF"],
    process: ["線稿草圖發想", "向量線條繪製", "漸層背景調色", "圖層疊加與最終輸出"],
    outcomes: ["完成一張可印刷輸出的視覺海報", "建立個人風格化的線稿語言", "作為作品集代表作之一"]
  },
  {
    id: "2",
    title: "2025 蛇年海報設計｜蛇來運轉",
    category: "節慶海報設計",
    coverImage: snakeCnyImg,
    heroImage: snakeCnyImg,
    description: "為蛇年新春創作的賀歲海報，以紅黑配色搭配同心圓紋與蛇形線條，呈現「時來運轉」的吉慶氛圍。",
    concept: "將生肖蛇的形體簡化為流動的白色線條，與層疊的同心圓圖案交織，呼應傳統紋樣中「圓滿」與「循環」的意象；四角的篆刻印章式圖形強化節慶感與東方識別。",
    specs: ["尺寸：A4（210 × 297 mm）", "解析度：150 dpi", "色彩模式：RGB", "格式：直式海報"],
    colorPalette: ["#000000", "#33090A", "#9A1314", "#E61A17", "#FFFFFF"],
    process: ["生肖造型發想", "同心圓紋樣設計", "中英文標準字排版", "整體配色調整"],
    outcomes: ["完成一套可延伸應用於賀卡與社群版面的視覺", "建立節慶系列的紅黑視覺語言"]
  },
  {
    id: "3",
    title: "Treepattern",
    category: "插畫設計",
    coverImage: forestHandImg,
    heroImage: forestHandImg,
    description: "以手部與樹根意象結合的線稿插畫，描繪人與自然之間根植、守護的連結。",
    concept: "手掌的指紋紋理延伸成樹根般的線條，向下扎根於波浪狀的土地與幾何星形圖騰，傳遞「保護」與「扎根」的雙重意涵；全紅背景強化視覺張力與記憶點。",
    specs: ["尺寸：A4（210 × 297 mm）", "解析度：300 dpi", "色彩模式：RGB", "格式：直式海報"],
    colorPalette: ["#C51111", "#CA2322", "#D04442", "#DA6D6B", "#FFFFFF"],
    process: ["手部與樹根造型結合發想", "線稿細節繪製", "背景紋樣設計", "標準字與圖形排版"],
    outcomes: ["完成一張具個人風格的概念插畫海報", "延伸發展手繪線稿系列"]
  }
];
