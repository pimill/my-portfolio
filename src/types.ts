export interface Project {
  id: string;
  title: string;
  category: string;
  type: 'motion' | 'print'; // 影音/動態 或 平面設計
  description: string;
  concept?: string;
  specs?: string[];
  colorPalette?: string[];
  process?: string[];
  outcomes?: string[];
  heroImage: string;
  coverImage: string;
  videoUrl?: string; // MP4 網址（motion 專案填這個）
}
