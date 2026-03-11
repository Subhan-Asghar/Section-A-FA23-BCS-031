import { useState } from "react";
import { useNavigate } from "react-router-dom";



function App() {
  const navigate = useNavigate();
   const databases = [
    { id: 1, name: "SQL", desc: "Structured relational database system" ,url:"/sql"},
    { id: 2, name: "Mongodb", desc: "Non-relational flexible database",url:"/nosql" },
    { id: 3, name: "SQLite", desc: "Lightweight embedded SQL database",url:"/sqlite" },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[600px]">
        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Select the Database You Wanna Query
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Database</th>
              <th className="p-3 text-left">Description</th>
    
            </tr>
          </thead>

          <tbody>
            {databases.map((db) => (
              <tr
              onClick={()=>navigate(db.url)}
                key={db.id}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="p-3">{db.id}</td>
                <td className="p-3 font-medium">{db.name}</td>
                <td className="p-3 text-gray-600">{db.desc}</td>
      
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;