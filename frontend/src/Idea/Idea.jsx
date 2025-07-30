import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewIdea from "./ViewIdea";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ideaData, setIdeaData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [viewIdeaOpen, setViewIdeaOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/idea/all", {
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
          `http://localhost:4000/api/idea/update/${editingId}`,
          ideaData,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post("http://localhost:4000/api/idea/add", ideaData, {
          withCredentials: true,
        });
      }
      setIdeaData({ title: "", description: "" });
      setFormVisible(false);
      setEditMode(false);
      fetchIdeas();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (idea) => {
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <button
        onClick={() => {
          setFormVisible(!formVisible);
          setEditMode(false);
          setIdeaData({ title: "", description: "" });
        }}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-4"
      >
        {formVisible ? "Close Form" : "Share New Idea"}
      </button>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">
            {editMode ? "Edit Idea" : "Add Idea"}
          </h2>
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
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            {editMode ? "Update Idea" : "Submit Idea"}
          </button>
        </form>
      )}

      <div className="mt-6 w-full max-w-2xl space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            onClick={() => handleView(idea)}
            className="bg-gray-800 p-4 rounded shadow-md flex justify-between items-start cursor-pointer"
          >
            <div>
              <h3 className="text-lg font-bold">{idea.title}</h3>
              <p className="line-clamp-2">{idea.description}</p>
            </div>
            <button
              onClick={() => handleEdit(idea)}
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
  );
};

export default Ideas;
