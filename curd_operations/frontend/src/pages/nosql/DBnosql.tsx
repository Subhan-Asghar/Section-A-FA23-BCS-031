import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Student {
  _id: string;   
  name: string;
  roll: string;
  cgpa: number;
  semester: number;
}

const DBnosql: React.FC = () => {
  const navigate= useNavigate()
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get<Student[]>("http://localhost:3000/students/mongo");
        setStudents(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:3000/students/mongo/${id}`);
      // remove the deleted student from state
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete student");
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Student Records <sub className="text-sm">(Mongodb)</sub>
          </h1>
          <button 
          onClick={()=>navigate("/nosql/create")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex gap-1 items-center">
            <Plus size={16} />
            Create
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">CGPA</th>
              <th className="p-3 text-left">Semester</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.roll}</td>
                <td className="p-3">{student.cgpa}</td>
                <td className="p-3">{student.semester}</td>
                <td className="p-3 flex justify-center gap-2">
                  <Pencil 
                  onClick={()=>navigate(`/nosql/update/${student._id}`)}
                  size={16} className="text-blue-600 cursor-pointer" />
                  <Trash2
                  onClick={()=>handleDelete(student._id)}
                  size={16} className="text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DBnosql;