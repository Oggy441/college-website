const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '28px',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      <div>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: '#f1f5f9',
          marginBottom: '4px',
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{subtitle}</p>
        )}
      </div>
      {actions && <div style={{ display: 'flex', gap: '10px' }}>{actions}</div>}
    </div>
  );
};

export default PageHeader;
