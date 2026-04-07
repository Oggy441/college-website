import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiOutlineUserGroup, HiOutlineClipboardDocumentList, HiOutlineBookOpen, HiOutlineCalendarDays } from 'react-icons/hi2';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { useStudents, useMySubjects, useAnnouncements } from '../../hooks/useFirestore';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { data: students, loading: loadingStudents } = useStudents();
  const { data: mySubjects, loading: loadingSubjects } = useMySubjects();
  const { data: announcements } = useAnnouncements();

  const studentsInClass = students.filter(s => s.section === 'A');
  const avgCgpa = studentsInClass.length
    ? (studentsInClass.reduce((sum, s) => sum + (s.cgpa || 0), 0) / studentsInClass.length).toFixed(1)
    : '—';

  const barData = mySubjects.map(s => ({
    subject: s.name.length > 10 ? s.name.slice(0, 10) + '…' : s.name,
    students: studentsInClass.filter(st => st.enrolledSubjects?.includes(s.id)).length || studentsInClass.length,
  }));

  const latestAnnouncements = announcements.slice(0, 2);

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader
        title={`Hello, ${user?.name?.split(' ').pop() || 'Professor'}! 👋`}
        subtitle="Your class overview at a glance"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard title="Total Students" value={loadingStudents ? '…' : studentsInClass.length} subtitle="Section A" icon={HiOutlineUserGroup} color="#9B8EC7" />
        <StatCard title="Avg Attendance" value="84%" subtitle="Across subjects" icon={HiOutlineClipboardDocumentList} color="#B4D3D9" trend="+1.5%" trendUp />
        <StatCard title="Subjects Assigned" value={loadingSubjects ? '…' : mySubjects.length} subtitle="Current semester" icon={HiOutlineBookOpen} color="#7EC8A0" />
        <StatCard title="Upcoming Exam" value="Apr 15" subtitle="Mathematics Mid-Term" icon={HiOutlineCalendarDays} color="#BDA6CE" />
      </div>

      <div className="dashboard-grid-2col">
        {/* Chart */}
        <div className="glass-card" style={{ padding: '20px 24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
            📊 Students Enrolled Per Subject
          </h3>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-rgb), 0.2)" />
                <XAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <Tooltip cursor={{ fill: 'transparent' }}
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(var(--border-rgb), 0.4)', borderRadius: '8px', fontSize: '0.8rem' }}
                  labelStyle={{ color: 'var(--text-primary)' }} />
                <Bar dataKey="students" fill="#9B8EC7" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* My Subjects */}
          <div className="glass-card" style={{ padding: '18px 22px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>📚 My Subjects</h4>
            {loadingSubjects ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Loading…</p>
            ) : mySubjects.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No subjects assigned yet.</p>
            ) : (
              mySubjects.map((s) => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(var(--border-rgb), 0.15)' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '8px' }}>{s.code}</span>
                  </div>
                  <span className="badge badge-info">Section {s.section}</span>
                </div>
              ))
            )}
          </div>

          {/* Recent Announcements */}
          <div className="glass-card" style={{ padding: '18px 22px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>📢 Recent Announcements</h4>
            {latestAnnouncements.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No announcements.</p>
            ) : (
              latestAnnouncements.map((a) => (
                <div key={a.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(var(--border-rgb), 0.15)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{a.body?.slice(0, 60)}...</div>
                </div>
              ))
            )}
          </div>

          <div className="glass-card" style={{ padding: '18px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class Avg. CGPA</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#9DD8B7' }}>{avgCgpa}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
