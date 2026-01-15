import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import entryRoutes from "./routes/entryRoutes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/entries", entryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is on http://localhost:${PORT}`);
});
