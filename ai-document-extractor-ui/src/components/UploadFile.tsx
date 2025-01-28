import React, { useState } from "react";

interface UploadFileProps {
  onFileUpload: (file: File) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile);
    if (uploadedFile) onFileUpload(uploadedFile);
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2" htmlFor="file-input">
        Upload Document
      </label>
      <input
        id="file-input"
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />
    </div>
  );
};

export default UploadFile;
