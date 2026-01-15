import { Router } from "express";
import { getEntries, createEntry } from "../controllers/entryController.ts";

const router = Router();

router.get("/", getEntries); // Отримати всю історію
router.post("/", createEntry); // Зберегти новий запис

export default router;
