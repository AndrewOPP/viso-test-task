"use client";
import { DateFilterProps } from "@/src/types";
import s from "./DateFilter.module.css";

export default function DateFilter({
  startDate,
  endDate,
  onFilterChange,
}: DateFilterProps) {
  const handleClear = () => onFilterChange("", "");

  return (
    <div className={s.filterBar}>
      <input
        type="date"
        max="9999-12-31"
        className={s.dateInput}
        value={startDate}
        onChange={(event) => onFilterChange(event.target.value, endDate)}
      />
      <span className={s.separator}>—</span>
      <input
        type="date"
        max="9999-12-31"
        className={s.dateInput}
        value={endDate}
        onChange={(event) => onFilterChange(startDate, event.target.value)}
      />

      {(startDate || endDate) && (
        <button
          onClick={handleClear}
          className={s.clearBtn}
          title="Clear filter"
        >
          ✕
        </button>
      )}
    </div>
  );
}
