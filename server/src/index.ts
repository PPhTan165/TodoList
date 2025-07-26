// This is a simple Express server that responds to a ping request
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/task.route";
import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route"
import goalRoutes from "./routes/goal.route";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/',goalRoutes)
app.use('/api/goals', todoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});