export interface Project {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  heroImage: string;
  description: string;
  concept?: string;
  specs?: string[];
  colorPalette?: string[];
  process?: string[];
  outcomes?: string[];
}
