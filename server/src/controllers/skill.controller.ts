import Skill from "../models/Skill";

import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../utils/crudFactory";

export const createSkill = createOne(Skill);

export const getSkills = getAll(Skill);

export const getSkill = getOne(Skill);

export const updateSkill = updateOne(Skill);

export const deleteSkill = deleteOne(Skill);
