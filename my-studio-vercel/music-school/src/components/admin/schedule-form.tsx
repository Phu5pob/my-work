"use client";

import { useActionState } from "react";
import { createScheduleAction } from "@/lib/actions/courses";
import { SubmitButton } from "@/components/ui";

const DAYS = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export function ScheduleForm({ courseId }: { courseId: number }) {
  const [state, formAction] = useActionState(createScheduleAction, null);

  return (
    <form action={formAction} className="grid sm:grid-cols-6 gap-3 items-end">
      <input type="hidden" name="courseId" value={courseId} />
      {state?.error ? (
        <p className="sm:col-span-6 text-xs text-danger">{state.error}</p>
      ) : null}

      <div className="sm:col-span-2">
        <label className="block text-xs text-ink-soft mb-1">ครูผู้สอน</label>
        <input
          name="teacherName"
          required
          className="w-full rounded-md border border-line bg-white px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
        />
      </div>
      <div>
        <label className="block text-xs text-ink-soft mb-1">วัน</label>
        <select
          name="dayOfWeek"
          className="w-full rounded-md border border-line bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
        >
          {DAYS.map((d, i) => (
            <option key={i} value={i}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-ink-soft mb-1">เริ่ม</label>
        <input
          type="time"
          name="startTime"
          required
          className="w-full rounded-md border border-line bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
        />
      </div>
      <div>
        <label className="block text-xs text-ink-soft mb-1">สิ้นสุด</label>
        <input
          type="time"
          name="endTime"
          required
          className="w-full rounded-md border border-line bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
        />
      </div>
      <div>
        <label className="block text-xs text-ink-soft mb-1">ห้อง / รับสูงสุด</label>
        <div className="flex gap-1">
          <input
            name="room"
            placeholder="ห้อง"
            className="w-1/2 rounded-md border border-line bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
          />
          <input
            type="number"
            name="maxStudents"
            defaultValue={8}
            min={1}
            className="w-1/2 rounded-md border border-line bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
          />
        </div>
      </div>
      <div className="sm:col-span-6">
        <SubmitButton className="text-xs px-4 py-2" pendingText="กำลังเพิ่ม…">
          เพิ่มรอบเรียน
        </SubmitButton>
      </div>
    </form>
  );
}
