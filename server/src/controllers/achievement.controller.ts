import Achievement from "../models/Achievement";

import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../utils/crudFactory";

export const createAchievement = createOne(Achievement);

export const getAchievements = getAll(Achievement);

export const getAchievement = getOne(Achievement);

export const updateAchievement = updateOne(Achievement);

export const deleteAchievement = deleteOne(Achievement);
