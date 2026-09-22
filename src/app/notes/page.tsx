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

const accents = ["mint", "yellow", "coral", "blue"] as const;
type PortalNote = {
  title: string;
  description: string;
  classGroup: string;
  subject: string;
  type: string;
  accent: (typeof accents)[number];
  id?: string;
  fileName?: string;
  mimeType?: string | null;
  imageUrl?: string | null;
};

export default function NotesPortal() {
  const [notes, setNotes] = useState<PortalNote[]>([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(data)
          ? setNotes(
              data.map((note, index) => ({
                ...note,
                type: note.mimeType
                  ? note.mimeType.split("/")[1].toUpperCase()
                  : (note.fileName?.split(".").pop() || "NOTE").toUpperCase(),
                accent: accents[index % accents.length],
              })),
            )
          : undefined,
      )
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
                {note.imageUrl ? (
                  <img src={note.imageUrl} alt="" />
                ) : (
                  <>
                    <span>{note.subject}</span>
                    <BookOpen size={36} strokeWidth={1.4} />
                  </>
                )}
              </div>
              <div className="note-info">
                <div className="note-meta">
                  <span>Classes {note.classGroup}</span>
                  <span>{note.type}</span>
                </div>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                {note.imageUrl ? (
                  <a className="download-link" href={note.imageUrl} target="_blank" rel="noreferrer">
                    View / open image <ArrowRight size={15} />
                  </a>
                ) : (
                  <span className="download-link legacy-note">
                    Text note <ArrowRight size={15} />
                  </span>
                )}
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
