import mongoose from "mongoose";

const achievementSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      organization: {
        type: String,
        required: true,
      },

      description:
        String,

      date:
        Date,

      imageUrl:
        String,

      credentialUrl:
        String,

      displayOrder: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Achievement",
  achievementSchema
);
