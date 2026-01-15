"use client";
import { useState } from "react";
import { PROJECTS } from "../../constants/projects";
import { createEntry } from "../../lib/api";
import { CreateTimeEntryInput } from "../../types";
import s from "./EntryForm.module.css";

export default function EntryForm({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<CreateTimeEntryInput>({
    date: new Date().toLocaleDateString("en-CA"),
    project: PROJECTS[0],
    hours: "",
    description: "",
  });

  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError("");

    if (!values.hours || !values.description) {
      if (values.hours === 0) {
        setError("Amount of hours must be not a 0");
        return;
      }
      setError("Please fill in all fields");
      return;
    }

    try {
      await createEntry({
        ...values,
        date: values.date,
        hours: Number(values.hours),
      });
      setValues({ ...values, hours: "", description: "" });
      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const onHourInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const val = event.target.value;
    const num = Number(val);

    if (val === "") {
      setValues({ ...values, hours: "" });
      return;
    }
    if (num < 0 || num > 24 || val.length > 2) return;

    setValues({ ...values, hours: val });
  };

  return (
    <div className={s.card}>
      <h2 className={s.title}>New Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          max="9999-12-31"
          className={s.input}
          value={values.date}
          onChange={(event) =>
            setValues({ ...values, date: event.target.value })
          }
        />

        <select
          className={s.input}
          value={values.project}
          onChange={(event) =>
            setValues({ ...values, project: event.target.value })
          }
        >
          {PROJECTS.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        <input
          type="number"
          max="24"
          placeholder="Hours"
          className={`${s.input} ${error.includes("hour") ? s.inputError : ""}`}
          value={values.hours}
          onChange={(event) => {
            onHourInputChange(event);
          }}
        />

        <textarea
          placeholder="Description"
          className={`${s.input} h-24 resize-none`}
          value={values.description}
          onChange={(event) =>
            setValues({ ...values, description: event.target.value })
          }
        />

        <div className={s.errorSlot}>
          {error && (
            <p className={s.errorText}>
              <span>❌</span> {error}
            </p>
          )}
        </div>

        <button type="submit" className={s.submitBtn}>
          Save
        </button>
      </form>
    </div>
  );
}
