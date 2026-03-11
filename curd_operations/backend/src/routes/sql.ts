import { Router, Request, Response } from "express";
import { pgPool } from "../db/postgres";

const sqlRouter = Router();

// GET all students
sqlRouter.get("/postgres", async (req: Request, res: Response) => {
  try {
    const result = await pgPool.query("SELECT * FROM students ORDER BY _id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err });
  }
});

// GET student by ID
sqlRouter.get("/postgres/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pgPool.query("SELECT * FROM students WHERE _id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Student not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student", error: err });
  }
});

// CREATE student
sqlRouter.post("/postgres", async (req: Request, res: Response) => {
  const { name, roll, cgpa, semester } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO students(name, roll, cgpa, semester) VALUES($1, $2, $3, $4) RETURNING *",
      [name, roll, cgpa, semester]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error creating student", error: err });
  }
});

// UPDATE student
sqlRouter.put("/postgres/:id", async (req: Request, res: Response) => {
  const { name, roll, cgpa, semester } = req.body;
  const { id } = req.params;

  try {
    const result = await pgPool.query(
      "UPDATE students SET name=$1, roll=$2, cgpa=$3, semester=$4 WHERE _id=$5 RETURNING *",
      [name, roll, cgpa, semester, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: "Student not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err });
  }
});

// DELETE student
sqlRouter.delete("/postgres/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pgPool.query("DELETE FROM students WHERE _id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err });
  }
});

export default sqlRouter;