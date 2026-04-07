import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import { demoStudents } from '../../data/demoData';

const Reports = () => {
 const attendanceByDept = [
  { dept: 'CSE', attendance: 84, students: 35 },
  { dept: 'ECE', attendance: 79, students: 28 },
  { dept: 'EEE', attendance: 81, students: 22 },
  { dept: 'ME', attendance: 77, students: 30 },
 ];

 const feeStatus = [
  { name: 'Paid', value: demoStudents.filter(s => s.feeStatus === 'paid').length, color: '#7EC8A0' },
  { name: 'Pending', value: demoStudents.filter(s => s.feeStatus === 'pending').length, color: '#BDA6CE' },
  { name: 'Overdue', value: demoStudents.filter(s => s.feeStatus === 'overdue').length, color: '#D98E8E' },
 ];

 const resultsSummary = [
  { grade: 'A+ / A', count: 15, color: '#7EC8A0' },
  { grade: 'B+ / B', count: 22, color: '#B4D3D9' },
  { grade: 'C', count: 10, color: '#BDA6CE' },
  { grade: 'D', count: 5, color: '#D4B896' },
  { grade: 'F', count: 3, color: '#D98E8E' },
 ];

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Reports & Analytics" subtitle="College-wide attendance, results, and fee reports" />

   <div className="dashboard-grid-equal" style={{ marginBottom: '24px' }}>
    {/* Attendance by Dept */}
    <div className="glass-card" style={{ padding: '20px 24px' }}>
     <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}> Attendance by Department</h3>
     <div style={{ height: '280px' }}>
      <ResponsiveContainer width="100%" height="100%">
       <BarChart data={attendanceByDept}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-rgb), 0.2)" />
        <XAxis dataKey="dept" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
        <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--border-rgb), 0.4)', borderRadius: '8px' }} />
        <Bar dataKey="attendance" fill="#9B8EC7" radius={[6, 6, 0, 0]} name="Attendance %" />
       </BarChart>
      </ResponsiveContainer>
     </div>
    </div>

    {/* Fee Status Pie */}
    <div className="glass-card" style={{ padding: '20px 24px' }}>
     <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}> Fee Collection Status</h3>
     <div style={{ height: '280px' }}>
      <ResponsiveContainer width="100%" height="100%">
       <PieChart>
        <Pie data={feeStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" labelLine={false}>
         {feeStatus.map((entry, i) => (
          <Cell key={i} fill={entry.color} stroke="transparent" />
         ))}
        </Pie>
        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--border-rgb), 0.4)', borderRadius: '8px' }} />
        <Legend formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{value}</span>} />
       </PieChart>
      </ResponsiveContainer>
     </div>
    </div>
   </div>

   {/* Results Summary */}
   <div className="glass-card" style={{ padding: '20px 24px' }}>
    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}> Mid-Term Results Summary</h3>
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
     {resultsSummary.map((r, i) => (
      <div key={i} style={{
       flex: 1, minWidth: '120px', padding: '16px', borderRadius: '12px',
       background: `${r.color}08`, border: `1px solid ${r.color}22`, textAlign: 'center',
      }}>
       <div style={{ fontSize: '1.5rem', fontWeight: 800, color: r.color }}>{r.count}</div>
       <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Grade {r.grade}</div>
       <div style={{
        width: '100%', height: '4px', borderRadius: '2px', background: `${r.color}22`, marginTop: '10px',
       }}>
        <div style={{
         width: `${(r.count / 55) * 100}%`, height: '100%', borderRadius: '2px', background: r.color,
        }} />
       </div>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};

export default Reports;
