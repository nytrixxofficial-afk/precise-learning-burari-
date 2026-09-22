import { neon } from "@neondatabase/serverless";

export type Note = {
  id: string;
  title: string;
  description: string;
  classGroup: string;
  subject: string;
  fileName: string;
  imageUrl: string | null;
  mimeType: string | null;
  fileSize: number | null;
  createdAt: string;
};

type NoteRow = {
  id: string;
  title: string;
  description: string;
  class_group: string;
  subject: string;
  file_name: string;
  image_url: string | null;
  mime_type: string | null;
  file_size: number | null;
  created_at: string;
};

const legacySeedNoteIds = ["algebra", "motion", "bonding"] as const;

function database() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }
  return neon(process.env.DATABASE_URL);
}

export async function ensureNotesTable() {
  const sql = database();
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      class_group TEXT NOT NULL,
      subject TEXT NOT NULL,
      file_name TEXT NOT NULL,
      image_url TEXT,
      mime_type TEXT,
      file_size INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  for (const id of legacySeedNoteIds) {
    await sql`DELETE FROM notes WHERE id = ${id}`;
  }
  return sql;
}

function mapNote(row: NoteRow): Note {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    classGroup: row.class_group,
    subject: row.subject,
    fileName: row.file_name,
    imageUrl: row.image_url,
    mimeType: row.mime_type,
    fileSize: row.file_size,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function getNotes() {
  if (!process.env.DATABASE_URL) {
    return [];
  }
  const sql = await ensureNotesTable();
  const rows = await sql`SELECT * FROM notes ORDER BY created_at DESC`;
  return (rows as NoteRow[]).map(mapNote);
}

export async function getNote(id: string) {
  const sql = await ensureNotesTable();
  const rows = await sql`SELECT * FROM notes WHERE id = ${id}`;
  return rows.length ? mapNote(rows[0] as NoteRow) : null;
}

export async function insertNote(note: Omit<Note, "createdAt">) {
  const sql = await ensureNotesTable();
  const rows = await sql`
    INSERT INTO notes (id, title, description, class_group, subject, file_name, image_url, mime_type, file_size)
    VALUES (${note.id}, ${note.title}, ${note.description}, ${note.classGroup}, ${note.subject}, ${note.fileName}, ${note.imageUrl}, ${note.mimeType}, ${note.fileSize})
    RETURNING *
  `;
  return mapNote(rows[0] as NoteRow);
}

export async function updateNote(note: Omit<Note, "createdAt">) {
  const sql = await ensureNotesTable();
  const rows = await sql`
    UPDATE notes
    SET title = ${note.title}, description = ${note.description}, class_group = ${note.classGroup},
        subject = ${note.subject}, file_name = ${note.fileName}, image_url = ${note.imageUrl},
        mime_type = ${note.mimeType}, file_size = ${note.fileSize}
    WHERE id = ${note.id}
    RETURNING *
  `;
  return rows.length ? mapNote(rows[0] as NoteRow) : null;
}

export async function deleteNote(id: string) {
  const sql = await ensureNotesTable();
  const rows = await sql`DELETE FROM notes WHERE id = ${id} RETURNING *`;
  return rows.length ? mapNote(rows[0] as NoteRow) : null;
}
