import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// ---- Students ----
export const getStudents = async () => {
  const snap = await getDocs(collection(db, 'students'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getStudent = async (id) => {
  const snap = await getDoc(doc(db, 'students', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const addStudent = async (data) => {
  const ref = await addDoc(collection(db, 'students'), data);
  return ref.id;
};

export const updateStudent = async (id, data) => {
  await updateDoc(doc(db, 'students', id), data);
};

export const deleteStudent = async (id) => {
  await deleteDoc(doc(db, 'students', id));
};

// ---- Subjects ----
export const getSubjects = async () => {
  const snap = await getDocs(collection(db, 'subjects'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getSubjectsByTeacher = async (teacherId) => {
  const q = query(collection(db, 'subjects'), where('teacherId', '==', teacherId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ---- Attendance ----
export const saveAttendance = async (subjectId, date, teacherId, entries) => {
  await setDoc(doc(db, 'attendance', subjectId, 'records', date), {
    date,
    teacherId,
    entries,
    createdAt: serverTimestamp(),
  });
};

export const getAttendanceRecords = async (subjectId) => {
  const snap = await getDocs(collection(db, 'attendance', subjectId, 'records'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ---- Results ----
export const saveResults = async (subjectId, examId, examData) => {
  await setDoc(doc(db, 'results', subjectId, 'exams', examId), {
    ...examData,
    createdAt: serverTimestamp(),
  });
};

export const getResults = async (subjectId) => {
  const snap = await getDocs(collection(db, 'results', subjectId, 'exams'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ---- Announcements ----
export const addAnnouncement = async (data) => {
  await addDoc(collection(db, 'announcements'), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getAnnouncements = async () => {
  const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const subscribeAnnouncements = (callback) => {
  const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

// ---- Timetable ----
export const getTimetable = async (dept, section) => {
  const snap = await getDoc(doc(db, 'timetable', dept, section, 'schedule'));
  return snap.exists() ? snap.data() : null;
};

// ---- Users ----
export const getUsers = async () => {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateUserRole = async (uid, role) => {
  await updateDoc(doc(db, 'users', uid), { role });
};

// ---- Teachers ----
export const getTeachers = async () => {
  const q = query(collection(db, 'users'), where('role', '==', 'teacher'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
