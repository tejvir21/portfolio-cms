import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;

  role: string;

  shortDescription: string;
  fullDescription: string;

  technologies: string[];

  displayOrder: number;

  imageUrl: string;
  imageKey: string;

  gallery: {
    url: string;
    key: string;
  }[];

  githubUrl: string;
  liveUrl: string;

  category: string;
  status: "completed" | "in-progress";

  // gallery: string[];

  featured: boolean;

  problemStatement: string;
  architecture: string;
  challenges: string;
  learnings: string;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["completed", "in-progress"],
      default: "in-progress",
    },

    shortDescription: {
      type: String,
      required: true,
    },

    fullDescription: {
      type: String,
      required: true,
    },

    technologies: [
      {
        type: String,
      },
    ],

    displayOrder: {
      type: Number,
      default: 0,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    imageKey: {
      type: String,
      default: "",
    },

    gallery: [
      {
        url: String,
        key: String,
      },
    ],

    // gallery: [],

    githubUrl: {
      type: String,
      default: "",
    },

    liveUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    problemStatement: {
      type: String,
      default: "",
    },

    architecture: {
      type: String,
      default: "",
    },

    challenges: {
      type: String,
      default: "",
    },

    learnings: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default model<IProject>("Project", projectSchema);
