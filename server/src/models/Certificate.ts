import { Schema, model, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;

  issuer: string;

  company: string;

  issueDate: Date;

  credentialId?: string;

  credentialUrl?: string;

  imageUrl?: string;

  featured: boolean;
}

const certificateSchema = new Schema<ICertificate>(
  {
    title: {
      type: String,
      required: true,
    },

    issuer: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    credentialId: {
      type: String,
      default: "",
    },

    credentialUrl: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model<ICertificate>("Certificate", certificateSchema);
