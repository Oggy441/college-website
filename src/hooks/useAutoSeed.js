/**
 * Auto-seeds Firestore with sample data on first launch.
 * Runs once: checks if 'students' collection is empty, and if so, calls seedDatabase().
 */
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { seedDatabase } from '../firebase/seed';
import { useAuth } from '../context/AuthContext';

const isDemo = (uid) => uid && uid.startsWith('demo-');

const useAutoSeed = () => {
  const { user } = useAuth();
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (!user || isDemo(user.uid) || seeded) return;

    const checkAndSeed = async () => {
      try {
        const snap = await getDocs(collection(db, 'students'));
        if (snap.empty) {
          console.log('[AutoSeed] Database is empty — seeding...');
          setSeeding(true);
          await seedDatabase();
          console.log('[AutoSeed] Done!');
        }
      } catch (err) {
        console.warn('[AutoSeed] Error:', err.message);
      } finally {
        setSeeding(false);
        setSeeded(true);
      }
    };

    checkAndSeed();
  }, [user, seeded]);

  return { seeding };
};

export default useAutoSeed;
