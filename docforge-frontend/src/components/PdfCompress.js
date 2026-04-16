import React, { useState } from "react";
import axios from "axios";
import DragDropZone from "./DragDropZone";

const PdfCompress = () => {
  const [file, setFile] = useState(null);
  const [compressedFileSize, setCompressedFileSize] = useState(null); // new
  const [loading, setLoading] = useState(false);

  const handleCompress = async () => {
    if (!file) {
      alert("Select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://docforge-backend.onrender.com/api/pdf/compress",
        formData,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data]);
      setCompressedFileSize(blob.size); // store compressed size

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "compressed.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Compression failed");
    }
  };

  const formatSize = (sizeInBytes) => {
    if (!sizeInBytes) return "";
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    else if (sizeInBytes < 1024 * 1024)
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    else return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg transition-colors">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Compress PDF
        </h2>

        <DragDropZone
          multiple={false}
          onFilesSelect={(files) => setFile(files[0])}
        />

        {file && (
          <div className="mt-4 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex justify-between items-center">
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {file.name} ({formatSize(file.size)})
            </span>
            <button
              onClick={() => {
                setFile(null);
                setCompressedFileSize(null); // reset after removing file
              }}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {compressedFileSize && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400 text-center">
            Compressed file size: {formatSize(compressedFileSize)}
          </p>
        )}

        <button
          onClick={handleCompress}
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex justify-center items-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            "Compress PDF"
          )}
        </button>
      </div>
    </div>
  );
};

export default PdfCompress;