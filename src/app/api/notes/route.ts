import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";

type Note = {
  id: string;
  title: string;
  description: string;
  classGroup: string;
  subject: string;
  fileName: string;
  createdAt: string;
};

let notes: Note[] = [
  {
    id: "algebra",
    title: "Algebra: Identities & Equations",
    description: "Worked examples and practice prompts.",
    classGroup: "9-10",
    subject: "Maths",
    fileName: "algebra-identities.pdf",
    createdAt: "2026-06-12",
  },
  {
    id: "motion",
    title: "Motion & The Laws of Motion",
    description: "Formula map and concept checks.",
    classGroup: "9-10",
    subject: "Physics",
    fileName: "motion-laws.pdf",
    createdAt: "2026-06-10",
  },
  {
    id: "bonding",
    title: "Chemical Bonding Essentials",
    description: "Valency, bonds and structures.",
    classGroup: "11-12",
    subject: "Chemistry",
    fileName: "chemical-bonding.docx",
    createdAt: "2026-06-08",
  },
];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(session))) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  const body = await request.json();
  if (
    !body.title ||
    !body.description ||
    !body.classGroup ||
    !body.subject ||
    !body.fileName
  )
    return NextResponse.json(
      { error: "All note fields are required." },
      { status: 400 },
    );
  const note: Note = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  notes = [note, ...notes];
  return NextResponse.json(note, { status: 201 });
}

export async function PUT(request: Request) {
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(session))) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  const body = await request.json();
  if (!body.id || !body.title || !body.description || !body.classGroup || !body.subject || !body.fileName) return NextResponse.json({ error: "All note fields are required." }, { status: 400 });
  const index = notes.findIndex((note) => note.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Note not found." }, { status: 404 });
  notes[index] = { ...notes[index], ...body };
  return NextResponse.json(notes[index]);
}

export async function DELETE(request: Request) {
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(session))) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  notes = notes.filter((note) => note.id !== id);
  return NextResponse.json({ ok: true });
}
