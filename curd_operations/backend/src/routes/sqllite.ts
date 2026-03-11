import { Router, Request, Response } from "express";
import { sqliteDB } from "../db/sqlite";

const liteRouter = Router();

// GET all students
liteRouter.get("/sqlite", (req: Request, res: Response) => {
  sqliteDB.all("SELECT * FROM students ORDER BY _id ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching students", error: err });
    res.json(rows);
  });
});

// GET student by ID
liteRouter.get("/sqlite/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  sqliteDB.get("SELECT * FROM students WHERE _id=?", [id], (err, row) => {
    if (err) return res.status(500).json({ message: "Error fetching student", error: err });
    if (!row) return res.status(404).json({ message: "Student not found" });
    res.json(row);
  });
});

// CREATE student
liteRouter.post("/sqlite", (req: Request, res: Response) => {
  const { name, roll, cgpa, semester } = req.body;

  sqliteDB.run(
    "INSERT INTO students(name, roll, cgpa, semester) VALUES (?,?,?,?)",
    [name, roll, cgpa, semester],
    function (err) {
      if (err) return res.status(500).json({ message: "Error creating student", error: err });
      // Return the created student including _id
      res.status(201).json({ _id: this.lastID, name, roll, cgpa, semester });
    }
  );
});

// UPDATE student
liteRouter.put("/sqlite/:id", (req: Request, res: Response) => {
  const { name, roll, cgpa, semester } = req.body;
  const { id } = req.params;

  sqliteDB.run(
    "UPDATE students SET name=?, roll=?, cgpa=?, semester=? WHERE _id=?",
    [name, roll, cgpa, semester, id],
    function (err) {
      if (err) return res.status(500).json({ message: "Error updating student", error: err });
      if (this.changes === 0) return res.status(404).json({ message: "Student not found" });
      res.json({ message: "Student updated successfully" });
    }
  );
});

// DELETE student
liteRouter.delete("/sqlite/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  sqliteDB.run(
    "DELETE FROM students WHERE _id=?",
    [id],
    function (err) {
      if (err) return res.status(500).json({ message: "Error deleting student", error: err });
      if (this.changes === 0) return res.status(404).json({ message: "Student not found" });
      res.json({ message: "Student deleted successfully" });
    }
  );
});

export default liteRouter;