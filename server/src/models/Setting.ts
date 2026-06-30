import { Schema, model, Document } from "mongoose";

export interface ISetting extends Document {
  homeTitle: string;
  homeDescription: string;

  keywords: string[];

  engineeringHighlights: string[];

  ogImage: string;

  ogImageKey: string;
}

const settingSchema = new Schema<ISetting>(
  {
    homeTitle: {
      type: String,
      default: "",
    },

    homeDescription: {
      type: String,
      default: "",
    },

    keywords: [
      {
        type: String,
      },
    ],

    engineeringHighlights: [
      {
        type: String,
      },
    ],

    ogImage: {
      type: String,
      default: "",
    },

    ogImageKey: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default model<ISetting>("Setting", settingSchema);
