import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useStudents } from '../../hooks/useFirestore';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const AdminStudents = () => {
  const { data: students, loading } = useStudents();
  const [search, setSearch] = useState('');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo?.toLowerCase().includes(search.toLowerCase())
  );

  const feeColor = { paid: '#7EC8A0', pending: '#BDA6CE', overdue: '#D98E8E' };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader title="All Students" subtitle="View and search all enrolled students" />

      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <HiOutlineMagnifyingGlass size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '360px', padding: '10px 14px 10px 40px',
              borderRadius: '10px', border: '1px solid rgba(var(--border-rgb), 0.3)',
              background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.875rem',
            }}
          />
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing {filtered.length} of {students.length}
        </span>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'auto' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading students…</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th><th>Name</th><th>Department</th><th>Section</th><th>CGPA</th><th>Fee Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#BDA6CE' }}>{s.rollNo}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                  <td>{s.dept}</td>
                  <td>{s.section}</td>
                  <td style={{ fontWeight: 600, color: s.cgpa >= 8 ? '#9DD8B7' : s.cgpa >= 6 ? '#D1BFD9' : '#E4A8A8' }}>
                    {s.cgpa}
                  </td>
                  <td>
                    <span style={{
                      padding: '3px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600,
                      background: `${feeColor[s.feeStatus] || '#9B8EC7'}18`,
                      color: feeColor[s.feeStatus] || '#9B8EC7',
                      textTransform: 'capitalize',
                    }}>
                      {s.feeStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
