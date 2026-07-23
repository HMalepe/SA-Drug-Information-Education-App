import { apiGet } from "@/lib/api";

interface CourseList {
  courses: Array<{
    id: string;
    title: string;
    moleculeSlug?: string;
    moleculeName?: string;
    lessonCount: number;
    quizCount: number;
  }>;
}

export default async function LearnPage() {
  let courses: CourseList["courses"] = [];
  try {
    const data = await apiGet<CourseList>("/academy/courses");
    courses = data.courses;
  } catch {
    courses = [];
  }

  return (
    <>
      <h1>Medicine Academy</h1>
      <p className="tagline">Stop memorising. Start understanding. — five lessons per molecule.</p>
      <p>
        <a className="btn" href="/learn/badges" style={{ background: "var(--deep-teal)" }}>
          Badges &amp; streaks (§7.2)
        </a>{" "}
        <a className="btn" href="/learn/review">
          Spaced review (§7.5)
        </a>{" "}
        <a className="btn" href="/learn/mystery" style={{ background: "var(--ink)" }}>
          Mystery Molecule (§7.3)
        </a>{" "}
        <a className="btn" href="/learn/spot-error">
          Spot the Error (§7.3)
        </a>{" "}
        <a className="btn" href="/learn/match" style={{ background: "var(--deep-teal)" }}>
          Match (§7.3)
        </a>{" "}
        <a className="btn" href="/learn/drag-drop">
          Drag &amp; drop (§7.3)
        </a>{" "}
        <a className="btn" href="/learn/build-treatment" style={{ background: "var(--deep-teal)" }}>
          Build the Treatment (§7.3)
        </a>
      </p>
      {courses.length === 0 ? (
        <div className="card">Start the API (`npm run dev:api`) to load courses.</div>
      ) : (
        courses.map((c) => (
          <a
            key={c.id}
            className="card"
            href={`/learn/${c.id}`}
            style={{ display: "block" }}
          >
            <strong>{c.title}</strong>
            <div className="muted">
              {c.moleculeName} · {c.lessonCount} lessons · {c.quizCount} quiz
            </div>
          </a>
        ))
      )}
    </>
  );
}
