import { Schema, model, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  role: string;
  bio: string;
  location: string;

  email: string;
  phone?: string;

  github: string;
  linkedin: string;
  leetcode?: string;
  twitter?: string;
  portfolio?: string;

  imageUrl: string;
  profileImage: string;
  resumeUrl: string;
}

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },

    role: { type: String, required: true },

    bio: { type: String, required: true },

    location: { type: String, required: true },

    email: { type: String, required: true },

    phone: { type: String },

    github: { type: String, required: true },

    linkedin: { type: String, required: true },

    leetcode: { type: String, default: "" },

    twitter: { type: String, default: "" },

    portfolio: { type: String },

    imageUrl: { type: String, default: "" },

    profileImage: { type: String, default: "" },

    resumeUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

export default model<IProfile>("Profile", profileSchema);
