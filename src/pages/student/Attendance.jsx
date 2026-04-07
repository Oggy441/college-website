import PageHeader from '../../components/common/PageHeader';
import { useAnnouncements } from '../../hooks/useFirestore';
import { demoAttendance } from '../../data/demoData';

const Attendance = () => {
  const subjects = Object.entries(demoAttendance);

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader title="Attendance Report" subtitle="View your subject-wise attendance breakdown" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {subjects.map(([id, data]) => {
          const color = data.percentage >= 85 ? '#7EC8A0' : data.percentage >= 75 ? '#BDA6CE' : '#D98E8E';
          const bgColor = data.percentage >= 85 ? 'rgba(16, 185, 129, 0.1)' : data.percentage >= 75 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)';

          return (
            <div key={id} className="glass-card glass-card-hover" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{data.subjectName}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {data.present} / {data.total} classes attended
                  </p>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: color }}>
                  {data.percentage}%
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                width: '100%', height: '8px', borderRadius: '4px',
                background: 'rgba(var(--border-rgb), 0.2)', overflow: 'hidden', marginBottom: '10px',
              }}>
                <div style={{
                  width: `${data.percentage}%`, height: '100%', borderRadius: '4px',
                  background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                  transition: 'width 1s ease-out',
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  padding: '2px 8px', borderRadius: '6px', background: bgColor,
                  color: color, fontSize: '0.7rem', fontWeight: 600,
                }}>
                  {data.percentage >= 75 ? 'On Track' : 'Low Attendance'}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {data.total - data.present} classes missed
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="glass-card" style={{ padding: '20px 24px', marginTop: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}> Attendance Policy</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { color: '#7EC8A0', label: '≥ 85% — Good Standing' },
            { color: '#BDA6CE', label: '75-84% — Warning Zone' },
            { color: '#D98E8E', label: '< 75% — Detention Risk' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
