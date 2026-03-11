import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const mongoRouter = Router();

const StudentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  cgpa: Number,
  semester: Number
});

const Student = mongoose.model("Student", StudentSchema);

mongoRouter.get("/mongo", async (req: Request, res: Response) => {
  const students = await Student.find();
  res.json(students);
});

mongoRouter.get("/mongo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id); // find one student by MongoDB _id
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student", error: err });
  }
});
mongoRouter.post("/mongo", async (req: Request, res: Response) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

mongoRouter.put("/mongo/:id", async (req: Request, res: Response) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

mongoRouter.delete("/mongo/:id", async (req: Request, res: Response) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default mongoRouter;