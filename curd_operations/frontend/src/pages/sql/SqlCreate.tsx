import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Student {
  name: string;
  roll: string;
  cgpa: number;
  semester: number;
}

const SqlCreate: React.FC = () => {
    const navigate=useNavigate()
  const [student, setStudent] = useState<Student>({
    name: "",
    roll: "",
    cgpa: 0,
    semester: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: name === "cgpa" || name === "semester" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/students/postgres", student);
        navigate("/sql")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Create Student</h1>

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
          Create
        </button>
      </form>
    </div>
  );
};

export default SqlCreate;