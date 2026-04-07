import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HiOutlineClipboardDocumentList, HiOutlineBookOpen, HiOutlineCurrencyRupee, HiOutlineCalendarDays, HiOutlineMegaphone } from 'react-icons/hi2';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { useStudents, useSubjects, useAnnouncements } from '../../hooks/useFirestore';
import { demoAttendance, demoResults, demoTimetable } from '../../data/demoData';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data: students } = useStudents();
  const { data: announcements } = useAnnouncements();

  // For a logged-in student, find their own record
  const myRecord = students.find(
    (s) => s.rollNo === user?.rollNo || s.name === user?.name
  );

  const attendanceData = Object.entries(demoAttendance).map(([, v]) => ({
    subject: v.subjectName.length > 8 ? v.subjectName.slice(0, 8) + '…' : v.subjectName,
    fullName: v.subjectName,
    percentage: v.percentage,
  }));

  const avgAttendance = Math.round(
    Object.values(demoAttendance).reduce((sum, v) => sum + v.percentage, 0) /
      Object.keys(demoAttendance).length
  );

  const recentResults = demoResults.slice(0, 4);
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayClasses = demoTimetable[dayNames[today.getDay()]] || demoTimetable['Monday'];
  const latestAnnouncements = announcements.slice(0, 3);

  const feeDue = myRecord?.feeDue ?? 0;

  const getBarColor = (pct) => {
    if (pct >= 85) return '#7EC8A0';
    if (pct >= 75) return '#BDA6CE';
    return '#D98E8E';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(var(--border-rgb), 0.4)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '0.8rem',
        }}>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.fullName}</p>
          <p style={{ color: getBarColor(d.percentage) }}>{d.percentage}% Attendance</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Student'}! 👋`}
        subtitle="Here's your academic overview"
      />

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px',
      }}>
        <StatCard title="Attendance" value={`${avgAttendance}%`} subtitle="Overall average" icon={HiOutlineClipboardDocumentList} color="#9B8EC7" trend="+2.3% this month" trendUp={true} />
        <StatCard title="Enrolled Subjects" value={myRecord?.enrolledSubjects?.length ?? 5} subtitle="Current semester" icon={HiOutlineBookOpen} color="#B4D3D9" />
        <StatCard title="Pending Fees" value={feeDue > 0 ? `₹${(feeDue / 1000).toFixed(0)}K` : '₹0'} subtitle={feeDue > 0 ? 'Payment due' : 'All clear!'} icon={HiOutlineCurrencyRupee} color={feeDue > 0 ? '#D98E8E' : '#7EC8A0'} />
        <StatCard title="Next Exam" value="Apr 15" subtitle="Mid-Term Mathematics" icon={HiOutlineCalendarDays} color="#BDA6CE" />
      </div>

      <div className="dashboard-grid-2col" style={{ marginBottom: '24px' }}>
        {/* Attendance Chart */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
            📊 Subject-wise Attendance
          </h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-rgb), 0.2)" />
                <XAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={{ stroke: 'rgba(71,85,105,0.3)' }} />
                <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={{ stroke: 'rgba(71,85,105,0.3)' }} />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {attendanceData.map((item, i) => (
                    <Cell key={i} fill={getBarColor(item.percentage)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Results */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            🎓 Recent Results
          </h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.subject}</td>
                  <td>{r.marks}/{r.maxMarks}</td>
                  <td style={{ fontWeight: 600, color: r.grade.startsWith('A') ? '#9DD8B7' : r.grade === 'F' ? '#E4A8A8' : '#D1BFD9' }}>
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

      <div className="dashboard-grid-equal">
        {/* Today's Timetable */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            📅 Today's Schedule — {dayNames[today.getDay()]}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todayClasses.map((slot, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(var(--bg-app-rgb), 0.4)',
                border: '1px solid rgba(var(--border-rgb), 0.15)',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B8EC7', minWidth: '90px', fontFamily: 'monospace' }}>
                  {slot.time}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{slot.subject}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Room: {slot.room}</div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? '#7EC8A0' : '#3a3245' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineMegaphone size={18} /> Latest Announcements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {latestAnnouncements.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No announcements yet.</p>
            )}
            {latestAnnouncements.map((a) => (
              <div key={a.id} style={{
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(var(--bg-app-rgb), 0.4)',
                border: '1px solid rgba(var(--border-rgb), 0.15)',
                borderLeft: '3px solid #9B8EC7',
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {a.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {a.body?.slice(0, 100)}...
                </div>
                <div style={{ fontSize: '0.65rem', color: '#5e554d', marginTop: '6px' }}>
                  {a.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
