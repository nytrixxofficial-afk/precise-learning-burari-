import { del, put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import {
  deleteNote,
  getNote,
  getNotes,
  insertNote,
  updateNote,
} from "@/lib/notes";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

class NotesValidationError extends Error {}

function errorResponse(error: unknown) {
  console.error("Notes API error", error);
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "Unable to load notes." },
    { status: error instanceof NotesValidationError ? 400 : 500 },
  );
}

async function requireAdmin() {
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  return verifyAdminToken(session);
}

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateFields(form: FormData) {
  const title = text(form, "title");
  const description = text(form, "description");
  const classGroup = text(form, "classGroup");
  const subject = text(form, "subject");
  if (!title || !description || !classGroup || !subject) {
    throw new NotesValidationError("Title, description, class and subject are required.");
  }
  return { title, description, classGroup, subject };
}

async function uploadImage(file: File) {
  if (!file.size) throw new NotesValidationError("Choose an image file to publish.");
  if (!allowedImageTypes.has(file.type)) {
    throw new NotesValidationError("Only JPEG, PNG, WebP and GIF images are supported.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new NotesValidationError("Images must be 10 MB or smaller.");
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }
  return put(`notes/${crypto.randomUUID()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });
}

export async function GET() {
  try {
    return NextResponse.json(await getNotes());
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  }
  try {
    const form = await request.formData();
    const fields = validateFields(form);
    const file = form.get("image");
    if (!(file instanceof File)) throw new NotesValidationError("Choose an image file to publish.");
    const blob = await uploadImage(file);
    return NextResponse.json(
      await insertNote({
        id: crypto.randomUUID(),
        ...fields,
        fileName: file.name,
        imageUrl: blob.url,
        mimeType: file.type,
        fileSize: file.size,
      }),
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  }
  let uploadedUrl: string | null = null;
  try {
    const form = await request.formData();
    const id = text(form, "id");
    if (!id) throw new NotesValidationError("Note id is required.");
    const existing = await getNote(id);
    if (!existing) return NextResponse.json({ error: "Note not found." }, { status: 404 });
    const fields = validateFields(form);
    const file = form.get("image");
    const uploadedFile = file instanceof File && file.size ? file : null;
    const blob = uploadedFile ? await uploadImage(uploadedFile) : null;
    uploadedUrl = blob?.url ?? null;
    const note = await updateNote({
      id,
      ...fields,
      fileName: uploadedFile ? uploadedFile.name : existing.fileName,
      imageUrl: blob?.url ?? existing.imageUrl,
      mimeType: blob ? uploadedFile?.type ?? existing.mimeType : existing.mimeType,
      fileSize: blob ? uploadedFile?.size ?? existing.fileSize : existing.fileSize,
    });
    if (!note) return NextResponse.json({ error: "Note not found." }, { status: 404 });
    if (blob && existing.imageUrl) await del(existing.imageUrl);
    return NextResponse.json(note);
  } catch (error) {
    if (uploadedUrl) await del(uploadedUrl).catch((cleanupError) => console.error("Blob cleanup failed", cleanupError));
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  }
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Note id is required." }, { status: 400 });
    const note = await deleteNote(id);
    if (!note) return NextResponse.json({ error: "Note not found." }, { status: 404 });
    if (note.imageUrl) await del(note.imageUrl);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
