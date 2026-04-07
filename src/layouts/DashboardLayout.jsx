import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import useAutoSeed from '../hooks/useAutoSeed';

const DashboardLayout = () => {
  const { seeding } = useAutoSeed();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', minHeight: '100vh' }}>
        {seeding && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'var(--bg-card)',
            border: '1px solid rgba(155, 142, 199, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            <div className="spinner" style={{ width: '14px', height: '14px' }} />
            Setting up your database…
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
