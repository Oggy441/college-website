import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import { demoAnnouncements } from '../../data/demoData';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const TeacherAnnouncements = () => {
 const { user } = useAuth();
 const [announcements, setAnnouncements] = useState(demoAnnouncements);
 const [showModal, setShowModal] = useState(false);
 const [form, setForm] = useState({ title: '', body: '', targetRole: 'student' });

 const handlePost = () => {
  if (!form.title ||!form.body) {
   toast.error('Title and body are required');
   return;
  }
  const newAnn = {
   id: `a${Date.now()}`,
   ...form,
   postedBy: user?.name || 'Teacher',
   createdAt: { toDate: () => new Date() },
  };
  setAnnouncements([newAnn, ...announcements]);
  setShowModal(false);
  setForm({ title: '', body: '', targetRole: 'student' });
  toast.success('Announcement posted!');
 };

 const myAnnouncements = announcements.filter(a =>
  a.postedBy === user?.name || a.postedBy === 'Dr. Meena Verma'
 );

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

   <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
    {myAnnouncements.length === 0 && (
     <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No announcements yet. Click "New Announcement" to post one.</p>
     </div>
    )}
    {myAnnouncements.map((a) => (
     <div key={a.id} className="glass-card glass-card-hover" style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
       <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</h3>
       <span className={`badge ${a.targetRole === 'all' ? 'badge-info' : a.targetRole === 'student' ? 'badge-success' : 'badge-warning'}`}>
        {a.targetRole === 'all' ? 'Everyone' : a.targetRole}
       </span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '10px' }}>{a.body}</p>
      <div style={{ fontSize: '0.7rem', color: '#5e554d' }}>
        {a.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
      </div>
     </div>
    ))}
   </div>

   <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Post Announcement">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
     <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Title</label>
      <input
       type="text"
       value={form.title}
       onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
       placeholder="Announcement title"
      />
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Body</label>
      <textarea
       value={form.body}
       onChange={(e) => setForm(prev => ({ ...prev, body: e.target.value }))}
       rows={4}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem', resize: 'vertical' }}
       placeholder="Write your announcement..."
      />
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Target Audience</label>
      <select
       value={form.targetRole}
       onChange={(e) => setForm(prev => ({ ...prev, targetRole: e.target.value }))}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
      >
       <option value="all">Everyone</option>
       <option value="student">Students Only</option>
       <option value="teacher">Teachers Only</option>
      </select>
     </div>
     <button className="btn btn-primary" onClick={handlePost} style={{ marginTop: '8px' }}>
       Post Announcement
     </button>
    </div>
   </Modal>
  </div>
 );
};

export default TeacherAnnouncements;
