import { PhotoAsset } from './photo.model';

export interface Role {
  title: string;
  org: string;
  date: string;
}

/** One rung of the competition ladder, from the provincial round up to WorldSkills ASEAN. */
export interface CompetitionStage {
  year: string;
  level: string;
  result: string;
  /** Two or three short paragraphs on the stage. */
  story: string[];
  /** A content photo, so it carries real alt text. */
  photo: PhotoAsset;
  alt: string;
}
