import React, { useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import UploadFile from "@/components/UploadFile";
import ExtractedData from "@/components/ExtractedData";
import Spinner from "@/components/Spinner";
import axios from "axios";

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleExtract = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post("/api/extract", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error extracting data:", error);
      alert("Extraction failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <UploadFile onFileUpload={handleFileUpload} />
        <button
          onClick={handleExtract}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4"
        >
          {loading ? <Spinner /> : "Extract Data"}
        </button>
        {data && <ExtractedData data={data} />}
      </div>
    </div>
  );
};

export default Home;
