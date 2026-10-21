export interface Skill {
  _id: string;

  name: string;

  category: string;

  skillSequence: number;

  icon?: string;

  proficiency: number;

  display: boolean;

  displayOrder: number;

  createdAt: string;

  updatedAt: string;
}
