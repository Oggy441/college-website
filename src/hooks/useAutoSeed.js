/**
 * Auto-seeds Firestore with sample data on first launch.
 * Runs once: checks if 'students' collection is empty, and if so, calls seedDatabase().
 */
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { seedDatabase } from '../firebase/seed';

const useAutoSeed = () => {
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (seeded || seeding) return;

    const checkAndSeed = async () => {
      try {
        setSeeding(true);
        // Check if database is empty quickly via a limited query
        const q = query(collection(db, 'students'), limit(1));
        const snap = await getDocs(q);
        
        if (snap.empty) {
          console.log('[AutoSeed] Database is empty — seeding automatically...');
          await seedDatabase();
          console.log('[AutoSeed] Done! You can now log in.');
        } else {
          console.log('[AutoSeed] Database is already populated. Skipping.');
        }
      } catch (err) {
        console.warn('[AutoSeed] Error:', err.message);
      } finally {
        setSeeding(false);
        setSeeded(true);
      }
    };

    checkAndSeed();
  }, [seeded, seeding]);

  return { seeding };
};

export default useAutoSeed;
