/**
 * Reusable Firebase data hooks.
 * Each hook returns { data, loading, error } and falls back to
 * static demoData when the user is in demo-mode (uid starts with "demo-").
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getStudents,
  getSubjects,
  getSubjectsByTeacher,
  getAnnouncements,
  subscribeAnnouncements,
  getUsers,
  getTeachers,
  getAttendanceRecords,
  getResults,
} from '../firebase/firestore';
import {
  demoStudents,
  demoSubjects,
  demoAttendance,
  demoResults,
  demoAnnouncements,
  demoTeachers,
  demoUsers,
} from '../data/demoData';

const isDemo = (uid) => uid && uid.startsWith('demo-');

/* ── Students ── */
export const useStudents = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo(user.uid)) {
      setData(demoStudents);
      setLoading(false);
      return;
    }
    getStudents()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  return { data, loading, error };
};

/* ── All Subjects ── */
export const useSubjects = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo(user.uid)) {
      setData(demoSubjects);
      setLoading(false);
      return;
    }
    getSubjects()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  return { data, loading, error };
};

/* ── Subjects for logged-in teacher ── */
export const useMySubjects = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo(user.uid)) {
      setData(demoSubjects.filter((s) => s.teacherId === 'demo-teacher'));
      setLoading(false);
      return;
    }
    getSubjectsByTeacher(user.uid)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  return { data, loading, error };
};

/* ── Announcements (real-time) ── */
export const useAnnouncements = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo(user.uid)) {
      setData(demoAnnouncements);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = subscribeAnnouncements((docs) => {
      setData(docs);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  return { data, loading, error };
};

/* ── Teachers (from users collection) ── */
export const useTeachers = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo(user.uid)) {
      setData(demoTeachers);
      setLoading(false);
      return;
    }
    getTeachers()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  return { data, loading, error };
};

/* ── All Users (admin) ── */
export const useUsers = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (isDemo(user.uid)) {
      setData(demoUsers);
      setLoading(false);
      return;
    }
    getUsers()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  return { data, loading, error };
};

/* ── Attendance for a subject ── */
export const useAttendance = (subjectId) => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !subjectId) return;
    if (isDemo(user.uid)) {
      setData([]);
      setLoading(false);
      return;
    }
    getAttendanceRecords(subjectId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user, subjectId]);

  return { data, loading, error };
};

/* ── Results for a subject ── */
export const useResults = (subjectId) => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !subjectId) return;
    if (isDemo(user.uid)) {
      setData([]);
      setLoading(false);
      return;
    }
    getResults(subjectId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user, subjectId]);

  return { data, loading, error };
};
