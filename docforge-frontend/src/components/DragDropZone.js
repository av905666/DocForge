import React from "react";
import { useDropzone } from "react-dropzone";

const DragDropZone = ({ onFilesSelect, multiple = false }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple,
    onDrop: (acceptedFiles) => {
      onFilesSelect(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #4CAF50",
        padding: "40px",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "10px",
        backgroundColor: isDragActive ? "#f0fff4" : "#fafafa",
      }}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600 text-lg">
  {isDragActive
    ? "Drop the PDF files here..."
    : "Drag & Drop PDF files here, or click to browse"}
</p>
    </div>
  );
};

export default DragDropZone;