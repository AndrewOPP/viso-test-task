import prisma from "../lib/prisma.ts";

export const getTotalHoursByDate = async (
  date: string | Date
): Promise<number> => {
  const entryDate = new Date(date);

  const startOfDay = new Date(entryDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(entryDate);
  endOfDay.setHours(23, 59, 59, 999);

  const dayEntries = await prisma.timeEntry.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return dayEntries.reduce((sum, entry) => sum + entry.hours, 0);
};
