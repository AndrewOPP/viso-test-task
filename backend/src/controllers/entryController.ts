import type { Request, Response } from "express";
import prisma from "../lib/prisma.ts";
import { getTotalHoursByDate } from "../services/entryService.ts";

export const getEntries = async (req: Request, res: Response) => {
  try {
    const entries = await prisma.timeEntry.findMany({
      orderBy: { date: "desc" },
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Помилка при отриманні даних" });
  }
};

export const createEntry = async (req: Request, res: Response) => {
  const { date, project, hours, description } = req.body;

  if (!date || !project || !hours || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hoursNum = Number(hours);
  if (isNaN(hoursNum) || hoursNum <= 0) {
    return res.status(400).json({ error: "Hours must be a positive number" });
  }

  try {
    const currentTotal = await getTotalHoursByDate(date);

    if (currentTotal + hoursNum > 24) {
      return res.status(400).json({
        error: `Maximum 24 hours per calendar date. Currently you have ${currentTotal} hours on this day.`,
      });
    }

    const newEntry = await prisma.timeEntry.create({
      data: {
        date: date,
        project,
        hours: hoursNum,
        description,
      },
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка при створенні запису" });
  }
};
