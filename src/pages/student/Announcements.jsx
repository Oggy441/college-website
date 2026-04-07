import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { demoAnnouncements } from '../../data/demoData';

const Announcements = () => {
 const [filter, setFilter] = useState('all');
 const announcements = demoAnnouncements.filter(a => filter === 'all' || a.targetRole === filter || a.targetRole === 'all');

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Announcements" subtitle="Stay updated with the latest college news" />

   {/* Filters */}
   <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
    {['all', 'student', 'teacher'].map((f) => (
     <button
      key={f}
      onClick={() => setFilter(f)}
      style={{
       padding: '8px 16px',
       borderRadius: '8px',
       border: filter === f ? '1px solid #9B8EC7' : '1px solid rgba(var(--border-rgb), 0.3)',
       background: filter === f ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
       color: filter === f ? '#BDA6CE' : 'var(--text-secondary)',
       fontSize: '0.8rem',
       fontWeight: 600,
       cursor: 'pointer',
       textTransform: 'capitalize',
       transition: 'all 0.2s ease',
      }}
     >
      {f === 'all' ? 'All' : `${f}s Only`}
     </button>
    ))}
   </div>

   <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
    {announcements.map((a, i) => (
     <div
      key={a.id}
      className="glass-card glass-card-hover"
      style={{
       padding: '20px 24px',
       animationDelay: `${i * 0.05}s`,
      }}
     >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
       <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</h3>
       <span className={`badge ${a.targetRole === 'all' ? 'badge-info' : a.targetRole === 'student' ? 'badge-success' : 'badge-warning'}`}>
        {a.targetRole === 'all' ? 'Everyone' : a.targetRole}
       </span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '10px' }}>
       {a.body}
      </p>
      <div style={{ display: 'flex', gap: '12px', fontSize: '0.7rem', color: '#5e554d' }}>
       <span> Posted by: {a.postedBy}</span>
       <span> {a.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}</span>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default Announcements;
