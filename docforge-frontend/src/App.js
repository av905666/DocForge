import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import PdfMerge from "./components/PdfMerge";
import PdfSplit from "./components/PdfSplit";
import PdfWatermark from "./components/PdfWatermark";
import PdfCompress from "./components/PdfCompress";

function App() {
  const [activeTool, setActiveTool] = useState("merge");
  const [darkMode, setDarkMode] = useState(false);

  const renderTool = () => {
    switch (activeTool) {
      case "merge":
        return <PdfMerge />;
      case "split":
        return <PdfSplit />;
      case "watermark":
        return <PdfWatermark />;
      case "compress":
        return <PdfCompress />;
      default:
        return <PdfMerge />;
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors p-4 sm:p-6 md:p-8 duration-300">
      <Navbar activeTool={activeTool} setActiveTool={setActiveTool} darkMode={darkMode} setDarkMode={setDarkMode} />


      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          All-in-One PDF Toolkit
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-300">
          Merge, split and watermark your PDFs instantly…
        </p>
      </div>


      <motion.div
        key={activeTool}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTool()}
      </motion.div>
    </div>
  );
}

export default App;