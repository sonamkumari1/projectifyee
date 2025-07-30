import Idea from "../model/Idea.js";

export const addIdea = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user?._id;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIdea = new Idea({ title, description, userId });
    const data = await newIdea.save();

    res.status(201).json({ message: "Idea shared successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const allIdea = async (req, res) => {
  try {
    const ideas = await Idea.find().populate("userId", "name email");
    res.status(200).json({ success: true, message: "All data fetched", ideas });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch ideas", error: error.message });
  }
};

export const updateIdea = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const idea = await Idea.findById(id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own ideas" });
    }

    idea.title = title;
    idea.description = description;
    const updated = await idea.save();

    res.status(200).json({ success: true, message: "Idea updated", idea: updated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteIdea = async (req, res) => {
  const { id } = req.params;

  try {
    const idea = await Idea.findById(id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own ideas" });
    }

    await idea.deleteOne();
    res.status(200).json({ message: "Idea deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
