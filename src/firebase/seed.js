import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

/**
 * Run this once to seed your Firestore with sample data.
 * Import and call seedDatabase() from a temp button or console.
 */
export const seedDatabase = async () => {
  console.log(' Seeding database...');

  // 1. Create test user accounts
  const accounts = [
    { email: 'student@college.edu', password: 'Test@1234', role: 'student', name: 'Arjun Singh', dept: 'CSE' },
    { email: 'teacher@college.edu', password: 'Test@1234', role: 'teacher', name: 'Dr. Meena Verma', dept: 'CSE' },
    { email: 'admin@college.edu', password: 'Test@1234', role: 'admin', name: 'Prof. Raghav Iyer', dept: 'Admin' },
  ];

  const userIds = {};
  for (const acc of accounts) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, acc.email, acc.password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: acc.name,
        email: acc.email,
        role: acc.role,
        dept: acc.dept,
        createdAt: serverTimestamp(),
      });
      userIds[acc.role] = cred.user.uid;
      console.log(` Created ${acc.role}: ${acc.email}`);
    } catch (e) {
      console.warn(`️ ${acc.email} may already exist:`, e.message);
    }
  }

  // 2. Subjects
  const subjects = [
    { name: 'Mathematics', code: 'MATH101', dept: 'CSE', section: 'A', teacherId: userIds.teacher || '' },
    { name: 'Physics', code: 'PHY101', dept: 'CSE', section: 'A', teacherId: userIds.teacher || '' },
    { name: 'CS Fundamentals', code: 'CSF101', dept: 'CSE', section: 'A', teacherId: userIds.teacher || '' },
    { name: 'English', code: 'ENG101', dept: 'CSE', section: 'B', teacherId: '' },
    { name: 'Data Structures', code: 'DSA201', dept: 'CSE', section: 'A', teacherId: userIds.teacher || '' },
    { name: 'DBMS', code: 'DBMS201', dept: 'CSE', section: 'A', teacherId: '' },
  ];

  const subjectIds = [];
  for (const subj of subjects) {
    const ref = await addDoc(collection(db, 'subjects'), subj);
    subjectIds.push(ref.id);
    console.log(` Subject: ${subj.name}`);
  }

  // 3. Students
  const students = [
    { name: 'Arjun Singh', rollNo: '22CS001', dept: 'CSE', section: 'A', cgpa: 8.4, enrolledSubjects: subjectIds.slice(0, 4), feeStatus: 'paid', feeDue: 0 },
    { name: 'Priya Sharma', rollNo: '22CS002', dept: 'CSE', section: 'A', cgpa: 7.9, enrolledSubjects: subjectIds.slice(0, 4), feeStatus: 'pending', feeDue: 25000 },
    { name: 'Rahul Gupta', rollNo: '22CS003', dept: 'CSE', section: 'A', cgpa: 9.1, enrolledSubjects: subjectIds.slice(0, 4), feeStatus: 'paid', feeDue: 0 },
    { name: 'Sneha Patel', rollNo: '22CS004', dept: 'CSE', section: 'A', cgpa: 6.5, enrolledSubjects: subjectIds.slice(0, 3), feeStatus: 'overdue', feeDue: 50000 },
    { name: 'Vikram Reddy', rollNo: '22CS005', dept: 'CSE', section: 'A', cgpa: 8.0, enrolledSubjects: subjectIds.slice(0, 4), feeStatus: 'paid', feeDue: 0 },
    { name: 'Ananya Iyer', rollNo: '22CS006', dept: 'CSE', section: 'B', cgpa: 7.2, enrolledSubjects: subjectIds.slice(1, 5), feeStatus: 'pending', feeDue: 25000 },
    { name: 'Karthik Nair', rollNo: '22CS007', dept: 'CSE', section: 'B', cgpa: 8.8, enrolledSubjects: subjectIds.slice(0, 4), feeStatus: 'paid', feeDue: 0 },
    { name: 'Divya Menon', rollNo: '22CS008', dept: 'CSE', section: 'B', cgpa: 7.5, enrolledSubjects: subjectIds.slice(0, 3), feeStatus: 'paid', feeDue: 0 },
    { name: 'Aditya Kumar', rollNo: '22CS009', dept: 'CSE', section: 'A', cgpa: 6.8, enrolledSubjects: subjectIds.slice(0, 4), feeStatus: 'overdue', feeDue: 50000 },
    { name: 'Meera Joshi', rollNo: '22CS010', dept: 'CSE', section: 'A', cgpa: 9.3, enrolledSubjects: subjectIds.slice(0, 5), feeStatus: 'paid', feeDue: 0 },
  ];

  const studentIds = [];
  for (const stu of students) {
    const ref = await addDoc(collection(db, 'students'), stu);
    studentIds.push(ref.id);
    console.log(` Student: ${stu.name}`);
  }

  // 4. Attendance records
  const today = new Date();
  for (let i = 0; i < 3; i++) {
    const subjectId = subjectIds[i];
    for (let d = 1; d <= 5; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - d);
      const dateStr = date.toISOString().split('T')[0];
      const entries = studentIds.map(sid => ({
        studentId: sid,
        status: Math.random() > 0.15 ? 'P' : (Math.random() > 0.5 ? 'A' : 'L'),
        reason: '',
      }));
      await setDoc(doc(db, 'attendance', subjectId, 'records', dateStr), {
        date: dateStr,
        teacherId: userIds.teacher || '',
        entries,
        createdAt: serverTimestamp(),
      });
    }
  }
  console.log(' Attendance records seeded');

  // 5. Results
  const grades = (marks, max) => {
    const pct = (marks / max) * 100;
    if (pct >= 90) return { grade: 'A+', result: 'Pass' };
    if (pct >= 80) return { grade: 'A', result: 'Pass' };
    if (pct >= 70) return { grade: 'B+', result: 'Pass' };
    if (pct >= 60) return { grade: 'B', result: 'Pass' };
    if (pct >= 50) return { grade: 'C', result: 'Pass' };
    if (pct >= 40) return { grade: 'D', result: 'Pass' };
    return { grade: 'F', result: 'Fail' };
  };

  for (let i = 0; i < 3; i++) {
    const subjectId = subjectIds[i];
    const maxMarks = 100;
    const passMarks = 40;
    const entries = studentIds.map(sid => {
      const marks = Math.floor(Math.random() * 60) + 40;
      const { grade, result } = grades(marks, maxMarks);
      return { studentId: sid, marks, grade, result, remarks: '' };
    });
    await setDoc(doc(db, 'results', subjectId, 'exams', 'midterm-2026'), {
      examType: 'Mid-Term',
      maxMarks,
      passMarks,
      entries,
      createdAt: serverTimestamp(),
    });
  }
  console.log(' Results seeded');

  // 6. Announcements
  const announcements = [
    { title: 'Mid-Term Examinations Schedule Released', body: 'The mid-term examination schedule for all departments has been published. Please check the notice board for your exam timetable.', postedBy: 'admin', targetRole: 'all' },
    { title: 'Library Extended Hours During Exams', body: 'The central library will remain open until 10 PM during the examination period (April 10-20).', postedBy: 'admin', targetRole: 'student' },
    { title: 'Faculty Meeting — April 15', body: 'All faculty members are requested to attend the quarterly review meeting at 3 PM in the Conference Hall.', postedBy: 'admin', targetRole: 'teacher' },
    { title: 'Sports Day Registration Open', body: 'Annual Sports Day registrations are now open. Submit your entries by April 12.', postedBy: userIds.teacher || 'teacher', targetRole: 'student' },
    { title: 'Assignment Submission Deadline Extended', body: 'The deadline for CSF101 Assignment 3 has been extended to April 14.', postedBy: userIds.teacher || 'teacher', targetRole: 'student' },
  ];

  for (const ann of announcements) {
    await addDoc(collection(db, 'announcements'), {
      ...ann,
      createdAt: serverTimestamp(),
    });
  }
  console.log(' Announcements seeded');

  // 7. Timetable
  const timetableSchedule = {
    Monday: [
      { time: '09:00 - 10:00', subject: 'Mathematics', teacherId: userIds.teacher || '', room: 'R-101' },
      { time: '10:00 - 11:00', subject: 'Physics', teacherId: userIds.teacher || '', room: 'R-102' },
      { time: '11:15 - 12:15', subject: 'CS Fundamentals', teacherId: userIds.teacher || '', room: 'Lab-1' },
      { time: '01:00 - 02:00', subject: 'English', teacherId: '', room: 'R-201' },
    ],
    Tuesday: [
      { time: '09:00 - 10:00', subject: 'Data Structures', teacherId: userIds.teacher || '', room: 'Lab-2' },
      { time: '10:00 - 11:00', subject: 'Mathematics', teacherId: userIds.teacher || '', room: 'R-101' },
      { time: '11:15 - 12:15', subject: 'Physics', teacherId: userIds.teacher || '', room: 'R-102' },
      { time: '01:00 - 02:00', subject: 'DBMS', teacherId: '', room: 'Lab-1' },
    ],
    Wednesday: [
      { time: '09:00 - 10:00', subject: 'English', teacherId: '', room: 'R-201' },
      { time: '10:00 - 11:00', subject: 'CS Fundamentals', teacherId: userIds.teacher || '', room: 'Lab-1' },
      { time: '11:15 - 12:15', subject: 'Data Structures', teacherId: userIds.teacher || '', room: 'Lab-2' },
      { time: '01:00 - 02:00', subject: 'Mathematics', teacherId: userIds.teacher || '', room: 'R-101' },
    ],
    Thursday: [
      { time: '09:00 - 10:00', subject: 'DBMS', teacherId: '', room: 'Lab-1' },
      { time: '10:00 - 11:00', subject: 'Physics', teacherId: userIds.teacher || '', room: 'R-102' },
      { time: '11:15 - 12:15', subject: 'Mathematics', teacherId: userIds.teacher || '', room: 'R-101' },
      { time: '01:00 - 02:00', subject: 'CS Fundamentals', teacherId: userIds.teacher || '', room: 'Lab-1' },
    ],
    Friday: [
      { time: '09:00 - 10:00', subject: 'Data Structures', teacherId: userIds.teacher || '', room: 'Lab-2' },
      { time: '10:00 - 11:00', subject: 'DBMS', teacherId: '', room: 'Lab-1' },
      { time: '11:15 - 12:15', subject: 'English', teacherId: '', room: 'R-201' },
      { time: '01:00 - 02:00', subject: 'Physics', teacherId: userIds.teacher || '', room: 'R-102' },
    ],
  };

  await setDoc(doc(db, 'timetable', 'CSE'), {
    A: { schedule: timetableSchedule },
  });
  console.log(' Timetable seeded');

  console.log(' Database seeded successfully!');
};
