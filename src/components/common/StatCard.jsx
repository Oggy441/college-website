const StatCard = ({ title, value, subtitle, icon: Icon, color = '#9B8EC7', trend, trendUp }) => {
  return (
    <div
      className="glass-card glass-card-hover stat-card-glow animate-fade-in"
      style={{
        padding: '20px 24px',
        '--glow-color': color,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${color}, ${color}66)`,
        borderRadius: '16px 16px 0 0',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            {title}
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {value}
          </p>
          {subtitle && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '8px',
              padding: '2px 8px',
              borderRadius: '6px',
              background: trendUp ? 'rgba(126, 200, 160, 0.1)' : 'rgba(217, 142, 142, 0.1)',
              color: trendUp ? '#7EC8A0' : '#D98E8E',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}>
              {trendUp ? '↑' : '↓'} {trend}
            </div>
          )}
        </div>
        {Icon && (
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: `${color}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
          }}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
