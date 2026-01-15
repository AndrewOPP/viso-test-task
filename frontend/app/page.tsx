"use client";

import { useState, useEffect } from "react";
import { getEntries } from "../src/lib/api";
import { DateFilterState, TimeEntry } from "../src/types";
import EntryForm from "../src/components/EntryForm/EntryForm";
import HistoryList from "../src/components/HistoryList/HistoryList";
import DateFilter from "../src/components/DateFilter/DateFilter";
import s from "./page.module.css";

export default function Home() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<DateFilterState>({
    start: "",
    end: "",
  });

  const loadEntries = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data: TimeEntry[] = await getEntries();
      setEntries(data);
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const filteredEntries = entries.filter((entry: TimeEntry): boolean => {
    const entryDate = entry.date;

    if (filter.start && entryDate < filter.start) return false;
    if (filter.end && entryDate > filter.end) return false;
    return true;
  });

  return (
    <main className={s.main}>
      <div className={s.container}>
        <div className={s.formColumn}>
          <EntryForm onSuccess={loadEntries} />
        </div>

        <div className={s.historyColumn}>
          <div className={s.headerRow}>
            <h1 className={s.title}>Activity History</h1>

            <DateFilter
              startDate={filter.start}
              endDate={filter.end}
              onFilterChange={(start, end) => setFilter({ start, end })}
            />
          </div>

          {isLoading ? (
            <div className={s.loaderContainer}>
              <div className={s.spinner}></div>
              <p>Loading history...</p>
            </div>
          ) : (
            <HistoryList entries={filteredEntries} />
          )}
        </div>
      </div>
    </main>
  );
}
