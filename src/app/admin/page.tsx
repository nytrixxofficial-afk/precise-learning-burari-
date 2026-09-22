"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Image as ImageIcon,
  LockKeyhole,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import "./admin.css";

type Note = {
  id: string;
  title: string;
  description: string;
  classGroup: string;
  subject: string;
  fileName: string;
  imageUrl: string | null;
  createdAt: string;
};
const emptyForm = {
  title: "",
  description: "",
  classGroup: "6-8",
  subject: "Maths",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authenticated)
      fetch("/api/notes")
        .then((response) => response.json())
        .then((data) => (Array.isArray(data) ? setNotes(data) : setMessage(data.error)));
  }, [authenticated]);
  async function login(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      setAuthenticated(true);
      setLoginError("");
    } else setLoginError("Invalid username or password.");
  }
  async function saveNote(event: FormEvent) {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    const fileInput = document.querySelector<HTMLInputElement>("#note-image");
    if (fileInput?.files?.[0]) data.append("image", fileInput.files[0]);
    if (editingId) data.append("id", editingId);
    const response = await fetch("/api/notes", {
      method: editingId ? "PUT" : "POST",
      body: data,
    });
    const result = await response.json();
    if (response.ok) {
      const note = result as Note;
      setNotes((items) =>
        editingId
          ? items.map((item) => (item.id === note.id ? note : item))
          : [note, ...items],
      );
      setForm(emptyForm);
      setEditingId(null);
      setMessage("Note published to the student library.");
    } else setMessage(result.error || "Unable to save this note.");
  }
  async function removeNote(id: string) {
    const response = await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    if (!response.ok)
      return setMessage("Your session has expired. Please sign in again.");
    setNotes((items) => items.filter((note) => note.id !== id));
  }
  function editNote(note: Note) {
    setEditingId(note.id);
    setForm({
      title: note.title,
      description: note.description,
      classGroup: note.classGroup,
      subject: note.subject,
    });
    setMessage("");
  }

  if (!authenticated)
    return (
      <main className="admin-shell">
        <Link className="admin-back" href="/">
          <ArrowLeft size={16} /> Back to website
        </Link>
        <div className="login-card">
          <div className="admin-lock">
            <LockKeyhole />
          </div>
          <span className="admin-kicker">Precise Learning Burari</span>
          <h1>Notes dashboard</h1>
          <p>Private workspace for managing the student study library.</p>
          <form onSubmit={login}>
            <label>
              Username
              <input
                value={credentials.username}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    username: event.target.value,
                  })
                }
                placeholder="admin"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
                placeholder="Password"
              />
            </label>
            {loginError && <small className="admin-error">{loginError}</small>}
            <button className="admin-primary">
              Sign in <LockKeyhole size={15} />
            </button>
          </form>
        </div>
      </main>
    );

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <Link className="admin-back" href="/">
          <ArrowLeft size={16} /> View website
        </Link>
        <div>
          <span className="admin-kicker">Precise Learning Burari</span>
          <h1>Notes dashboard</h1>
        </div>
        <button
          className="admin-logout"
          onClick={async () => {
            await fetch("/api/admin/login", { method: "DELETE" });
            setAuthenticated(false);
          }}
        >
          <LogOut size={15} /> Sign out
        </button>
      </header>
      <div className="admin-layout">
        <section className="admin-panel">
          <div className="panel-title">
            <div>
              <span className="admin-kicker">Study library</span>
              <h2>
                Published notes <small>{notes.length}</small>
              </h2>
            </div>
            <span className="live-pill">● Live</span>
          </div>
          <div className="admin-note-list">
            {notes.map((note) => (
              <article className="admin-note" key={note.id}>
                <div className="file-icon">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h3>{note.title}</h3>
                  <p>
                    {note.subject} · Classes {note.classGroup} · {note.fileName}
                  </p>
                </div>
                <button
                  className="admin-edit"
                  onClick={() => editNote(note)}
                  aria-label={`Edit ${note.title}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => removeNote(note.id)}
                  aria-label={`Delete ${note.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="admin-panel add-panel">
          <div className="panel-title">
            <div>
              <span className="admin-kicker">Content</span>
              <h2>{editingId ? "Edit note" : "Add a new note"}</h2>
            </div>
            <Plus size={21} />
          </div>
          <form onSubmit={saveNote}>
            <label>
              Title
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                placeholder="e.g. Quadratic Equations"
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                placeholder="A short description for students"
                rows={3}
                required
              />
            </label>
            <div className="admin-form-row">
              <label>
                Class
                <select
                  value={form.classGroup}
                  onChange={(event) =>
                    setForm({ ...form, classGroup: event.target.value })
                  }
                >
                  <option>6-8</option>
                  <option>9-10</option>
                  <option>11-12</option>
                </select>
              </label>
              <label>
                Subject
                <select
                  value={form.subject}
                  onChange={(event) =>
                    setForm({ ...form, subject: event.target.value })
                  }
                >
                  <option>Maths</option>
                  <option>Science</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>English</option>
                </select>
              </label>
            </div>
            <label>
              Note file
              <input id="note-image" type="file" accept=".pdf,.doc,.docx,image/jpeg,image/png,image/webp,image/gif" required={!editingId} />
              <small className="field-help">PDF, DOC, DOCX or image · 10 MB maximum{editingId ? " · leave empty to keep the current file" : ""}</small>
            </label>
            <button className="admin-primary">
              {editingId ? "Save changes" : "Publish note"} <Plus size={15} />
            </button>
            {message && <p className="admin-message">{message}</p>}
          </form>
          <small className="storage-note">
            Images are stored in Vercel Blob and note details in Neon/Postgres.
          </small>
        </section>
      </div>
    </main>
  );
}
