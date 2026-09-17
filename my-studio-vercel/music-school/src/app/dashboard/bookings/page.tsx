import Link from "next/link";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getSession } from "@/lib/auth";
import { ENROLLMENT_STATUS_LABELS, dayOfWeekLabel, formatThaiDate } from "@/lib/format";
import { StatusBadge } from "@/components/ui";
import { cancelEnrollmentAction } from "@/lib/actions/enrollments";

<<<<<<< HEAD
export default async function BookingsPage({ searchParams }: PageProps) {
=======
export default async function BookingsPage({
  searchParams,
}: PageProps<"/dashboard/bookings">) {
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
  const params = await searchParams;
  const session = await getSession();
  if (!session) return null;

  const enrollments = await db.query.enrollments.findMany({
    where: eq(schema.enrollments.userId, session.userId),
<<<<<<< HEAD
    with: {
      course: { with: { branch: true } },
      schedule: { with: { teacher: true, room: true } },
    },
=======
    with: { course: { with: { branch: true } }, schedule: true },
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
    orderBy: (e, { desc }) => [desc(e.createdAt)],
  });

  return (
    <div>
      <h2 className="font-display text-xl mb-1">การจองของฉัน</h2>
      <p className="text-sm text-ink-soft mb-6">รายการคอร์สที่คุณจองไว้ทั้งหมด</p>

<<<<<<< HEAD
      {params.booked && (
        <p className="text-sm text-sage bg-sage/10 border border-sage/20 rounded-md px-4 py-3 mb-6">
          จองคอร์สสำเร็จแล้ว กรุณาชำระเงินที่หน้าการชำระเงินเพื่อยืนยันที่นั่ง
        </p>
      )}
=======
      {params.booked ? (
        <p className="text-sm text-sage bg-sage/10 border border-sage/20 rounded-md px-4 py-3 mb-6">
          จองคอร์สสำเร็จแล้ว กรุณาชำระเงินที่หน้าการชำระเงินเพื่อยืนยันที่นั่ง
        </p>
      ) : null}
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779

      {enrollments.length === 0 ? (
        <div className="border border-dashed border-line rounded-md p-8 text-center">
          <p className="text-sm text-ink-soft mb-4">คุณยังไม่ได้จองคอร์สเรียน</p>
<<<<<<< HEAD
          <Link href="/courses" className="text-sm rounded-full bg-burgundy text-white px-5 py-2 hover:bg-burgundy-deep transition-colors">
=======
          <Link
            href="/courses"
            className="text-sm rounded-full bg-burgundy text-ivory px-5 py-2 hover:bg-burgundy-deep transition-colors"
          >
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
            เลือกคอร์สเรียน
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((e) => (
            <div key={e.id} className="border border-line rounded-md p-5 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{e.course.title}</p>
<<<<<<< HEAD
                  <p className="text-xs text-ink-soft mt-1">{e.course.branch?.name}</p>
                  {e.schedule && (
                    <p className="text-xs text-ink-soft mt-1">
                      วัน{dayOfWeekLabel(e.schedule.dayOfWeek)} {e.schedule.startTime}–{e.schedule.endTime} น.
                      {e.schedule.teacher ? ` · ครู${e.schedule.teacher.name}` : ""}
                      {e.schedule.room ? ` · ${e.schedule.room.name}` : ""}
                    </p>
                  )}
                  <p className="text-xs text-ink-soft mt-1">จองเมื่อ {formatThaiDate(e.createdAt)}</p>
                </div>
                <StatusBadge status={e.status} label={ENROLLMENT_STATUS_LABELS[e.status]} />
              </div>
              {e.status === "pending" && (
                <form action={cancelEnrollmentAction} className="mt-4 pt-4 border-t border-line">
                  <input type="hidden" name="id" value={e.id} />
                  <button className="text-sm text-danger hover:underline">ยกเลิกการจองนี้</button>
                </form>
              )}
=======
                  <p className="text-xs text-ink-soft mt-1">
                    {e.course.branch?.name}
                  </p>
                  {e.schedule ? (
                    <p className="text-xs text-ink-soft mt-1">
                      วัน{dayOfWeekLabel(e.schedule.dayOfWeek)} {e.schedule.startTime}–
                      {e.schedule.endTime} น. · ครู{e.schedule.teacherName}
                    </p>
                  ) : null}
                  <p className="text-xs text-ink-soft mt-1">
                    จองเมื่อ {formatThaiDate(e.createdAt)}
                  </p>
                </div>
                <StatusBadge status={e.status} label={ENROLLMENT_STATUS_LABELS[e.status]} />
              </div>

              {e.status === "pending" ? (
                <form action={cancelEnrollmentAction} className="mt-4 pt-4 border-t border-line">
                  <input type="hidden" name="id" value={e.id} />
                  <button className="text-sm text-danger hover:underline">
                    ยกเลิกการจองนี้
                  </button>
                </form>
              ) : null}
>>>>>>> 874ea79cc431605fe47de8f3588255dbbc2c6779
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
