import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectMongo } from "./db/mongo";
import { connectPostgres } from "./db/postgres";
import { sqliteDB } from "./db/sqlite";

import liteRouter from "./routes/sqllite"
import mongoRouter from "./routes/mongodb"
import sqlRouter from "./routes/sql"

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  
app.use(express.json());

connectMongo();
connectPostgres();

app.use("/students", mongoRouter);
app.use("/students", sqlRouter);
app.use("/students", liteRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("All databases connected");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});