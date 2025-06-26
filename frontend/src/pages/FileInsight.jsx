
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { generateInsight } from '../api/api';
// import Sidebar from '../components/Sidebar';
// import { Lightbulb, LoaderCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

// const FileInsight = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [insight, setInsight] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchInsight = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await generateInsight(id, token);
//         console.log('Insight:', response.data);
//         setInsight(response.data.summary);
//       } catch (err) {
//         setError('⚠️ Failed to generate insight.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInsight();
//   }, [id]);

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-indigo-50 to-white">
//       <Sidebar />
//       <div className="md:ml-64 w-full px-6 py-10 md:py-16">
//         <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 flex items-center gap-3">
//           <Lightbulb className="text-yellow-500" /> Insight Summary
//         </h1>

//         {loading ? (
//           <div className="text-lg text-indigo-500 animate-pulse flex items-center gap-2">
//             <LoaderCircle className="animate-spin" /> Generating insights...
//           </div>
//         ) : error ? (
//           <div className="text-red-600 font-semibold flex items-center gap-2">
//             <AlertTriangle className="text-red-500" /> {error}
//           </div>
//         ) : (
//           <div className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-indigo-500 max-w-4xl mx-auto">
//             <ul className="list-disc pl-6 space-y-3 text-gray-800 text-base leading-relaxed">
//   {insight
//   .split('\n')
//   .filter(line => line.trim().length > 0)
//   .map((line, index) => (
//     <li key={index}>
//       {(() => {
//         const match = line.match(/\*\*(.+?)\*\*:\s*(.*)/);
//         if (match) {
//           const [_, boldText, rest] = match;
//           return (
//             <>
//               <strong>{boldText}</strong>: {rest}
//             </>
//           );
//         } else {
//           return line.replace(/^\*\s*/, '');
//         }
//       })()}
//     </li>
// ))}
// </ul>

//           </div>
//         )}

//         <div className="mt-10 flex justify-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
//           >
//             <ArrowLeft /> Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileInsight;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateInsight } from '../api/api';
import Sidebar from '../components/Sidebar';
import { Lightbulb, LoaderCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

const FileInsight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await generateInsight(id, token);
        console.log('Insight:', response.data);
        setInsight(response.data.summary);
      } catch (err) {
        setError('⚠️ Failed to generate insight.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Sidebar />
      <div className="md:ml-64 w-full px-6 py-10 md:py-16">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 flex items-center gap-3">
          <Lightbulb className="text-yellow-500" /> Insight Summary
        </h1>

        {loading ? (
          <div className="text-lg text-indigo-500 animate-pulse flex items-center gap-2">
            <LoaderCircle className="animate-spin" /> Generating insights...
          </div>
        ) : error ? (
          <div className="text-red-600 font-semibold flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> {error}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-indigo-500 max-w-4xl mx-auto">
            <ul className="list-disc pl-6 space-y-3 text-gray-800 text-base leading-relaxed">
  {insight
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map((line, index) => {
      // Normalize quotes and remove bold markdown
      const cleaned = line
        .replace(/“|”/g, '"') // replace smart quotes
        .replace(/‘|’/g, "'") // replace smart apostrophes
        .replace(/\*\*/g, '') // remove all **
        .replace(/^\*\s*/, ''); // remove leading *

      // Optional: Bold the first sentence only
      const firstSentenceEnd = cleaned.indexOf(':');
      if (firstSentenceEnd !== -1) {
        const boldPart = cleaned.slice(0, firstSentenceEnd).trim();
        const rest = cleaned.slice(firstSentenceEnd + 1).trim();
        return (
          <li key={index}>
            <strong>{boldPart}</strong>: {rest}
          </li>
        );
      }

      // Fallback: just show cleaned text
      return <li key={index}>{cleaned}</li>;
    })}
</ul>

          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
          >
            <ArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileInsight;
