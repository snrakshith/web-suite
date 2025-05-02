import React, { useState, useCallback } from "react";
import Papa from "papaparse";
import { FiUpload, FiXCircle } from "react-icons/fi";
import { useDropzone } from "react-dropzone";

const CSVUploader: React.FC = () => {
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  //   const [csvData, setCsvData] = useState<CSVData[] | null>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    Papa.parse(file, {
      header: false, // Change to true if your CSV has headers
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data as string[][]);
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error.message);
      },
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      handleFileUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // @ts-ignore
    accept: ".csv",
    multiple: false,
  });

  const handleClear = () => {
    setCsvData(null);
    setFileName(null);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`cursor-pointer w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 hover:bg-blue-500 hover:text-white ${
          isDragActive ? "bg-blue-200" : ""
        }`}
      >
        <FiUpload className="text-4xl" />
        <span className="mt-2 text-base leading-normal">
          {fileName ? `File: ${fileName}` : "Select or Drag & Drop a CSV file"}
        </span>
        <input {...getInputProps()} />
      </div>

      {csvData && (
        <div className="mt-4 w-full flex flex-col items-center">
          <button
            onClick={handleClear}
            className="flex items-center justify-center text-red-500 hover:text-red-700 mb-4"
          >
            <FiXCircle className="mr-2" />
            Clear File
          </button>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                {csvData[0].map((col, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 bg-gray-100"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// export default CSVUploader;
