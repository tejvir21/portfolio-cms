import mongoose from "mongoose";

const experienceSchema =
  new mongoose.Schema(
    {
      company: {
        type: String,
        required: true,
      },

      position: {
        type: String,
        required: true,
      },

      employmentType: {
        type: String,
        required: true,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: Date,

      currentlyWorking: {
        type: Boolean,
        default: false,
      },

      location: String,

      description: String,

      technologies: [
        String,
      ],

      companyLogo:
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
  "Experience",
  experienceSchema
);
