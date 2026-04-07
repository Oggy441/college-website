import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useStudents, useMySubjects } from '../../hooks/useFirestore';
import { saveAttendance } from '../../firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const MarkAttendance = () => {
 const { user } = useAuth();
 const { data: students } = useStudents();
 const { data: subjects } = useMySubjects();
 const [selectedSubject, setSelectedSubject] = useState('');
 const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
 const [selectedSection, setSelectedSection] = useState('A');
 const [loaded, setLoaded] = useState(false);
 const [entries, setEntries] = useState([]);

 const loadStudents = () => {
  const sectionStudents = students.filter(s => s.section === selectedSection);
  setEntries(sectionStudents.map(s => ({
   studentId: s.id,
   name: s.name,
   rollNo: s.rollNo,
   status: 'P',
   reason: '',
  })));
  setLoaded(true);
 };

 const toggleStatus = (idx, status) => {
  setEntries(prev => prev.map((e, i) => i === idx ? { ...e, status } : e));
 };

 const markAllPresent = () => {
  setEntries(prev => prev.map(e => ({ ...e, status: 'P', reason: '' })));
  toast.success('All students marked present');
 };

 const handleSubmit = async () => {
  if (!selectedSubject) {
   toast.error('Please select a subject');
   return;
  }
  try {
   await saveAttendance(selectedSubject, selectedDate, user?.uid, entries);
   toast.success(`Attendance saved for ${selectedDate}`);
  } catch (err) {
   toast.error('Failed to save attendance: ' + err.message);
  }
 };

 const counts = {
  P: entries.filter(e => e.status === 'P').length,
  A: entries.filter(e => e.status === 'A').length,
  L: entries.filter(e => e.status === 'L').length,
 };

 const statusColors = {
  P: { bg: '#7EC8A0', text: 'white' },
  A: { bg: '#D98E8E', text: 'white' },
  L: { bg: '#BDA6CE', text: 'white' },
 };

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Mark Attendance" subtitle="Record student attendance for your classes" />

   {/* Selectors */}
   <div className="glass-card" style={{ padding: '20px 24px', marginBottom: '20px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', alignItems: 'end' }}>
     <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Subject</label>
      <select
       value={selectedSubject}
       onChange={(e) => setSelectedSubject(e.target.value)}
       id="attendance-subject"
       style={{
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(var(--border-rgb), 0.3)',
        background: 'rgba(var(--bg-app-rgb), 0.5)',
        color: 'var(--text-primary)',
        fontSize: '0.85rem',
       }}
      >
       <option value="">Select Subject</option>
       {subjects.map(s => (
        <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
       ))}
      </select>
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Date</label>
      <input
       type="date"
       value={selectedDate}
       onChange={(e) => setSelectedDate(e.target.value)}
       style={{
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(var(--border-rgb), 0.3)',
        background: 'rgba(var(--bg-app-rgb), 0.5)',
        color: 'var(--text-primary)',
        fontSize: '0.85rem',
       }}
      />
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Section</label>
      <select
       value={selectedSection}
       onChange={(e) => setSelectedSection(e.target.value)}
       style={{
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(var(--border-rgb), 0.3)',
        background: 'rgba(var(--bg-app-rgb), 0.5)',
        color: 'var(--text-primary)',
        fontSize: '0.85rem',
       }}
      >
       <option value="A">Section A</option>
       <option value="B">Section B</option>
      </select>
     </div>
     <button className="btn btn-primary" onClick={loadStudents} style={{ height: '42px' }}>
      Load Students
     </button>
    </div>
   </div>

   {loaded && (
    <>
     {/* Summary Strip */}
     <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
      {[
       { label: 'Present', count: counts.P, color: '#7EC8A0' },
       { label: 'Absent', count: counts.A, color: '#D98E8E' },
       { label: 'Late', count: counts.L, color: '#BDA6CE' },
       { label: 'Total', count: entries.length, color: '#9B8EC7' },
      ].map((s, i) => (
       <div key={i} style={{
        padding: '10px 20px',
        borderRadius: '10px',
        background: `${s.color}11`,
        border: `1px solid ${s.color}33`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
       }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: s.color }}>{s.count}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.label}</span>
       </div>
      ))}
      <button className="btn btn-success" onClick={markAllPresent} style={{ marginLeft: 'auto' }}>
        Mark All Present
      </button>
     </div>

     {/* Attendance Table */}
     <div className="glass-card" style={{ padding: '0', overflow: 'auto' }}>
      <table className="data-table">
       <thead>
        <tr>
         <th>#</th>
         <th>Roll No</th>
         <th>Name</th>
         <th>Status</th>
         <th>Reason</th>
        </tr>
       </thead>
       <tbody>
        {entries.map((e, i) => (
         <tr key={e.studentId}>
          <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
          <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#BDA6CE' }}>{e.rollNo}</td>
          <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.name}</td>
          <td>
           <div style={{ display: 'flex', gap: '6px' }}>
            {['P', 'A', 'L'].map((st) => (
             <button
              key={st}
              onClick={() => toggleStatus(i, st)}
              style={{
               width: '32px',
               height: '32px',
               borderRadius: '8px',
               border: e.status === st ? 'none' : '1px solid rgba(var(--border-rgb), 0.3)',
               background: e.status === st ? statusColors[st].bg : 'transparent',
               color: e.status === st ? statusColors[st].text : 'var(--text-secondary)',
               fontWeight: 700,
               fontSize: '0.75rem',
               cursor: 'pointer',
               transition: 'all 0.15s ease',
              }}
             >
              {st}
             </button>
            ))}
           </div>
          </td>
          <td>
           {e.status!== 'P' && (
            <input
             type="text"
             placeholder="Reason..."
             value={e.reason}
             onChange={(ev) => {
              const newEntries = [...entries];
              newEntries[i].reason = ev.target.value;
              setEntries(newEntries);
             }}
             style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(var(--border-rgb), 0.3)',
              background: 'rgba(var(--bg-app-rgb), 0.5)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              width: '160px',
             }}
            />
           )}
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>

     <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'flex-end' }}>
      <button className="btn btn-secondary" onClick={() => toast('Draft saved!', { icon: '' })}>
       Save Draft
      </button>
      <button className="btn btn-primary" onClick={handleSubmit} id="submit-attendance">
       Submit Attendance
      </button>
     </div>
    </>
   )}
  </div>
 );
};

export default MarkAttendance;
