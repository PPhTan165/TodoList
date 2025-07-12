// This is a simple Express server that responds to a ping request
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route";
import authRoutes from "./routes/auth.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);
app.use(cors());




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});