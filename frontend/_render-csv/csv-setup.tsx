import React, { useState, useCallback } from "react";
import Papa from "papaparse";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload, FiXCircle } from "react-icons/fi";
import { useDropzone, FileRejection } from "react-dropzone";

// Define the validation schema using zod
const schema = z.object({
  file: z.instanceof(File).refine((file) => file.type === "text/csv", {
    message: "Only CSV files are accepted.",
  }),
});

type FormData = z.infer<typeof schema>;

const CSVUploaderForm: React.FC = () => {
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data as string[][]);
      },
      header: false, // Change to true if your CSV has headers
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        // Handle rejected files here
        setFileName(null);
        setCsvData(null);

        // Collect error messages from fileRejections
        const errorMessages = fileRejections
          .flatMap((rejection) =>
            rejection.errors.map((error) => error.message)
          )
          .join(", ");

        setError("file", {
          type: "manual",
          message: `File upload error: ${errorMessages}`,
        });
      } else if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        handleFileUpload(file);
        setValue("file", file); // Update form value
        clearErrors("file"); // Clear any previous errors if the file is valid
      }
    },
    [setValue, setError, clearErrors]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  const handleClear = () => {
    setCsvData(null);
    setFileName(null);
    reset();
    clearErrors("file"); // Clear errors on form reset
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 flex flex-col items-center"
    >
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <div
            {...getRootProps()}
            className={`cursor-pointer w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 hover:bg-blue-500 hover:text-white ${
              isDragActive ? "bg-blue-200" : ""
            }`}
          >
            <FiUpload className="text-4xl" />
            <span className="mt-2 text-base leading-normal">
              {fileName
                ? `File: ${fileName}`
                : "Select or Drag & Drop a CSV file"}
            </span>
            <input
              {...getInputProps({
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                    handleFileUpload(file);
                  }
                },
              })}
              type="file"
              className="hidden"
              accept=".csv"
            />
          </div>
        )}
      />
      {errors.file && (
        <p className="mt-2 text-red-500">{errors.file.message}</p>
      )}

      {csvData && (
        <div className="mt-4 w-full flex flex-col items-center">
          <button
            type="button"
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

      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CSVUploaderForm;
