export interface SkillGap {
  skill: string;
  frequency_rank: number;
  roi_score: number;
}

export interface SkillGapResult {
  top_gaps: SkillGap[];
  updated_at: string;
}

export interface CareerIntelligence {
  scores: {
    skills: number;
    experience: number;
    demand: number;
    salary: number;
  };
  updated_at: string;
}
