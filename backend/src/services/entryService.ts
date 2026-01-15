import prisma from "../lib/prisma.ts";
import pkg from "@prisma/client";

import type { TimeEntry } from "@prisma/client";

export const getTotalHoursByDate = async (date: string): Promise<number> => {
  const dayEntries: TimeEntry[] = await prisma.timeEntry.findMany({
    where: {
      date: date,
    },
  });

  return dayEntries.reduce(
    (sum: number, entry: TimeEntry) => sum + entry.hours,
    0
  );
};
