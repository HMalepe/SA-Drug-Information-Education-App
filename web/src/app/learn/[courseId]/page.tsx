import { CoursePlayer } from "@/components/CoursePlayer";

type Props = { params: Promise<{ courseId: string }> };

export default async function CoursePage({ params }: Props) {
  const { courseId } = await params;
  return <CoursePlayer courseId={courseId} />;
}
