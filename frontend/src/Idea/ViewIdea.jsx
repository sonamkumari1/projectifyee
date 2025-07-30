const ViewIdea = ({ idea, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex py-20 justify-center">
      <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">{idea.title}</h2>
        <p className="mb-4">{idea.description}</p>
        <div className="text-sm text-gray-600">
          <p>
            <strong>Posted by:</strong> {idea?.userId?.name || "Unknown User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewIdea;
