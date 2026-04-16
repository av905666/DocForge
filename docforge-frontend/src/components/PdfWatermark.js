import React, { useState } from "react";
import axios from "axios";
import DragDropZone from "./DragDropZone";

const PdfWatermark = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!file || !text) {
            alert("Upload file and enter watermark text");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("text", text);

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:5000/api/pdf/watermark",
                formData,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "watermarked.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert("Error adding watermark");
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg transition-colors">

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Add Watermark
                </h2>

                <DragDropZone
                    multiple={false}
                    onFilesSelect={(files) => setFile(files[0])}
                />

                <input
                    type="text"
                    placeholder="Enter watermark text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full mt-5 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {file && (
                    <div className="mt-0">
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
                    onClick={handleSubmit}
                    className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        "Add Watermark"
                    )}
                </button>

            </div>
        </div>
    );
};

export default PdfWatermark;