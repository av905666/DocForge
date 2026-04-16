import React, { useState } from "react";
import axios from "axios";
import DragDropZone from "./DragDropZone";

const PdfMerge = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Select at least 2 PDFs");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/pdf/merge",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "merged.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error merging PDFs");
    }
  };

  return (
    <div className="flex justify-center mt-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg transition-colors">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Merge PDFs
                </h2>

      <DragDropZone onFilesSelect={setFiles} multiple={true} />

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Selected Files</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
              >
                <span className="text-sm">{file.name}</span>
                <button
                  onClick={() =>
                    setFiles(files.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleMerge}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          "Merge PDFs"
        )}
      </button>
    </div>
    </div>
  );
};

export default PdfMerge;