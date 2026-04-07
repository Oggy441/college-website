import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { demoStudents, demoSubjects, calculateGrade, calculateResult } from '../../data/demoData';
import toast from 'react-hot-toast';

const UploadResults = () => {
 const subjects = demoSubjects.filter(s => s.teacherId === 'demo-teacher');
 const [selectedSubject, setSelectedSubject] = useState('');
 const [examType, setExamType] = useState('Mid-Term');
 const [maxMarks, setMaxMarks] = useState(100);
 const [passMarks, setPassMarks] = useState(40);
 const [entries, setEntries] = useState([]);
 const [loaded, setLoaded] = useState(false);

 const loadStudents = () => {
  const sectionStudents = demoStudents.filter(s => s.section === 'A');
  setEntries(sectionStudents.map(s => ({
   studentId: s.id,
   name: s.name,
   rollNo: s.rollNo,
   marks: '',
   grade: '-',
   result: '-',
   remarks: '',
  })));
  setLoaded(true);
 };

 const updateMarks = (idx, marks) => {
  const m = parseInt(marks) || 0;
  const grade = m > 0 ? calculateGrade(m, maxMarks) : '-';
  const result = m > 0 ? calculateResult(m, passMarks) : '-';
  setEntries(prev => prev.map((e, i) => i === idx ? { ...e, marks, grade, result } : e));
 };

 const filledEntries = entries.filter(e => e.marks && parseInt(e.marks) > 0);
 const avgMarks = filledEntries.length > 0 ? Math.round(filledEntries.reduce((s, e) => s + parseInt(e.marks), 0) / filledEntries.length) : 0;
 const highest = filledEntries.length > 0 ? Math.max(...filledEntries.map(e => parseInt(e.marks))) : 0;
 const lowest = filledEntries.length > 0 ? Math.min(...filledEntries.map(e => parseInt(e.marks))) : 0;

 const handlePublish = () => {
  if (!selectedSubject) {
   toast.error('Please select a subject');
   return;
  }
  if (filledEntries.length === 0) {
   toast.error('Please enter marks for at least one student');
   return;
  }
  toast.success('Results published successfully!');
  console.log('Results:', { subject: selectedSubject, examType, maxMarks, passMarks, entries: filledEntries });
 };

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Upload Results" subtitle="Enter and publish examination results" />

   {/* Config */}
   <div className="glass-card" style={{ padding: '20px 24px', marginBottom: '20px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', alignItems: 'end' }}>
     <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Subject</label>
      <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
       <option value="">Select Subject</option>
       {subjects.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
      </select>
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Exam Type</label>
      <select value={examType} onChange={(e) => setExamType(e.target.value)}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
       <option value="Mid-Term">Mid-Term</option>
       <option value="Final">Final</option>
       <option value="Test">Test</option>
      </select>
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Max Marks</label>
      <input type="number" value={maxMarks} onChange={(e) => setMaxMarks(parseInt(e.target.value) || 100)}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Pass Marks</label>
      <input type="number" value={passMarks} onChange={(e) => setPassMarks(parseInt(e.target.value) || 40)}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
     </div>
     <button className="btn btn-primary" onClick={loadStudents} style={{ height: '42px' }}>Load Students</button>
    </div>
   </div>

   {loaded && (
    <>
     {/* Stats Strip */}
     <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
      {[
       { label: 'Students', value: entries.length, color: '#9B8EC7' },
       { label: 'Class Avg', value: avgMarks, color: '#B4D3D9' },
       { label: 'Highest', value: highest, color: '#7EC8A0' },
       { label: 'Lowest', value: lowest, color: '#D98E8E' },
      ].map((s, i) => (
       <div key={i} style={{
        padding: '10px 20px', borderRadius: '10px', background: `${s.color}11`,
        border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', gap: '10px',
       }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: s.color }}>{s.value}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.label}</span>
       </div>
      ))}
     </div>

     {/* Results Table */}
     <div className="glass-card" style={{ padding: '0', overflow: 'auto' }}>
      <table className="data-table">
       <thead>
        <tr>
         <th>#</th>
         <th>Roll No</th>
         <th>Name</th>
         <th>Marks ({maxMarks})</th>
         <th>Grade</th>
         <th>Result</th>
         <th>Remarks</th>
        </tr>
       </thead>
       <tbody>
        {entries.map((e, i) => (
         <tr key={e.studentId}>
          <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
          <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#BDA6CE' }}>{e.rollNo}</td>
          <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.name}</td>
          <td>
           <input
            type="number"
            min="0"
            max={maxMarks}
            value={e.marks}
            onChange={(ev) => updateMarks(i, ev.target.value)}
            style={{
             width: '70px', padding: '6px 10px', borderRadius: '6px',
             border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)',
             color: 'var(--text-primary)', fontSize: '0.85rem', textAlign: 'center',
            }}
           />
          </td>
          <td style={{
           fontWeight: 700, fontSize: '0.95rem',
           color: e.grade === '-' ? 'var(--text-muted)' : e.grade.startsWith('A') ? '#9DD8B7' : e.grade === 'F' ? '#E4A8A8' : '#D1BFD9',
          }}>
           {e.grade}
          </td>
          <td>
           {e.result!== '-' && (
            <span className={`badge ${e.result === 'Pass' ? 'badge-success' : 'badge-danger'}`}>{e.result}</span>
           )}
          </td>
          <td>
           <input
            type="text"
            placeholder="Note..."
            value={e.remarks}
            onChange={(ev) => setEntries(prev => prev.map((en, idx) => idx === i ? { ...en, remarks: ev.target.value } : en))}
            style={{
             padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(var(--border-rgb), 0.3)',
             background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.8rem', width: '120px',
            }}
           />
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>

     <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
      <button className="btn btn-primary" onClick={handlePublish} id="publish-results">
        Publish Results
      </button>
     </div>
    </>
   )}
  </div>
 );
};

export default UploadResults;
