"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  LockKeyhole,
  Search,
} from "lucide-react";

const seedNotes = [
  {
    title: "Algebra: Identities & Equations",
    description:
      "A compact revision sheet with worked examples and practice prompts.",
    classGroup: "9-10",
    subject: "Maths",
    type: "PDF",
    accent: "mint",
  },
  {
    title: "Motion & The Laws of Motion",
    description: "Formula map and concept checks for your next Physics test.",
    classGroup: "9-10",
    subject: "Physics",
    type: "PDF",
    accent: "yellow",
  },
  {
    title: "Chemical Bonding Essentials",
    description: "Understand valency, bonds and structures in one clear guide.",
    classGroup: "11-12",
    subject: "Chemistry",
    type: "DOC",
    accent: "coral",
  },
  {
    title: "Cell: The Unit of Life",
    description:
      "Diagrams, definitions and a self-check quiz for quick revision.",
    classGroup: "6-8",
    subject: "Science",
    type: "PDF",
    accent: "blue",
  },
  {
    title: "Trigonometric Functions",
    description:
      "Build your confidence with identities, graphs and solved questions.",
    classGroup: "11-12",
    subject: "Maths",
    type: "PDF",
    accent: "mint",
  },
  {
    title: "Writing Better Answers",
    description:
      "A practical language toolkit for clearer, higher-scoring responses.",
    classGroup: "6-8",
    subject: "English",
    type: "DOC",
    accent: "yellow",
  },
];

export default function NotesPortal() {
  const [notes, setNotes] = useState(seedNotes);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then(setNotes)
      .catch(() => undefined);
  }, []);
  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          (classFilter === "All classes" || note.classGroup === classFilter) &&
          (subjectFilter === "All subjects" ||
            note.subject === subjectFilter) &&
          `${note.title} ${note.description}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [notes, classFilter, subjectFilter, search],
  );

  return (
    <main className="notes-portal">
      <header className="notes-portal-header">
        <div className="portal-start">
          <Link
            className="portal-back"
            href="/"
            aria-label="Back to Precise Learning"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <div className="portal-brand">
            <Image
              src="/precise-learning-logo.png"
              alt="Precise Learning logo"
              width={42}
              height={42}
            />
            <span>
              PRECISE <b>LEARNING</b>
              <small>BURARI · NEW DELHI</small>
            </span>
          </div>
        </div>
        <Link className="portal-admin" href="/admin">
          <LockKeyhole size={14} /> Admin
        </Link>
      </header>
      <section className="notes-portal-hero">
        <span className="portal-eyebrow">Student study portal</span>
        <h1>
          Notes that make
          <br />
          <em>revision lighter.</em>
        </h1>
        <p>
          Teacher-curated study material for Classes 6–12. Search by topic,
          filter by class and keep learning at your own pace.
        </p>
      </section>
      <section className="notes-portal-content">
        <div className="notes-toolbar">
          <div className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
            />
          </div>
          <select
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
            aria-label="Filter by class"
          >
            <option>All classes</option>
            <option>6-8</option>
            <option>9-10</option>
            <option>11-12</option>
          </select>
          <select
            value={subjectFilter}
            onChange={(event) => setSubjectFilter(event.target.value)}
            aria-label="Filter by subject"
          >
            <option>All subjects</option>
            <option>Maths</option>
            <option>Science</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>English</option>
          </select>
        </div>
        <div className="portal-results">
          <span>{filteredNotes.length} notes available</span>
          <span>Updated for 2026-27</span>
        </div>
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <article className="note-card" key={note.title}>
              <div className={`note-art ${note.accent}`}>
                <span>{note.subject}</span>
                <BookOpen size={36} strokeWidth={1.4} />
              </div>
              <div className="note-info">
                <div className="note-meta">
                  <span>Classes {note.classGroup}</span>
                  <span>{note.type}</span>
                </div>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <button
                  className="download-link"
                  onClick={() => alert(`Opening ${note.title}`)}
                >
                  View note <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
        {filteredNotes.length === 0 && (
          <p className="portal-empty">No notes match those filters yet.</p>
        )}
      </section>
    </main>
  );
}
