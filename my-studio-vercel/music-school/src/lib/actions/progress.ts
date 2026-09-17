"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
<<<<<<< HEAD
import { requireAdmin, requireTeacherOrAdmin, requireSession } from "@/lib/auth";
=======
import { requireAdmin } from "@/lib/auth";
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
import type { ActionState } from "./auth";

const progressSchema = z.object({
  userId: z.coerce.number().int().positive(),
  courseId: z.coerce.number().int().positive(),
  term: z.string().min(1, "กรุณากรอกภาคเรียน"),
  score: z.coerce.number().int().min(0).max(100).optional(),
  skillLevel: z.string().optional(),
  teacherComment: z.string().optional(),
});

export async function createProgressAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
<<<<<<< HEAD
  const session = await requireTeacherOrAdmin();

=======
  await requireAdmin();
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
  const parsed = progressSchema.safeParse({
    userId: formData.get("userId"),
    courseId: formData.get("courseId"),
    term: formData.get("term"),
    score: formData.get("score") || undefined,
    skillLevel: formData.get("skillLevel") || "",
    teacherComment: formData.get("teacherComment") || "",
  });
<<<<<<< HEAD
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  await db.insert(schema.progressRecords).values({
    ...parsed.data,
    teacherId: session.userId,
  });
  revalidatePath("/admin/progress");
  revalidatePath("/teacher/grades");
=======
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  await db.insert(schema.progressRecords).values(parsed.data);
  revalidatePath("/admin/progress");
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
  revalidatePath("/dashboard/progress");
  return null;
}

export async function deleteProgressAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await db.delete(schema.progressRecords).where(eq(schema.progressRecords.id, id));
  revalidatePath("/admin/progress");
<<<<<<< HEAD
  revalidatePath("/teacher/grades");
=======
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
  revalidatePath("/dashboard/progress");
}
