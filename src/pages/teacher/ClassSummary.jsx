import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import { HiOutlineUserGroup, HiOutlineChartBarSquare, HiOutlineBookOpen, HiOutlineAcademicCap } from 'react-icons/hi2';
import { demoStudents, demoSubjects, demoAttendance } from '../../data/demoData';

const ClassSummary = () => {
 const sectionA = demoStudents.filter(s => s.section === 'A');
 const sectionB = demoStudents.filter(s => s.section === 'B');
 const avgCgpa = (demoStudents.reduce((sum, s) => sum + s.cgpa, 0) / demoStudents.length).toFixed(1);

 const subjectData = Object.entries(demoAttendance).map(([, v]) => ({
  subject: v.subjectName.length > 10 ? v.subjectName.slice(0, 10) + '…' : v.subjectName,
  attendance: v.percentage,
 }));

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Class Summary" subtitle="Overview of your assigned classes and students" />

   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
    <StatCard title="Total Students" value={demoStudents.length} icon={HiOutlineUserGroup} color="#9B8EC7" />
    <StatCard title="Avg Attendance" value="84%" icon={HiOutlineChartBarSquare} color="#B4D3D9" />
    <StatCard title="Avg CGPA" value={avgCgpa} icon={HiOutlineAcademicCap} color="#7EC8A0" />
    <StatCard title="Subjects" value={demoSubjects.filter(s => s.teacherId === 'demo-teacher').length} icon={HiOutlineBookOpen} color="#BDA6CE" />
   </div>

   <div className="dashboard-grid-equal">
    {/* Attendance Chart */}
    <div className="glass-card" style={{ padding: '20px 24px' }}>
     <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
       Subject-wise Avg Attendance
     </h3>
     <div style={{ height: '250px' }}>
      <ResponsiveContainer width="100%" height="100%">
       <BarChart data={subjectData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-rgb), 0.2)" />
        <XAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
        <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--border-rgb), 0.4)', borderRadius: '8px' }} />
        <Bar dataKey="attendance" fill="#B4D3D9" radius={[6, 6, 0, 0]} maxBarSize={40} />
       </BarChart>
      </ResponsiveContainer>
     </div>
    </div>

    {/* Section Breakdown */}
    <div className="glass-card" style={{ padding: '20px 24px' }}>
     <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}> Section Breakdown</h3>
     {[
      { label: 'Section A', students: sectionA, color: '#9B8EC7' },
      { label: 'Section B', students: sectionB, color: '#B4D3D9' },
     ].map((sec) => (
      <div key={sec.label} style={{
       padding: '14px 16px',
       borderRadius: '10px',
       background: `${sec.color}08`,
       border: `1px solid ${sec.color}22`,
       marginBottom: '12px',
      }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: sec.color }}>{sec.label}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{sec.students.length} students</span>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        <div style={{ textAlign: 'center' }}>
         <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {(sec.students.reduce((s, st) => s + st.cgpa, 0) / sec.students.length).toFixed(1)}
         </div>
         <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Avg CGPA</div>
        </div>
        <div style={{ textAlign: 'center' }}>
         <div style={{ fontSize: '1rem', fontWeight: 700, color: '#7EC8A0' }}>
          {sec.students.filter(s => s.feeStatus === 'paid').length}
         </div>
         <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Fees Paid</div>
        </div>
        <div style={{ textAlign: 'center' }}>
         <div style={{ fontSize: '1rem', fontWeight: 700, color: '#D98E8E' }}>
          {sec.students.filter(s => s.feeStatus === 'overdue').length}
         </div>
         <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Overdue</div>
        </div>
       </div>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};

export default ClassSummary;
