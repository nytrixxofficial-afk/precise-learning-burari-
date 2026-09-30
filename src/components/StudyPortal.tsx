"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, LockKeyhole, Search } from "lucide-react";
import type { StudyCategory } from "@/lib/notes";

const accents = ["mint", "yellow", "coral", "blue"] as const;

type StudyPortalProps = { category: StudyCategory };
type PortalNote = {
  id: string;
  title: string;
  description: string;
  classGroup: string;
  subject: string;
  fileName: string;
  mimeType: string | null;
  imageUrl: string | null;
  type: string;
  accent: (typeof accents)[number];
};

export default function StudyPortal({ category }: StudyPortalProps) {
  const [notes, setNotes] = useState<PortalNote[]>([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  const [loadError, setLoadError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/notes?category=${category}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load study material.");
        if (!Array.isArray(data)) throw new Error("Unexpected study library response.");
        setNotes(
          data.map((note, index) => ({
            ...note,
            type: note.mimeType
              ? note.mimeType.split("/")[1].toUpperCase()
              : (note.fileName?.split(".").pop() || "FILE").toUpperCase(),
            accent: accents[index % accents.length],
          })),
        );
      })
      .catch((error: unknown) => {
        console.error("Study portal error", error);
        setLoadError(
          error instanceof Error ? error.message : "Unable to load important questions.",
        );
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          (classFilter === "All classes" || note.classGroup === classFilter) &&
          (subjectFilter === "All subjects" || note.subject === subjectFilter) &&
          `${note.title} ${note.description} ${note.subject}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [notes, classFilter, subjectFilter, search],
  );

  return (
    <main className="notes-portal">
      <header className="notes-portal-header">
        <div className="portal-start">
          <Link className="portal-back" href="/" aria-label="Back to Precise Learning">
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
        <div className="portal-tools">
          <Link className="portal-library-link" href="/notes">Get Notes</Link>
          <Link className="portal-admin" href="/admin">
            <LockKeyhole size={14} /> Admin
          </Link>
        </div>
      </header>
      <section className="notes-portal-hero">
        <span className="portal-eyebrow">Important Questions library</span>
        <h1>
          Questions for
          <br />
          <em>focused practice.</em>
        </h1>
        <p>
          Teacher-selected important questions for Classes 6–12. Find practice
          material by class and subject.
        </p>
        <Link className="portal-question-link" href="/notes">
          Browse study notes <ArrowRight size={15} />
        </Link>
      </section>
      <section className="notes-portal-content">
        <div className="notes-toolbar">
          <div className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search questions"
              aria-label="Search questions"
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
            <option>Social Science</option>
          </select>
        </div>
        <div className="portal-results">
          <span>{filteredNotes.length} question sets available</span>
          <span>Classes 6–12</span>
        </div>
        {loadError ? (
          <p className="portal-empty" role="alert">
            {loadError}
          </p>
        ) : isLoading ? (
          <p className="portal-empty">Loading important questions...</p>
        ) : (
          <>
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <article className="note-card" key={note.id}>
                  <div className={`note-art ${note.accent}`}>
                    {note.imageUrl && note.mimeType?.startsWith("image/") ? (
                      <Image
                        src={note.imageUrl}
                        alt=""
                        width={600}
                        height={400}
                        unoptimized
                      />
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
                      <a
                        className="download-link"
                        href={note.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View / open question file <ArrowRight size={15} />
                      </a>
                    ) : (
                      <span className="download-link legacy-note">
                        File unavailable <ArrowRight size={15} />
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
            {filteredNotes.length === 0 && (
              <p className="portal-empty">
                No important questions match those filters yet.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
