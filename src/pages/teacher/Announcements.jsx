import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import { useAnnouncements } from '../../hooks/useFirestore';
import { addAnnouncement } from '../../firebase/firestore';
import { HiOutlinePlusCircle, HiOutlineMegaphone } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const TeacherAnnouncements = () => {
  const { user } = useAuth();
  const { data: announcements, loading } = useAnnouncements();
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', targetRole: 'student' });

  const isDemo = user?.uid?.startsWith('demo-');

  const handlePost = async () => {
    if (!form.title || !form.body) {
      toast.error('Title and body are required');
      return;
    }
    setSaving(true);
    try {
      if (isDemo) {
        toast.success('Announcement posted! (demo mode — not saved to DB)');
      } else {
        await addAnnouncement({
          ...form,
          postedBy: user?.name || 'Teacher',
        });
        toast.success('Announcement posted!');
      }
      setShowModal(false);
      setForm({ title: '', body: '', targetRole: 'student' });
    } catch (err) {
      toast.error('Failed to post: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (ts) => {
    try {
      if (ts?.toDate) return ts.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      if (ts instanceof Date) return ts.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return 'Recently';
    } catch { return 'Recently'; }
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid rgba(var(--border-rgb), 0.3)',
    background: 'rgba(var(--bg-app-rgb), 0.5)',
    color: 'var(--text-primary)', fontSize: '0.85rem',
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader
        title="Announcements"
        subtitle="Post and manage your announcements"
        actions={
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <HiOutlinePlusCircle size={18} /> New Announcement
          </button>
        }
      />

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading...</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {!loading && announcements.length === 0 && (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <HiOutlineMegaphone size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No announcements yet.</p>
          </div>
        )}
        {announcements.map((a) => (
          <div key={a.id} className="glass-card glass-card-hover" style={{
            padding: '20px 24px',
            borderLeft: `3px solid ${a.targetRole === 'student' ? '#9B8EC7' : a.targetRole === 'teacher' ? '#B4D3D9' : '#7EC8A0'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</h3>
              <span className={`badge ${a.targetRole === 'all' ? 'badge-success' : 'badge-info'}`}>
                {a.targetRole === 'all' ? 'Everyone' : a.targetRole}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '10px' }}>{a.body}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#5e554d' }}>
              <span>By: {a.postedBy}</span>
              <span>{formatDate(a.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Post Announcement">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
              style={inputStyle} placeholder="Announcement title" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Body</label>
            <textarea value={form.body} onChange={(e) => setForm(p => ({ ...p, body: e.target.value }))}
              rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Write your announcement..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Target Audience</label>
            <select value={form.targetRole} onChange={(e) => setForm(p => ({ ...p, targetRole: e.target.value }))} style={inputStyle}>
              <option value="all">Everyone</option>
              <option value="student">Students Only</option>
              <option value="teacher">Teachers Only</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handlePost} disabled={saving} style={{ marginTop: '8px' }}>
            {saving ? 'Posting…' : 'Post Announcement'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherAnnouncements;
