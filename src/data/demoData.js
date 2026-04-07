// Demo data used when Firebase is not connected
// This allows the app to run and demonstrate all features without a backend

export const demoStudents = [
  { id: 's1', name: 'Arjun Singh', rollNo: '22CS001', dept: 'CSE', section: 'A', cgpa: 8.4, enrolledSubjects: ['sub1', 'sub2', 'sub3', 'sub4'], feeStatus: 'paid', feeDue: 0 },
  { id: 's2', name: 'Priya Sharma', rollNo: '22CS002', dept: 'CSE', section: 'A', cgpa: 7.9, enrolledSubjects: ['sub1', 'sub2', 'sub3', 'sub4'], feeStatus: 'pending', feeDue: 25000 },
  { id: 's3', name: 'Rahul Gupta', rollNo: '22CS003', dept: 'CSE', section: 'A', cgpa: 9.1, enrolledSubjects: ['sub1', 'sub2', 'sub3', 'sub4'], feeStatus: 'paid', feeDue: 0 },
  { id: 's4', name: 'Sneha Patel', rollNo: '22CS004', dept: 'CSE', section: 'A', cgpa: 6.5, enrolledSubjects: ['sub1', 'sub2', 'sub3'], feeStatus: 'overdue', feeDue: 50000 },
  { id: 's5', name: 'Vikram Reddy', rollNo: '22CS005', dept: 'CSE', section: 'A', cgpa: 8.0, enrolledSubjects: ['sub1', 'sub2', 'sub3', 'sub4'], feeStatus: 'paid', feeDue: 0 },
  { id: 's6', name: 'Ananya Iyer', rollNo: '22CS006', dept: 'CSE', section: 'B', cgpa: 7.2, enrolledSubjects: ['sub2', 'sub3', 'sub4', 'sub5'], feeStatus: 'pending', feeDue: 25000 },
  { id: 's7', name: 'Karthik Nair', rollNo: '22CS007', dept: 'CSE', section: 'B', cgpa: 8.8, enrolledSubjects: ['sub1', 'sub2', 'sub3', 'sub4'], feeStatus: 'paid', feeDue: 0 },
  { id: 's8', name: 'Divya Menon', rollNo: '22CS008', dept: 'CSE', section: 'B', cgpa: 7.5, enrolledSubjects: ['sub1', 'sub2', 'sub3'], feeStatus: 'paid', feeDue: 0 },
  { id: 's9', name: 'Aditya Kumar', rollNo: '22CS009', dept: 'CSE', section: 'A', cgpa: 6.8, enrolledSubjects: ['sub1', 'sub2', 'sub3', 'sub4'], feeStatus: 'overdue', feeDue: 50000 },
  { id: 's10', name: 'Meera Joshi', rollNo: '22CS010', dept: 'CSE', section: 'A', cgpa: 9.3, enrolledSubjects: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'], feeStatus: 'paid', feeDue: 0 },
];

export const demoSubjects = [
  { id: 'sub1', name: 'Mathematics', code: 'MATH101', dept: 'CSE', section: 'A', teacherId: 'demo-teacher' },
  { id: 'sub2', name: 'Physics', code: 'PHY101', dept: 'CSE', section: 'A', teacherId: 'demo-teacher' },
  { id: 'sub3', name: 'CS Fundamentals', code: 'CSF101', dept: 'CSE', section: 'A', teacherId: 'demo-teacher' },
  { id: 'sub4', name: 'English', code: 'ENG101', dept: 'CSE', section: 'B', teacherId: '' },
  { id: 'sub5', name: 'Data Structures', code: 'DSA201', dept: 'CSE', section: 'A', teacherId: 'demo-teacher' },
  { id: 'sub6', name: 'DBMS', code: 'DBMS201', dept: 'CSE', section: 'A', teacherId: '' },
];

export const demoAttendance = {
  sub1: { subjectName: 'Mathematics', total: 30, present: 26, percentage: 87 },
  sub2: { subjectName: 'Physics', total: 28, present: 20, percentage: 71 },
  sub3: { subjectName: 'CS Fundamentals', total: 25, present: 23, percentage: 92 },
  sub4: { subjectName: 'English', total: 20, present: 18, percentage: 90 },
  sub5: { subjectName: 'Data Structures', total: 22, present: 15, percentage: 68 },
};

export const demoResults = [
  { id: 'r1', subject: 'Mathematics', examType: 'Mid-Term', marks: 82, maxMarks: 100, grade: 'A', result: 'Pass' },
  { id: 'r2', subject: 'Physics', examType: 'Mid-Term', marks: 65, maxMarks: 100, grade: 'B', result: 'Pass' },
  { id: 'r3', subject: 'CS Fundamentals', examType: 'Mid-Term', marks: 91, maxMarks: 100, grade: 'A+', result: 'Pass' },
  { id: 'r4', subject: 'English', examType: 'Mid-Term', marks: 78, maxMarks: 100, grade: 'B+', result: 'Pass' },
  { id: 'r5', subject: 'Data Structures', examType: 'Test', marks: 35, maxMarks: 100, grade: 'F', result: 'Fail' },
  { id: 'r6', subject: 'Mathematics', examType: 'Final', marks: 88, maxMarks: 100, grade: 'A', result: 'Pass' },
];

export const demoAnnouncements = [
  { id: 'a1', title: 'Mid-Term Examinations Schedule Released', body: 'The mid-term examination schedule for all departments has been published. Please check the notice board for your exam timetable.', postedBy: 'admin', targetRole: 'all', createdAt: { toDate: () => new Date('2026-04-06') } },
  { id: 'a2', title: 'Library Extended Hours During Exams', body: 'The central library will remain open until 10 PM during the examination period (April 10-20).', postedBy: 'admin', targetRole: 'student', createdAt: { toDate: () => new Date('2026-04-05') } },
  { id: 'a3', title: 'Faculty Meeting — April 15', body: 'All faculty members are requested to attend the quarterly review meeting at 3 PM in the Conference Hall.', postedBy: 'admin', targetRole: 'teacher', createdAt: { toDate: () => new Date('2026-04-04') } },
  { id: 'a4', title: 'Sports Day Registration Open', body: 'Annual Sports Day registrations are now open. Submit your entries by April 12.', postedBy: 'Dr. Meena Verma', targetRole: 'student', createdAt: { toDate: () => new Date('2026-04-03') } },
  { id: 'a5', title: 'Assignment Submission Deadline Extended', body: 'The deadline for CSF101 Assignment 3 has been extended to April 14.', postedBy: 'Dr. Meena Verma', targetRole: 'student', createdAt: { toDate: () => new Date('2026-04-02') } },
];

export const demoTimetable = {
  Monday: [
    { time: '09:00 - 10:00', subject: 'Mathematics', room: 'R-101' },
    { time: '10:00 - 11:00', subject: 'Physics', room: 'R-102' },
    { time: '11:15 - 12:15', subject: 'CS Fundamentals', room: 'Lab-1' },
    { time: '01:00 - 02:00', subject: 'English', room: 'R-201' },
  ],
  Tuesday: [
    { time: '09:00 - 10:00', subject: 'Data Structures', room: 'Lab-2' },
    { time: '10:00 - 11:00', subject: 'Mathematics', room: 'R-101' },
    { time: '11:15 - 12:15', subject: 'Physics', room: 'R-102' },
    { time: '01:00 - 02:00', subject: 'DBMS', room: 'Lab-1' },
  ],
  Wednesday: [
    { time: '09:00 - 10:00', subject: 'English', room: 'R-201' },
    { time: '10:00 - 11:00', subject: 'CS Fundamentals', room: 'Lab-1' },
    { time: '11:15 - 12:15', subject: 'Data Structures', room: 'Lab-2' },
    { time: '01:00 - 02:00', subject: 'Mathematics', room: 'R-101' },
  ],
  Thursday: [
    { time: '09:00 - 10:00', subject: 'DBMS', room: 'Lab-1' },
    { time: '10:00 - 11:00', subject: 'Physics', room: 'R-102' },
    { time: '11:15 - 12:15', subject: 'Mathematics', room: 'R-101' },
    { time: '01:00 - 02:00', subject: 'CS Fundamentals', room: 'Lab-1' },
  ],
  Friday: [
    { time: '09:00 - 10:00', subject: 'Data Structures', room: 'Lab-2' },
    { time: '10:00 - 11:00', subject: 'DBMS', room: 'Lab-1' },
    { time: '11:15 - 12:15', subject: 'English', room: 'R-201' },
    { time: '01:00 - 02:00', subject: 'Physics', room: 'R-102' },
  ],
};

export const demoTeachers = [
  { id: 't1', name: 'Dr. Meena Verma', email: 'meena@college.edu', dept: 'CSE', role: 'teacher', subjects: ['Mathematics', 'CS Fundamentals'], studentsCount: 35 },
  { id: 't2', name: 'Prof. Sanjay Kumar', email: 'sanjay@college.edu', dept: 'CSE', role: 'teacher', subjects: ['Physics'], studentsCount: 40 },
  { id: 't3', name: 'Dr. Lakshmi Iyer', email: 'lakshmi@college.edu', dept: 'CSE', role: 'teacher', subjects: ['DBMS', 'Data Structures'], studentsCount: 38 },
  { id: 't4', name: 'Prof. Anil Sharma', email: 'anil@college.edu', dept: 'ECE', role: 'teacher', subjects: ['English'], studentsCount: 45 },
];

export const demoUsers = [
  { id: 'u1', name: 'Arjun Singh', email: 'student@college.edu', role: 'student', dept: 'CSE' },
  { id: 'u2', name: 'Dr. Meena Verma', email: 'teacher@college.edu', role: 'teacher', dept: 'CSE' },
  { id: 'u3', name: 'Prof. Raghav Iyer', email: 'admin@college.edu', role: 'admin', dept: 'Admin' },
  { id: 'u4', name: 'Priya Sharma', email: 'priya@college.edu', role: 'student', dept: 'CSE' },
  { id: 'u5', name: 'Prof. Sanjay Kumar', email: 'sanjay@college.edu', role: 'teacher', dept: 'CSE' },
  { id: 'u6', name: 'Rahul Gupta', email: 'rahul@college.edu', role: 'student', dept: 'CSE' },
];

export const calculateGrade = (marks, maxMarks) => {
  const pct = (marks / maxMarks) * 100;
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 40) return 'D';
  return 'F';
};

export const calculateResult = (marks, passMarks) => {
  return marks >= passMarks ? 'Pass' : 'Fail';
};
