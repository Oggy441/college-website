import PageHeader from '../../components/common/PageHeader';
import { demoTimetable } from '../../data/demoData';

const dayColors = {
 Monday: '#9B8EC7',
 Tuesday: '#B4D3D9',
 Wednesday: '#7EC8A0',
 Thursday: '#BDA6CE',
 Friday: '#D98E8E',
};

const Timetable = () => {
 const days = Object.entries(demoTimetable);
 const today = new Date();
 const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const todayName = dayNames[today.getDay()];

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader
    title="Weekly Timetable"
    subtitle="Your class schedule for the current week"
    actions={
     <button
      className="btn btn-secondary"
      onClick={() => window.print()}
     >
      ️ Print Schedule
     </button>
    }
   />

   <div style={{ display: 'grid', gap: '16px' }}>
    {days.map(([day, slots]) => (
     <div
      key={day}
      className="glass-card"
      style={{
       padding: '18px 24px',
       borderLeft: `4px solid ${dayColors[day]}`,
       background: day === todayName ? 'rgba(99, 102, 241, 0.08)' : undefined,
      }}
     >
      <div style={{
       display: 'flex',
       alignItems: 'center',
       gap: '12px',
       marginBottom: '14px',
      }}>
       <h3 style={{
        fontSize: '1rem',
        fontWeight: 700,
        color: dayColors[day],
       }}>
        {day}
       </h3>
       {day === todayName && (
        <span style={{
         padding: '2px 10px',
         borderRadius: '6px',
         background: 'rgba(99, 102, 241, 0.15)',
         color: '#BDA6CE',
         fontSize: '0.7rem',
         fontWeight: 600,
        }}>
         Today
        </span>
       )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
       {slots.map((slot, i) => (
        <div key={i} style={{
         display: 'flex',
         alignItems: 'center',
         gap: '12px',
         padding: '10px 14px',
         borderRadius: '10px',
         background: 'rgba(var(--bg-app-rgb), 0.4)',
         border: '1px solid rgba(var(--border-rgb), 0.15)',
        }}>
         <div style={{
          width: '4px',
          height: '36px',
          borderRadius: '2px',
          background: dayColors[day],
          flexShrink: 0,
         }} />
         <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, color: dayColors[day], fontFamily: 'monospace' }}>
           {slot.time}
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{slot.subject}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{slot.room}</div>
         </div>
        </div>
       ))}
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default Timetable;
