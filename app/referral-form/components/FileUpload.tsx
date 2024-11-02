import { useState, useRef } from "react";

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

const FileUpload: React.FC<Props> = ({ formData, setFormData }) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFileName(files[0].name);
      setFormData({ ...formData, resume: files[0] });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold mb-1">
        Resume (Optional But Encouraged):
      </label>
      <p className="text-sm text-gray-500 mb-3">For quick evaluation.</p>

      {/* Drag-and-Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input
          type="file"
          id="resume"
          name="resume"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        <div className="text-center flex flex-col justify-center">
          <button
            type="button"
            onClick={handleFileClick}
            className="p-2 flex w-[7.5rem] m-auto justify-center gap-2 px-4 border   text-[#808080db] rounded"
          >
            <img className=' opacity-60 w-[1.3rem]' src="/add_file.png" />
            <span>Add File</span>
          </button>
          <p className="text-gray-600 mt-2">or drag and drop your file here</p>
          {selectedFileName && (
            <p className="text-gray-600 mt-2">
              Selected file: {selectedFileName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
