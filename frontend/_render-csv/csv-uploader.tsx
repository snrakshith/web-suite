// import React, { useState } from "react";
// import Papa from "papaparse";

// const CSVUploader: React.FC = () => {
//   const [csvData, setCsvData] = useState<string[][] | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       Papa.parse(file, {
//         complete: (result: any) => {
//           setCsvData(result.data as string[][]);
//         },
//         header: false, // Change to true if your CSV has headers
//       });
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".csv" onChange={handleFileUpload} />
//       {csvData && (
//         <table>
//           <thead>
//             <tr>
//               {csvData[0].map((col, index) => (
//                 <th key={index}>{col}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {csvData.slice(1).map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {row.map((col, colIndex) => (
//                   <td key={colIndex}>{col}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CSVUploader;

// =======
// 2 with styles and icon

// import React, { useState } from "react";
// import Papa from "papaparse";
// import { FiUpload } from "react-icons/fi";

// const CSVUploader: React.FC = () => {
//   const [csvData, setCsvData] = useState<string[][] | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       Papa.parse(file, {
//         complete: (result) => {
//           setCsvData(result.data as string[][]);
//         },
//         header: false, // Change to true if your CSV has headers
//       });
//     }
//   };

//   return (
//     <div className="p-4 flex flex-col items-center">
//       <label className="cursor-pointer w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 hover:bg-blue-500 hover:text-white">
//         <FiUpload className="text-4xl" />
//         <span className="mt-2 text-base leading-normal">Select a CSV file</span>
//         <input
//           type="file"
//           className="hidden"
//           accept=".csv"
//           onChange={handleFileUpload}
//         />
//       </label>

//       {csvData && (
//         <table className="mt-6 w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               {csvData[0].map((col, index) => (
//                 <th
//                   key={index}
//                   className="border border-gray-300 px-4 py-2 bg-gray-100"
//                 >
//                   {col}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {csvData.slice(1).map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {row.map((col, colIndex) => (
//                   <td
//                     key={colIndex}
//                     className="border border-gray-300 px-4 py-2"
//                   >
//                     {col}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CSVUploader;

// 3 with clear option

// import React, { useState } from "react";
// import Papa from "papaparse";
// import { FiUpload, FiXCircle } from "react-icons/fi";

// const CSVUploader: React.FC = () => {
//   const [csvData, setCsvData] = useState<string[][] | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFileName(file.name);
//       Papa.parse(file, {
//         complete: (result) => {
//           setCsvData(result.data as string[][]);
//         },
//         header: false, // Change to true if your CSV has headers
//       });
//     }
//   };

//   const handleClear = () => {
//     setCsvData(null);
//     setFileName(null);
//   };

//   return (
//     <div className="p-4 flex flex-col items-center">
//       <label className="cursor-pointer w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 hover:bg-blue-500 hover:text-white">
//         <FiUpload className="text-4xl" />
//         <span className="mt-2 text-base leading-normal">
//           {fileName || "Select a CSV file"}
//         </span>
//         <input
//           type="file"
//           className="hidden"
//           accept=".csv"
//           onChange={handleFileUpload}
//         />
//       </label>

//       {csvData && (
//         <>
//           <table className="mt-6 w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 {csvData[0].map((col, index) => (
//                   <th
//                     key={index}
//                     className="border border-gray-300 px-4 py-2 bg-gray-100"
//                   >
//                     {col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {csvData.slice(1).map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {row.map((col, colIndex) => (
//                     <td
//                       key={colIndex}
//                       className="border border-gray-300 px-4 py-2"
//                     >
//                       {col}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button
//             onClick={handleClear}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg flex items-center hover:bg-red-600"
//           >
//             <FiXCircle className="mr-2" />
//             Clear
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CSVUploader;
