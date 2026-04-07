import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HiOutlineUserGroup, HiOutlineUsers, HiOutlineChartBarSquare, HiOutlineCurrencyRupee } from 'react-icons/hi2';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { useStudents, useTeachers } from '../../hooks/useFirestore';

const AdminDashboard = () => {
  const { data: students, loading: loadingStudents } = useStudents();
  const { data: teachers, loading: loadingTeachers } = useTeachers();

  const feeCollected = students.filter(s => s.feeStatus === 'paid').length * 120000;
  const feePending = students.filter(s => s.feeStatus !== 'paid').reduce((sum, s) => sum + (s.feeDue || 0), 0);

  const deptData = [
    { name: 'CSE', students: students.filter(s => s.dept === 'CSE').length || 35, attendance: 84 },
    { name: 'ECE', students: 28, attendance: 79 },
    { name: 'EEE', students: 22, attendance: 81 },
    { name: 'ME', students: 30, attendance: 77 },
  ];

  const pieData = [
    { name: 'CSE', value: students.filter(s => s.dept === 'CSE').length || 35, color: '#9B8EC7' },
    { name: 'ECE', value: 28, color: '#B4D3D9' },
    { name: 'EEE', value: 22, color: '#7EC8A0' },
    { name: 'ME', value: 30, color: '#BDA6CE' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader title="Admin Dashboard" subtitle="College-wide overview and analytics" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard title="Total Students" value={loadingStudents ? '…' : students.length} subtitle="Across departments" icon={HiOutlineUserGroup} color="#9B8EC7" trend="+12 this sem" trendUp />
        <StatCard title="Total Teachers" value={loadingTeachers ? '…' : teachers.length} icon={HiOutlineUsers} color="#B4D3D9" />
        <StatCard title="Avg Attendance" value="81%" subtitle="College-wide" icon={HiOutlineChartBarSquare} color="#7EC8A0" trend="+3.2%" trendUp />
        <StatCard
          title="Fee Collected"
          value={`₹${(feeCollected / 100000).toFixed(1)}L`}
          subtitle={`₹${(feePending / 1000).toFixed(0)}K pending`}
          icon={HiOutlineCurrencyRupee}
          color="#BDA6CE"
        />
      </div>

      <div className="dashboard-grid-admin" style={{ marginBottom: '24px' }}>
        {/* Dept Attendance Chart */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
            📊 Department-wise Attendance
          </h3>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-rgb), 0.2)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <Tooltip cursor={{ fill: 'transparent' }}
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--border-rgb), 0.4)', borderRadius: '8px', fontSize: '0.8rem' }} />
                <Bar dataKey="attendance" fill="#9B8EC7" radius={[6, 6, 0, 0]} maxBarSize={50} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
            🎓 Student Distribution
          </h3>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" labelLine={false}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--border-rgb), 0.4)', borderRadius: '8px', fontSize: '0.8rem' }} />
                <Legend formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Faculty Overview from Firestore */}
      <div className="glass-card" style={{ padding: '20px 24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
          👩‍🏫 Faculty Overview
        </h3>
        {loadingTeachers ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading faculty…</div>
        ) : (
          <div style={{ overflow: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Department</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{t.email}</td>
                    <td>{t.dept}</td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
