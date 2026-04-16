import React, { useState } from "react";
import axios from "axios";
import DragDropZone from "./DragDropZone";

const PdfSplit = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSplit = async () => {
        if (!file) {
            alert("Select a PDF");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const response = await axios.post(
                "https://docforge-backend.onrender.com/api/pdf/split",
                formData,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "split-page-1.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert("Error splitting PDF");
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg transition-colors">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Split PDF
                </h2>
                <DragDropZone
                    multiple={false}
                    onFilesSelect={(files) => setFile(files[0])}
                />

                {file && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Selected File
                        </h3>

                        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                            <span className="text-sm text-gray-800 dark:text-gray-200">
                                {file.name}
                            </span>

                            <button
                                onClick={() => setFile(null)}
                                className="text-red-500 hover:text-red-700 text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleSplit}
                    className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        "Split PDF"
                    )}
                </button>
            </div>
        </div>
    );
};

export default PdfSplit;