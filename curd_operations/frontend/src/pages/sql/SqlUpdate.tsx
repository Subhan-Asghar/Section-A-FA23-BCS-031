import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Student {
  _id: string;
  name: string;
  roll: string;
  cgpa: number;
  semester: number;
}

const NoUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // grab :id from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);

  // Fetch student data on mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get<Student>(`http://localhost:3000/students/postgres/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error(err);
        alert("Student not found");
      }
    };
    if (id) fetchStudent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!student) return;
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: name === "cgpa" || name === "semester" ? Number(value) : value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    try {
      await axios.put(`http://localhost:3000/students/postgres/${student._id}`, student);
      alert("Student updated successfully!");
      navigate("/sql"); 
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  if (!student) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Update Student</h1>

        <label className="block mb-3">
          Name
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-3">
          Roll No
          <input
            type="text"
            name="roll"
            value={student.roll}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-3">
          CGPA
          <input
            type="number"
            step="0.01"
            name="cgpa"
            value={student.cgpa}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-5">
          Semester
          <input
            type="number"
            name="semester"
            value={student.semester}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            min={1}
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default NoUpdate;