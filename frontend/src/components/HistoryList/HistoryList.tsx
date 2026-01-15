"use client";
import { TimeEntry } from "../../types";
import s from "./HistoryList.module.css";

export default function HistoryList({ entries }: { entries: TimeEntry[] }) {
  const grandTotal: number = entries.reduce(
    (sum: number, entry: TimeEntry): number => sum + Number(entry.hours),
    0
  );

  const grouped = entries.reduce<Record<string, TimeEntry[]>>((acc, entry) => {
    const dateKey = new Date(entry.date).toLocaleDateString();

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(entry);
    return acc;
  }, {});

  if (entries.length === 0) {
    return <div className={s.emptyEntries}>History is empty...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.grandTotalCard}>
        <span className={s.grandTotalLabel}>Total Hours Logged</span>
        <span className={s.grandTotalValue}>{grandTotal}h</span>
      </div>

      {Object.keys(grouped).map((date) => {
        const dayTotal = grouped[date].reduce(
          (sum, acc) => sum + Number(acc.hours),
          0
        );

        return (
          <div key={date} className={s.dayBlock}>
            <div className={s.dayHeader}>
              <span className={s.date}>{date}</span>
              <span className={s.dayTotalBadge}>Day Total: {dayTotal}h</span>
            </div>

            <div>
              {grouped[date].map((item) => (
                <div key={item.id} className={s.entryRow}>
                  <div className="flex-1">
                    <div className={s.projectTitle}>{item.project}</div>
                    <div className={s.description}>{item.description}</div>
                  </div>
                  <div className={s.hours}>{item.hours}h</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
