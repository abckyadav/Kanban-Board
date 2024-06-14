import express from "express";
import cors from "cors";
import ConnectMongoDB from "./src/config/db.js";
import dotenv from "dotenv";
import Routes from "./src/routes/route.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

//routes
app.use("/kanban", (req, res) => {
  res.status(200).json({ message: "Welcome to Kanban Board API" });
});
app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectMongoDB();
});
