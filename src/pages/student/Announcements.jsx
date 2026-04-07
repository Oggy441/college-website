import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useAnnouncements } from '../../hooks/useFirestore';
import { useAuth } from '../../context/AuthContext';
import { addAnnouncement } from '../../firebase/firestore';
import toast from 'react-hot-toast';
import { HiOutlineMegaphone, HiOutlinePlusCircle } from 'react-icons/hi2';

const StudentAnnouncements = () => {
  const { data: announcements, loading } = useAnnouncements();
  const { user } = useAuth();

  const formatDate = (ts) => {
    try {
      if (ts?.toDate) return ts.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      if (ts instanceof Date) return ts.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return 'Recently';
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader title="Announcements" subtitle="Stay updated with the latest college news" />

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Loading announcements...
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {!loading && announcements.length === 0 && (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <HiOutlineMegaphone size={40} style={{ marginBottom: '12px', opacity: 0.4 }} />
            <p>No announcements yet.</p>
          </div>
        )}

        {announcements.map((a) => (
          <div key={a.id} className="glass-card glass-card-hover" style={{
            padding: '20px 24px',
            borderLeft: `3px solid ${a.targetRole === 'student' ? '#9B8EC7' : a.targetRole === 'teacher' ? '#B4D3D9' : '#7EC8A0'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</h3>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginLeft: '12px' }}>
                <span className={`badge ${a.targetRole === 'all' ? 'badge-success' : 'badge-info'}`}>
                  {a.targetRole === 'all' ? 'Everyone' : a.targetRole}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '10px' }}>
              {a.body}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span>Posted by: {a.postedBy}</span>
              <span>{formatDate(a.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAnnouncements;
