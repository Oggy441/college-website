import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
