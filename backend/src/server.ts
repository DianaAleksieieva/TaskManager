import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from './routes/taskRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI as string;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
