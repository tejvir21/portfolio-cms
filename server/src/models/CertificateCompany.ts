import { Schema, model, Document } from "mongoose";

export interface ICertificateCompany extends Document {
  name: string;
  slug: string;
  logoUrl: string;
  logoKey?: string;
  active: boolean;
  sortOrder: number;
}

const certificateCompanySchema = new Schema<ICertificateCompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    logoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    logoKey: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default model<ICertificateCompany>(
  "CertificateCompany",
  certificateCompanySchema,
);
