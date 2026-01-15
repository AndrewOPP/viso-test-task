export interface TimeEntry {
  id: number;
  date: string;
  project: string;
  hours: number | string;
  description: string;
  createdAt: string;
}

export type CreateTimeEntryInput = Omit<TimeEntry, "id" | "createdAt">;

export interface DateFilterProps {
  startDate: string;
  endDate: string;
  onFilterChange: (start: string, end: string) => void;
}

export interface DateFilterState {
  start: string;
  end: string;
}
