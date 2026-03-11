import sqlite3 from "sqlite3";

// Connect to SQLite database (creates the file if it doesn't exist)
export const sqliteDB = new sqlite3.Database("./students.db", (err) => {
  if (err) {
    console.error("SQLite connection failed:", err.message);
  } else {
    console.log("SQLite connected successfully");

    // Create the 'students' table if it doesn't exist
    sqliteDB.run(
      `CREATE TABLE IF NOT EXISTS students (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        roll TEXT NOT NULL,
        cgpa REAL NOT NULL,
        semester INTEGER NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Failed to create students table:", err.message);
        } else {
          console.log("Students table is ready");
        }
      }
    );
  }
});