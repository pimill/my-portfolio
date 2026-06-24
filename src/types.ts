export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  concept?: string;
  specs?: string[];
  colorPalette?: string[];
  process?: string[];
  outcomes?: string[];
  heroImage: string;
  coverImage: string;
}
