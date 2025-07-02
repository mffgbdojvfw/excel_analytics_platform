
// import React, { useState, useRef, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { Bar, Pie, Line, Doughnut, Scatter } from 'react-chartjs-2';
// import Sidebar from '../components/Sidebar';
// import {
//   Chart as ChartJS,
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { uploadExcelFile, getFileHistory, getBase64FileById } from '../api/api';

// import {
//   Upload,
//   FileDown,
//   BarChart2,
//   FileSearch,
//   RotateCcw,
//   Table,
//   MoveHorizontal, MoveVertical
// } from 'lucide-react';

// ChartJS.register(
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const ExcelUpload = () => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [xCol, setXCol] = useState('');
//   const [yCol, setYCol] = useState('');
//   const [chartType, setChartType] = useState('bar');
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [history, setHistory] = useState([]);
//   const chartRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     const fetchHistory = async () => {
//       try {
//         const res = await getFileHistory(token);
//         setHistory(res.data.files);
//       } catch (err) {
//         console.error('Error fetching file history:', err);
//       }
//     };

//     fetchHistory();
//   }, []);

//   useEffect(() => {
//     if (location.state?.base64 && location.state?.name) {
//       handleBase64File(location.state.base64, location.state.name);
//       setUploadedFile({ name: location.state.name, base64: location.state.base64 });
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state]);

//   const generateColors = (count) => {
//   const backgroundColors = [];
//   const borderColors = [];

//   for (let i = 0; i < count; i++) {
//     const r = Math.floor(100 + Math.random() * 155);
//     const g = Math.floor(100 + Math.random() * 155);
//     const b = Math.floor(100 + Math.random() * 155);
//     backgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
//     borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
//   }

//   return { backgroundColors, borderColors };
// };


//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = async (evt) => {
//       const base64 = evt.target.result.split(',')[1];
//       setUploadedFile({ name: file.name, base64 });
//       handleBase64File(base64, file.name);

//       try {
//         const token = localStorage.getItem('token');
//         await uploadExcelFile(file, token);
//         const res = await getFileHistory(token);
//         setHistory(res.data.files);
//       } catch (err) {
//         console.error('File upload failed:', err);
//       }
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleBase64File = (base64, name) => {
//     const binaryString = atob(base64);
//     const bytes = new Uint8Array(binaryString.length);
//     for (let i = 0; i < binaryString.length; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }

//     const wb = XLSX.read(bytes, { type: 'array' });
//     const wsname = wb.SheetNames[0];
//     const ws = wb.Sheets[wsname];
//     const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

//     const headers = jsonData[0];
//     const rows = jsonData.slice(1).filter((row) => row.length >= 2);

//     setColumns(headers);
//     setData(rows);
//     setXCol(headers[0]);
//     setYCol(headers[1]);
//   };

 

//   const getChartData = () => {
//   const xIndex = columns.indexOf(xCol);
//   const yIndex = columns.indexOf(yCol);
//   const validData = data
//     .filter((row) => row[xIndex] !== undefined && !isNaN(row[yIndex]))
//     .map((row) => [row[xIndex], Number(row[yIndex])]);

//   const labels = validData.map((row) => row[0]);
//   const values = validData.map((row) => row[1]);

//   const { backgroundColors, borderColors } = generateColors(values.length);

//   return {
//     labels,
//     datasets: [
//       {
//         label: `${yCol} vs ${xCol}`,
//         data: values,
//         backgroundColor: backgroundColors,
//         borderColor: borderColors,
//         borderWidth: 1,
//       },
//     ],
//   };
// };

//   const getScatterData = () => {
//     const xIndex = columns.indexOf(xCol);
//     const yIndex = columns.indexOf(yCol);
//     return {
//       datasets: [
//         {
//           label: `${yCol} vs ${xCol}`,
//           data: data
//             .filter((row) => !isNaN(row[xIndex]) && !isNaN(row[yIndex]))
//             .map((row) => ({ x: Number(row[xIndex]), y: Number(row[yIndex]) })),
//           backgroundColor: 'rgba(153,102,255,0.6)',
//         },
//       ],
//     };
//   };

//   const renderChart = () => {
//     const chartData = getChartData();
//     const scatterData = getScatterData();

//     switch (chartType) {
//       case 'bar': return <Bar ref={chartRef} data={chartData} />;
//       case 'pie': return <Pie ref={chartRef} data={chartData} />;
//       case 'line': return <Line ref={chartRef} data={chartData} />;
//       case 'doughnut': return <Doughnut ref={chartRef} data={chartData} />;
//       case 'scatter': return <Scatter ref={chartRef} data={scatterData} />;
//       default: return null;
//     }
//   };

//   const downloadAsPDF = async () => {
//     const canvas = await html2canvas(document.getElementById('chart-container'));
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
//     pdf.save('chart.pdf');
//   };

//   const downloadAsExcel = () => {
//     if (!uploadedFile?.base64) return;
//     const link = document.createElement('a');
//     link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${uploadedFile.base64}`;
//     link.download = uploadedFile.name;
//     link.click();
//   };

//   const handleReload = async (fileId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await getBase64FileById(fileId, token);
//       const { base64, name } = res.data;
//       setUploadedFile({ name, base64 });
//       handleBase64File(base64, name);
//     } catch (err) {
//       console.error('Error reloading file:', err);
//       alert("Failed to reload file.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-white to-indigo-50">
//       <Sidebar />
//       <div className="ml-64 w-full px-6 py-8">
//         <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
//           <Table className="text-indigo-500" /> Excel Upload & Chart Builder
//         </h1>

//         <div className="mb-4">
//           <label className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded shadow cursor-pointer hover:bg-indigo-700">
//             <Upload className="w-5 h-5" /> Upload Excel
//             <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" />
//           </label>
//         </div>

//         {data.length > 0 && (
//           <>
//             <div className="flex flex-wrap gap-4 mb-4">
//               <div>
//                 <label className="font-medium flex items-center gap-1">
//                   <MoveHorizontal className="w-4 h-4" /> X-Axis:
//                 </label>
//                 <select className="border p-2 rounded" value={xCol} onChange={(e) => setXCol(e.target.value)}>
//                   {columns.map((col) => <option key={col} value={col}>{col}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="font-medium flex items-center gap-1">
//                   <MoveVertical className="w-4 h-4" /> Y-Axis:
//                 </label>
//                 <select className="border p-2 rounded" value={yCol} onChange={(e) => setYCol(e.target.value)}>
//                   {columns.map((col) => <option key={col} value={col}>{col}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="font-medium flex items-center gap-1">
//                   <BarChart2 className="w-4 h-4" /> Chart Type:
//                 </label>
//                 <select className="border p-2 rounded" value={chartType} onChange={(e) => setChartType(e.target.value)}>
//                   <option value="bar">Bar</option>
//                   <option value="pie">Pie</option>
//                   <option value="line">Line</option>
//                   <option value="doughnut">Doughnut</option>
//                   <option value="scatter">Scatter</option>
//                 </select>
//               </div>
//             </div>

//             <div id="chart-container" className="bg-white p-4 rounded shadow">{renderChart()}</div>

//             <div className="mt-6 flex gap-4">
//               <button onClick={downloadAsPDF} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md inline-flex gap-2 items-center">
//                 <FileDown className="w-4 h-4" /> Download PDF
//               </button>
//               <button onClick={downloadAsExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md inline-flex gap-2 items-center">
//                 <FileDown className="w-4 h-4" /> Download Excel
//               </button>
//             </div>
//           </>
//         )}

//         <div className="mt-10">
//           <h2 className="text-2xl font-semibold mb-4">📁 Previous Uploads</h2>
//           {history.length > 0 ? (
//             <div className="bg-gray-100 p-4 rounded shadow space-y-4">
//               {history.map((file) => (
//                 <div
//                   key={file._id}
//                   className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white px-4 py-3 rounded border border-gray-200 shadow-sm"
//                 >
//                   <div className="flex-1">
//                     <span className="font-medium text-gray-800">{file.originalName || file.filename}</span>
//                     <p className="text-sm text-gray-500">Uploaded on: {new Date(file.uploadedAt).toLocaleString()}</p>
//                   </div>
//                   <div className="flex gap-2 mt-3 md:mt-0">
//                     <button
//                       onClick={() => navigate(`/insight/${file._id}`)}
//                       className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
//                     >
//                       <FileSearch className="w-4 h-4" /> View Insight
//                     </button>
//                     <button
//                       onClick={() => handleReload(file._id)}
//                       className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm"
//                     >
//                       <RotateCcw className="w-4 h-4" /> Reload
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No previous uploads found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExcelUpload;





import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Bar, Pie, Line, Doughnut, Scatter } from 'react-chartjs-2';
import Sidebar from '../components/Sidebar';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadExcelFile, getFileHistory, getBase64FileById } from '../api/api';
import {
  Upload,
  FileDown,
  BarChart2,
  FileSearch,
  RotateCcw,
  Table,
  MoveHorizontal,
  MoveVertical,
} from 'lucide-react';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xCol, setXCol] = useState('');
  const [yCol, setYCol] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [history, setHistory] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const fetchHistory = async () => {
      try {
        const res = await getFileHistory(token);
        setHistory(res.data.files);
      } catch (err) {
        console.error('Error fetching file history:', err);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    if (location.state?.base64 && location.state?.name) {
      handleBase64File(location.state.base64, location.state.name);
      setUploadedFile({ name: location.state.name, base64: location.state.base64 });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const generateColors = (count) => {
    const backgroundColors = [];
    const borderColors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(100 + Math.random() * 155);
      const g = Math.floor(100 + Math.random() * 155);
      const b = Math.floor(100 + Math.random() * 155);
      backgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
      borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }
    return { backgroundColors, borderColors };
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const base64 = evt.target.result.split(',')[1];
      setUploadedFile({ name: file.name, base64 });
      handleBase64File(base64, file.name);
      try {
        const token = localStorage.getItem('token');
        await uploadExcelFile(file, token);
        const res = await getFileHistory(token);
        setHistory(res.data.files);
      } catch (err) {
        console.error('File upload failed:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBase64File = (base64, name) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const wb = XLSX.read(bytes, { type: 'array' });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
    const headers = jsonData[0];
    const rows = jsonData.slice(1).filter((row) => row.length >= 2);
    setColumns(headers);
    setData(rows);
    setXCol(headers[0]);
    setYCol(headers[1]);
  };

  const getChartData = () => {
    const xIndex = columns.indexOf(xCol);
    const yIndex = columns.indexOf(yCol);
    const validData = data
      .filter((row) => row[xIndex] !== undefined && !isNaN(row[yIndex]))
      .map((row) => [row[xIndex], Number(row[yIndex])]);
    const labels = validData.map((row) => row[0]);
    const values = validData.map((row) => row[1]);
    const { backgroundColors, borderColors } = generateColors(values.length);
    return {
      labels,
      datasets: [
        {
          label: `${yCol} vs ${xCol}`,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  };

  const getScatterData = () => {
    const xIndex = columns.indexOf(xCol);
    const yIndex = columns.indexOf(yCol);
    return {
      datasets: [
        {
          label: `${yCol} vs ${xCol}`,
          data: data
            .filter((row) => !isNaN(row[xIndex]) && !isNaN(row[yIndex]))
            .map((row) => ({ x: Number(row[xIndex]), y: Number(row[yIndex]) })),
          backgroundColor: 'rgba(153,102,255,0.6)',
        },
      ],
    };
  };

  const renderChart = () => {
    const chartData = getChartData();
    const scatterData = getScatterData();
    switch (chartType) {
      case 'bar': return <Bar ref={chartRef} data={chartData} />;
      case 'pie': return <Pie ref={chartRef} data={chartData} />;
      case 'line': return <Line ref={chartRef} data={chartData} />;
      case 'doughnut': return <Doughnut ref={chartRef} data={chartData} />;
      case 'scatter': return <Scatter ref={chartRef} data={scatterData} />;
      default: return null;
    }
  };

  const downloadAsPDF = async () => {
    const canvas = await html2canvas(document.getElementById('chart-container'));
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
    pdf.save('chart.pdf');
  };

  const downloadAsExcel = () => {
    if (!uploadedFile?.base64) return;
    const link = document.createElement('a');
    link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${uploadedFile.base64}`;
    link.download = uploadedFile.name;
    link.click();
  };

  const handleReload = async (fileId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await getBase64FileById(fileId, token);
      const { base64, name } = res.data;
      setUploadedFile({ name, base64 });
      handleBase64File(base64, name);
    } catch (err) {
      console.error('Error reloading file:', err);
      alert('Failed to reload file.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] text-white font-sans">
      <Sidebar />
      <div className="ml-20 lg:ml-64 w-full px-6 py-10 animate-fade-in">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-10 flex items-center gap-3">
          <Table className="text-cyan-300 animate-pulse" /> Excel Upload & Chart Builder
        </h1>

        <div className="mb-6">
          <label className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-pink-600 text-white px-6 py-3 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform">
            <Upload className="w-5 h-5 animate-bounce" /> Upload Excel
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {data.length > 0 && (
          <>
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <label className="text-sm font-semibold flex items-center gap-1 text-sky-300">
                  <MoveHorizontal className="w-4 h-4" /> X-Axis:
                </label>
                <select className="bg-slate-800 text-white border border-slate-700 p-2 rounded-lg" value={xCol} onChange={(e) => setXCol(e.target.value)}>
                  {columns.map((col) => <option key={col} value={col}>{col}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold flex items-center gap-1 text-sky-300">
                  <MoveVertical className="w-4 h-4" /> Y-Axis:
                </label>
                <select className="bg-slate-800 text-white border border-slate-700 p-2 rounded-lg" value={yCol} onChange={(e) => setYCol(e.target.value)}>
                  {columns.map((col) => <option key={col} value={col}>{col}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold flex items-center gap-1 text-sky-300">
                  <BarChart2 className="w-4 h-4" /> Chart Type:
                </label>
                <select className="bg-slate-800 text-white border border-slate-700 p-2 rounded-lg" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                  <option value="bar">Bar</option>
                  <option value="pie">Pie</option>
                  <option value="line">Line</option>
                  <option value="doughnut">Doughnut</option>
                  <option value="scatter">Scatter</option>
                </select>
              </div>
            </div>

            <div id="chart-container" className="bg-slate-900 p-6 rounded-2xl shadow-lg animate-fade-in">
              {renderChart()}
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={downloadAsPDF} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl inline-flex gap-2 items-center shadow-md transition">
                <FileDown className="w-4 h-4" /> Download PDF
              </button>
              <button onClick={downloadAsExcel} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl inline-flex gap-2 items-center shadow-md transition">
                <FileDown className="w-4 h-4" /> Download Excel
              </button>
            </div>
          </>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">📁 Previous Uploads</h2>
          {history.length > 0 ? (
            <div className="bg-slate-800 p-4 rounded-xl shadow-inner space-y-4">
              {history.map((file) => (
                <div
                  key={file._id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-700 px-6 py-4 rounded-lg border border-slate-600 shadow hover:shadow-lg transition"
                >
                  <div className="flex-1">
                    <span className="font-medium text-white">{file.originalName || file.filename}</span>
                    <p className="text-sm text-slate-400">Uploaded on: {new Date(file.uploadedAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <button
                      onClick={() => navigate(`/insight/${file._id}`)}
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm shadow"
                    >
                      <FileSearch className="w-4 h-4" /> View Insight
                    </button>
                    <button
                      onClick={() => handleReload(file._id)}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm shadow"
                    >
                      <RotateCcw className="w-4 h-4" /> Reload
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No previous uploads found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelUpload;
