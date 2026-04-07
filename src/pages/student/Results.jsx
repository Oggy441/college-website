import PageHeader from '../../components/common/PageHeader';
import { demoResults } from '../../data/demoData';

const Results = () => {
 const gradeColor = (grade) => {
  if (grade.startsWith('A')) return '#9DD8B7';
  if (grade.startsWith('B')) return '#D1BFD9';
  if (grade === 'C') return '#D4B896';
  if (grade === 'D') return '#E4A8A8';
  return '#D98E8E';
 };

 const avgMarks = Math.round(demoResults.reduce((sum, r) => sum + r.marks, 0) / demoResults.length);
 const passCount = demoResults.filter(r => r.result === 'Pass').length;

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Examination Results" subtitle="View all your exam scores and grades" />

   {/* Summary strip */}
   <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
    {[
     { label: 'Total Exams', value: demoResults.length, color: '#9B8EC7' },
     { label: 'Average Score', value: `${avgMarks}%`, color: '#B4D3D9' },
     { label: 'Passed', value: passCount, color: '#7EC8A0' },
     { label: 'Failed', value: demoResults.length - passCount, color: '#D98E8E' },
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
      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: s.color }}>{s.value}</span>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</span>
     </div>
    ))}
   </div>

   {/* Results Table */}
   <div className="glass-card" style={{ padding: '20px 24px', overflow: 'auto' }}>
    <table className="data-table">
     <thead>
      <tr>
       <th>#</th>
       <th>Subject</th>
       <th>Exam Type</th>
       <th>Marks</th>
       <th>Grade</th>
       <th>Result</th>
      </tr>
     </thead>
     <tbody>
      {demoResults.map((r, i) => (
       <tr key={r.id}>
        <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.subject}</td>
        <td>
         <span className="badge badge-info">{r.examType}</span>
        </td>
        <td>
         <span style={{ fontWeight: 600 }}>{r.marks}</span>
         <span style={{ color: 'var(--text-muted)' }}>/{r.maxMarks}</span>
        </td>
        <td style={{ fontWeight: 700, color: gradeColor(r.grade), fontSize: '1rem' }}>
         {r.grade}
        </td>
        <td>
         <span className={`badge ${r.result === 'Pass' ? 'badge-success' : 'badge-danger'}`}>
          {r.result}
         </span>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default Results;
