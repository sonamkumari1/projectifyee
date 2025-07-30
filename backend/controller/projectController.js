import Project from "../model/project.js";

export const addProject = async (req, res) => {
  const {
    title,
    price,
    discountPer,
    rating,
    desc,
    domaincategory,
    category,
    github,
    frontend,
    backend,
    database,
  } = req.body;
  try {
    const photo = req.files?.photo?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    const sell = new Project({
      title,
      price,
      discountPer,
      photo,
      video,
      rating,
      desc,
      domaincategory: [domaincategory.toLowerCase()],
      category: [category.toLowerCase()],
      github,
      frontend,
      backend,
      database,
       seller: req.user._id, 
    });
    const data = await sell.save();
    res.status(201).json({
      success: true,
      message: "Project added Successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add Project",
      error: error.message,
    });
  }
};

export const getallProject = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(201).json({
      success: true,
      message: "All Projects fetched successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "project fetched successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  const {
    title,
    price,
    discountPer,
    rating,
    desc,
    domaincategory,
    category,
    github,
    frontend,
    backend,
    database,
  } = req.body;
  try {
    const photo = req.files?.photo?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    const updateData = {
      title,
      price,
      discountPer,
      rating,
      desc,
      domaincategory: [domaincategory.toLowerCase()],
      category: [category.toLowerCase()],
      github,
      frontend,
      backend,
      database,
    };

    if (photo) {
      updateData.photo = photo;
    }

    if (video) {
      updateData.video = video;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update Project",
      error: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

export const getProjectByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const projects = await Project.find({
      category: { $in: [category.toLowerCase()] },
    });
    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found for this category",
      });
    }
    res.status(200).json({
      success: true,
      message: "projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects by category",
      error: error.message,
    });
  }
};

export const countProjectsBySeller = async (req, res) => {
 try {
    const { sellerId } = req.params;
    const count = await Project.countDocuments({ seller: sellerId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching project count", error });
  }
};
