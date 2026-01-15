# Time Entry Tracking System

A time tracking system with a clear separation between Frontend and Backend. The application allows users to log hours worked on various projects and automatically calculates daily totals.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, React.
- **Backend:** Node.js, Express, TypeScript, Prisma ORM.
- **Database:** SQLite.

---

## 📁 Project Structure

The project is divided into two main directories for independent dependency management:

- `/frontend` — Client-side application (UI, display logic).
- `/backend` — Server-side API (Database interaction, business logic).

---

## 🚀 Getting Started

To run the application correctly, you must start both the frontend and backend in **separate** terminal windows.

### 1. Run Backend (Server)

The project uses **SQLite** as a database, so no external database installation is required. Follow these steps:

Open a terminal in the project root and execute:

1. `cd backend`
2. `npm install`
3. Create a .env file in the backend folder and add the following line:

```bash
DATABASE_URL="file:./dev.db"
```

4. `npx prisma migrate dev --name init`
5. `npx prisma generate`
6. `npm run dev`

### 2. Run Frontend (Client)

Open a **second** terminal in the project root and execute:

1. `cd frontend`
2. `npm install`
3. `npm run dev`

_The application will be available at: http://localhost:3000_

---

## ⚙️ Implementation Details

- **Type Safety:** Full data typing across all layers — from the database schema to React component props.
- **Data Aggregation:** Daily hour summation is implemented using a typed `reduce` method integrated with Prisma types.
- **Prisma Client:** Configured with safe client imports to prevent conflicts between ESM and CommonJS modules in the Node.js environment.
- **Interface:** Modern UI built with Tailwind CSS, including Russian date localization support and responsive design.

---

## ✅ Core Features

- View a comprehensive list of all time entries.
- Automatic grouping of entries by date.
- Calculation of total hours worked for each specific day.
- Add new entries via a form with type validation (Float for hours).
