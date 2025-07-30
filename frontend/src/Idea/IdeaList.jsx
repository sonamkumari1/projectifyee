import React from "react";

const IdeaList = ({ ideas, onEdit }) => {
  return (
    <div className="grid gap-4">
      {ideas.map((idea) => (
        <div key={idea._id} className="bg-gray-700 text-white p-4 rounded">
          <h3 className="text-lg font-semibold">{idea.title}</h3>
          <p className="text-gray-300 line-clamp-3">{idea.description}</p>
          <button
            onClick={() => onEdit(idea)}
            className="mt-2 text-sm text-blue-400 hover:underline"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
