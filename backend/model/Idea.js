import mongoose from "mongoose";

const ShareIdea = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
const Idea = mongoose.model("Idea", ShareIdea);
export default Idea;
