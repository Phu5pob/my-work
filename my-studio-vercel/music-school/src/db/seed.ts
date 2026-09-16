import { db, schema } from "./index";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  await db.delete(schema.progressRecords);
  await db.delete(schema.payments);
  await db.delete(schema.enrollments);
  await db.delete(schema.schedules);
  await db.delete(schema.articles);
  await db.delete(schema.courses);
  await db.delete(schema.users);
  await db.delete(schema.branches);

  // ---------- Branches ----------
  const [siam, thonglor, megabangna] = await db
    .insert(schema.branches)
    .values([
      {
        name: "สาขาสยาม",
        address: "ชั้น 4 สยามสแควร์วัน กรุงเทพฯ",
        phone: "02-111-2222",
        description: "สาขาใหญ่ใจกลางเมือง ห้องซ้อมเสียงกันเสียงครบ 8 ห้อง",
        imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200",
      },
      {
        name: "สาขาทองหล่อ",
        address: "ซอยทองหล่อ 10 กรุงเทพฯ",
        phone: "02-333-4444",
        description: "บรรยากาศอบอุ่น เหมาะสำหรับเด็กเล็กและครอบครัว",
        imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200",
      },
      {
        name: "สาขาเมกาบางนา",
        address: "ชั้น 3 เมกาบางนา กรุงเทพฯ",
        phone: "02-555-6666",
        description: "ที่จอดรถสะดวก ห้องเรียนกลองกันเสียงพิเศษ",
        imageUrl: "https://images.unsplash.com/photo-1571327073757-af4d0c3c8c3e?q=80&w=1200",
      },
    ])
    .returning();

  // ---------- Users ----------
  const adminHash = await bcrypt.hash("admin1234", 10);
  const studentHash = await bcrypt.hash("student1234", 10);

  const [admin] = await db.insert(schema.users).values({
    name: "ผู้ดูแลระบบ",
    email: "admin@mystudio.example",
    passwordHash: adminHash,
    role: "admin",
    phone: "080-000-0000",
    branchId: siam.id,
  }).returning();

  const [demoStudent] = await db.insert(schema.users).values({
    name: "น้องมิว ทดสอบระบบ",
    email: "student@mystudio.example",
    passwordHash: studentHash,
    role: "student",
    phone: "081-234-5678",
    branchId: siam.id,
  }).returning();

  // ---------- Courses ----------
  const courseData = [
    { branchId: siam.id, title: "เปียโนพื้นฐานสำหรับเด็ก", slug: "piano-kids-siam", instrument: "เปียโน", level: "beginner" as const, description: "ปูพื้นฐานการอ่านโน้ต จังหวะ และเทคนิคการวางนิ้ว เหมาะสำหรับเด็กอายุ 5-10 ปี", price: 3200, durationWeeks: 12, imageUrl: "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=1200" },
    { branchId: siam.id, title: "กีตาร์โปร่งสำหรับผู้เริ่มต้น", slug: "acoustic-guitar-beginner-siam", instrument: "กีตาร์", level: "beginner" as const, description: "เรียนคอร์ดพื้นฐาน การตีคอร์ด และเพลงยอดนิยม เหมาะสำหรับวัยรุ่นและผู้ใหญ่", price: 2800, durationWeeks: 10, imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200" },
    { branchId: thonglor.id, title: "ร้องเพลงและฝึกหายใจ", slug: "vocal-training-thonglor", instrument: "ร้องเพลง", level: "beginner" as const, description: "ฝึกเทคนิคการหายใจ การควบคุมเสียง และการตีความเพลง สำหรับผู้รักการร้องเพลงทุกวัย", price: 3500, durationWeeks: 12, imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200" },
    { branchId: thonglor.id, title: "ไวโอลินระดับกลาง", slug: "violin-intermediate-thonglor", instrument: "ไวโอลิน", level: "intermediate" as const, description: "สำหรับผู้ที่มีพื้นฐานไวโอลินแล้ว เน้นเทคนิคการโยกคันชักและบทเพลงคลาสสิก", price: 4200, durationWeeks: 14, imageUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=1200" },
    { branchId: megabangna.id, title: "กลองชุดสำหรับผู้เริ่มต้น", slug: "drums-beginner-megabangna", instrument: "กลอง", level: "beginner" as const, description: "เรียนรู้จังหวะพื้นฐาน การตีกลองชุด ในห้องซ้อมกันเสียงพิเศษ", price: 3800, durationWeeks: 12, imageUrl: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1200" },
    { branchId: megabangna.id, title: "เปียโนแจ๊สขั้นสูง", slug: "jazz-piano-advanced-megabangna", instrument: "เปียโน", level: "advanced" as const, description: "เจาะลึกทฤษฎีแจ๊ส การอิมโพรไวส์ สำหรับผู้เล่นเปียโนที่มีพื้นฐานคลาสสิกมาแล้ว", price: 5200, durationWeeks: 16, imageUrl: "https://images.unsplash.com/photo-1571974599782-87624638275e?q=80&w=1200" },
  ];

  const insertedCourses = await db.insert(schema.courses).values(courseData).returning();

  // ---------- Schedules ----------
  const scheduleValues = insertedCourses.map((course, i) => ({
    courseId: course.id,
    teacherName: ["ครูแนน", "ครูบอล", "ครูฝน", "ครูเจ", "ครูต้น", "ครูมิ้นท์"][i],
    dayOfWeek: [6, 6, 0, 3, 5, 2][i],
    startTime: ["10:00", "13:00", "14:00", "17:00", "10:30", "18:00"][i],
    endTime: ["11:00", "14:00", "15:00", "18:00", "11:30", "19:00"][i],
    room: `ห้อง ${i + 1}`,
    maxStudents: 6,
  }));
  const insertedSchedules = await db.insert(schema.schedules).values(scheduleValues).returning();

  // ---------- Enrollment + Payment + Progress ----------
  const [enrollment] = await db.insert(schema.enrollments).values({
    userId: demoStudent.id,
    courseId: insertedCourses[0].id,
    scheduleId: insertedSchedules[0].id,
    status: "confirmed",
    note: "ลงทะเบียนทดสอบระบบ",
  }).returning();

  await db.insert(schema.payments).values({
    userId: demoStudent.id,
    enrollmentId: enrollment.id,
    invoiceNo: "INV-2569-0001",
    amount: insertedCourses[0].price,
    method: "bank_transfer",
    status: "paid",
    paidAt: new Date(),
  });

  await db.insert(schema.progressRecords).values({
    userId: demoStudent.id,
    courseId: insertedCourses[0].id,
    term: "เทอม 1/2569",
    score: 88,
    skillLevel: "เกรด 1 (พื้นฐาน)",
    teacherComment: "อ่านโน้ตได้คล่องขึ้นมาก ฝึกจังหวะเพิ่มอีกนิดจะดีมาก",
  });

  // ---------- Articles ----------
  await db.insert(schema.articles).values([
    {
      title: "เปิดรับสมัครคอร์สฤดูร้อน 2569",
      slug: "summer-course-2569",
      excerpt: "คอร์สเข้มข้น 4 สัปดาห์ สำหรับทุกเครื่องดนตรี รับจำนวนจำกัด",
      content: "My Studio เปิดรับสมัครคอร์สฤดูร้อนประจำปี 2569 แล้ววันนี้ เรียนเข้มข้น 4 สัปดาห์ ทุกเครื่องดนตรี ทุกสาขา จำนวนที่นั่งจำกัด สมัครและชำระเงินภายในสิ้นเดือนนี้ รับส่วนลดพิเศษ 10%",
      coverImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1200",
      branchId: null,
      authorId: admin.id,
      published: true,
    },
    {
      title: "คอนเสิร์ตนักเรียนประจำปี สาขาสยาม",
      slug: "annual-recital-siam",
      excerpt: "ชมการแสดงของนักเรียนทุกระดับ วันเสาร์ที่ 4 ตุลาคม",
      content: "ขอเชิญผู้ปกครองและผู้สนใจทุกท่านร่วมชมคอนเสิร์ตนักเรียนประจำปีของสาขาสยาม วันเสาร์ที่ 4 ตุลาคม เวลา 18:00 น. เข้าชมฟรี",
      coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200",
      branchId: siam.id,
      authorId: admin.id,
      published: true,
    },
    {
      title: "เคล็ดลับฝึกซ้อมที่บ้านให้ได้ผลจริง",
      slug: "practice-tips-at-home",
      excerpt: "5 วิธีฝึกซ้อมดนตรีที่บ้านให้มีประสิทธิภาพ แม้มีเวลาจำกัด",
      content: "การฝึกซ้อมสม่ำเสมอสำคัญกว่าการซ้อมนานๆ ครั้งเดียว บทความนี้รวบรวมเคล็ดลับจากครูผู้สอนของ My Studio เพื่อช่วยให้นักเรียนฝึกซ้อมที่บ้านได้อย่างมีประสิทธิภาพ แม้จะมีเวลาแค่วันละ 15-20 นาที",
      coverImage: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1200",
      branchId: null,
      authorId: admin.id,
      published: true,
    },
  ]);

  console.log("✅ Seed complete.");
  console.log("   Admin:   admin@mystudio.example / admin1234");
  console.log("   Student: student@mystudio.example / student1234");
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
