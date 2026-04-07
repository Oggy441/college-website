import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { signOut } from '../firebase/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...data });
            setRole(data.role);
          } else {
            setUser(null);
            setRole(null);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
    setRole(null);
  };

  // For demo mode (when Firebase is not configured)
  const demoLogin = (demoRole) => {
    const demoUsers = {
      student: { uid: 'demo-student', email: 'student@college.edu', name: 'Arjun Singh', role: 'student', dept: 'CSE' },
      teacher: { uid: 'demo-teacher', email: 'teacher@college.edu', name: 'Dr. Meena Verma', role: 'teacher', dept: 'CSE' },
      admin: { uid: 'demo-admin', email: 'admin@college.edu', name: 'Prof. Raghav Iyer', role: 'admin', dept: 'Admin' },
    };
    const u = demoUsers[demoRole];
    setUser(u);
    setRole(u.role);
    setLoading(false);
  };

  const demoLogout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, demoLogin, demoLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
