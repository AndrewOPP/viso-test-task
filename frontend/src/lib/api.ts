import { CreateTimeEntryInput, TimeEntry } from "@/src/types";

const API_URL = "http://localhost:5000/entries";

export const getEntries = async (): Promise<TimeEntry[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
};

export const createEntry = async (
  data: CreateTimeEntryInput
): Promise<TimeEntry> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to save");
  return result;
};
