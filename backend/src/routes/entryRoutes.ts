import { Router } from "express";
import { getEntries, createEntry } from "../controllers/entryController.ts";

const router = Router();

router.get("/", getEntries);
router.post("/", createEntry);

export default router;
