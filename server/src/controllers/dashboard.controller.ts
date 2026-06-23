import Project from "../models/Project";
import Skill from "../models/Skill";
import Achievement from "../models/Achievement";
import Certificate from "../models/Certificate";
import Contact from "../models/Contact";

export const getDashboardStats =
  async (_req: any, res: any) => {
    const stats = {
      projects:
        await Project.countDocuments(),

      skills:
        await Skill.countDocuments(),

      achievements:
        await Achievement.countDocuments(),

      certificates:
        await Certificate.countDocuments(),

      messages:
        await Contact.countDocuments(),
    };

    res.json({
      success: true,
      data: stats,
    });
  };
