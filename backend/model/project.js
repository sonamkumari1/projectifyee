import mongoose from "mongoose";

const projectViewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPer: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
    },
    video: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
    },
    domaincategory: {
      type: [String],
      enum: [
        "web development",
        "mobile developement",
        "game development",
        "data science projects",
        "c++ projects",
        "python projects",
        "java projects",
        "c projects",
      ],
      default: [],
    },
     category: {
      type: [String],
      enum: ["college", "experts", "domain"],
      default: [],
    },
    frontend: {
      type:String,
    },
    backend: {
      type: String,
    },
    database: {
      type: String,
    },

    github: {
      type: String,
    },
     seller: {
    type: mongoose.Schema.Types.ObjectId,
     ref: "User", // or "Seller" depending on your user model
    required: true,
  },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectViewSchema);
export default Project;
