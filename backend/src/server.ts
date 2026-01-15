import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import entryRoutes from "./routes/entryRoutes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Використовуємо маршрути
app.use("/entries", entryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
});
