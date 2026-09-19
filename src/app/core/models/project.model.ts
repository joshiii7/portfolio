export interface CapstoneProject {
  slug: string;
  name: string;
  image: string;
  problem: string;
  solution: string;
  result: string;
  tools: string[];
  metaDescription: string;
  bannerText: string;
}

export interface CraftProject {
  name: string;
  image: string;
  description: string;
  tools: string[];
  link: string;
}
