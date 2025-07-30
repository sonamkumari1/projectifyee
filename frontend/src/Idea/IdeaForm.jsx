import React, { useState, useEffect } from "react";
import axios from "axios";

const IdeaForm = ({ fetchIdeas, selectedIdea, clearSelectedIdea }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedIdea) {
      setTitle(selectedIdea.title);
      setDescription(selectedIdea.description);
    }
  }, [selectedIdea]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedIdea) {
        // Update existing idea
        await axios.put(`http://localhost:4000/api/idea/update/${selectedIdea._id}`, {
          title,
          description,
        });
      } else {
        // Add new idea
        await axios.post("http://localhost:4000/api/idea/add", {
          title,
          description,
        });
      }

      fetchIdeas();
      setTitle("");
      setDescription("");
      clearSelectedIdea();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded text-white mb-6">
      <h2 className="text-xl mb-4">{selectedIdea ? "Edit Idea" : "Share an Idea"}</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full mb-2 p-2 bg-gray-700 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full mb-2 p-2 bg-gray-700 rounded"
        rows="3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
          {selectedIdea ? "Update" : "Submit"}
        </button>
        {selectedIdea && (
          <button
            type="button"
            onClick={clearSelectedIdea}
            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default IdeaForm;
