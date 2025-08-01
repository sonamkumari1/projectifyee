import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewIdea from "./ViewIdea";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [formVisible, setFormVisible] = useState(true); // Form visible by default
  const [editMode, setEditMode] = useState(false);
  const [ideaData, setIdeaData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [viewIdeaOpen, setViewIdeaOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get("https://projectifyee.onrender.com/api/idea/all", {
        withCredentials: true,
      });
      setIdeas(res.data.ideas);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `https://projectifyee.onrender.com/api/idea/update/${editingId}`,
          ideaData,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post("https://projectifyee.onrender.com/api/idea/add", ideaData, {
          withCredentials: true,
        });
      }
      setIdeaData({ title: "", description: "" });
      setEditMode(false);
      fetchIdeas();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (idea, e) => {
    e.stopPropagation();
    setEditMode(true);
    setEditingId(idea._id);
    setIdeaData({ title: idea.title, description: idea.description });
    setFormVisible(true);
  };

  const handleView = (idea) => {
    setSelectedIdea(idea);
    setViewIdeaOpen(true);
  };

  const handleCloseView = () => {
    setViewIdeaOpen(false);
    setSelectedIdea(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        <div className="max-w-md lg:w-1/2 mr-20">
          <h2 className="text-2xl font-bold mb-4">
            {editMode ? "Edit Your Idea" : "Share a New Idea"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded shadow-md"
          >
            <input
              type="text"
              placeholder="Project Title"
              value={ideaData.title}
              onChange={(e) =>
                setIdeaData({ ...ideaData, title: e.target.value })
              }
              className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
              required
            />
            <textarea
              placeholder="Description"
              value={ideaData.description}
              onChange={(e) =>
                setIdeaData({ ...ideaData, description: e.target.value })
              }
              className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
              rows={6}
              required
            ></textarea>
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full"
              >
                {editMode ? "Update Idea" : "Submit Idea"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setIdeaData({ title: "", description: "" });
                  }}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">All Ideas</h2>
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                onClick={() => handleView(idea)}
                className="bg-gray-800 p-4 rounded shadow-md flex justify-between items-start cursor-pointer"
              >
                <div>
                  <h3 className="text-lg font-bold">{idea.title}</h3>
                  <p className="line-clamp-2 text-gray-300">
                    {idea.description}
                  </p>
                </div>
                <button
                  onClick={(e) => handleEdit(idea, e)}
                  className="text-sm text-blue-400 hover:underline ml-4"
                >
                  Edit
                </button>
              </div>
            ))}

            {viewIdeaOpen && selectedIdea && (
              <ViewIdea idea={selectedIdea} onClose={handleCloseView} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ideas;
