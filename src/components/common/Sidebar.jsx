import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineClipboardDocumentList,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineMegaphone,
  HiOutlineCurrencyRupee,
  HiOutlineUserGroup,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentArrowUp,
  HiOutlineChartPie,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { useState } from 'react';

const roleMenus = {
  student: [
    { path: '/student/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { path: '/student/attendance', label: 'Attendance', icon: HiOutlineClipboardDocumentList },
    { path: '/student/results', label: 'Results', icon: HiOutlineChartBarSquare },
    { path: '/student/timetable', label: 'Timetable', icon: HiOutlineCalendarDays },
    { path: '/student/announcements', label: 'Announcements', icon: HiOutlineMegaphone },
    { path: '/student/fees', label: 'Fees', icon: HiOutlineCurrencyRupee },
  ],
  teacher: [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { path: '/teacher/students', label: 'Students', icon: HiOutlineUserGroup },
    { path: '/teacher/attendance', label: 'Mark Attendance', icon: HiOutlineClipboardDocumentCheck },
    { path: '/teacher/results', label: 'Upload Results', icon: HiOutlineDocumentArrowUp },
    { path: '/teacher/announcements', label: 'Announcements', icon: HiOutlineMegaphone },
    { path: '/teacher/class-summary', label: 'Class Summary', icon: HiOutlineChartPie },
  ],
  admin: [
    { path: '/admin/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { path: '/admin/teachers', label: 'Teachers', icon: HiOutlineUsers },
    { path: '/admin/students', label: 'Students', icon: HiOutlineUserGroup },
    { path: '/admin/roles', label: 'Role Manager', icon: HiOutlineShieldCheck },
    { path: '/admin/reports', label: 'Reports', icon: HiOutlineChartPie },
  ],
};

const roleTitles = {
  student: 'Student Portal',
  teacher: 'Teacher Portal',
  admin: 'Admin Panel',
};

const roleColors = {
  student: '#9B8EC7',
  teacher: '#B4D3D9',
  admin: '#BDA6CE',
};

const Sidebar = () => {
  const { user, role, logout, demoLogout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = roleMenus[role] || [];

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      demoLogout();
    }
    navigate('/login');
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div style={{
        padding: collapsed ? '20px 12px' : '24px 20px',
        borderBottom: '1px solid rgba(78, 69, 96, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: `linear-gradient(135deg, ${roleColors[role]}, ${roleColors[role]}aa)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <HiOutlineAcademicCap size={20} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F2EAE0' }}>CollegeMS</div>
            <div style={{ fontSize: '0.7rem', color: roleColors[role], fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {roleTitles[role]}
            </div>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav style={{ padding: '12px 8px', flex: 1 }}>
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: collapsed ? '12px' : '10px 16px',
              borderRadius: '10px',
              marginBottom: '4px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#F2EAE0' : '#B8AFA5',
              background: isActive ? `${roleColors[role]}22` : 'transparent',
              borderLeft: isActive ? `3px solid ${roleColors[role]}` : '3px solid transparent',
              transition: 'all 0.2s ease',
              justifyContent: collapsed ? 'center' : 'flex-start',
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.background = 'rgba(78, 69, 96, 0.2)';
                e.currentTarget.style.color = '#F2EAE0';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#B8AFA5';
              }
            }}
          >
            <item.icon size={20} />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div style={{
        padding: collapsed ? '16px 12px' : '16px 20px',
        borderTop: '1px solid rgba(78, 69, 96, 0.3)',
      }}>
        {!collapsed && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${roleColors[role]}88, ${roleColors[role]}44)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}>
              {user?.name?.charAt(0) || '?'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F2EAE0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'User'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#7a7068', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || ''}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          id="logout-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '10px 14px',
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(217, 142, 142, 0.1)',
            color: '#D98E8E',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217, 142, 142, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(217, 142, 142, 0.1)'; }}
        >
          <HiOutlineArrowRightOnRectangle size={18} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 60,
          display: 'none',
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          border: '1px solid rgba(78, 69, 96, 0.3)',
          background: 'rgba(36, 30, 44, 0.9)',
          color: '#F2EAE0',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="mobile-menu-btn"
      >
        {mobileOpen ? <HiOutlineXMark size={20} /> : <HiOutlineBars3 size={20} />}
      </button>

      {/* Desktop Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'fixed',
          top: '28px',
          left: collapsed ? '60px' : '236px',
          zIndex: 45,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1px solid rgba(78, 69, 96, 0.4)',
          background: '#241e2c',
          color: '#B8AFA5',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          transition: 'left 0.3s ease',
        }}
        className="collapse-btn"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 39,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: collapsed ? '72px' : '250px',
          background: 'rgba(26, 21, 32, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(78, 69, 96, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease, transform 0.3s ease',
          zIndex: 40,
          overflowX: 'hidden',
        }}
        className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}
      >
        {sidebarContent}
      </aside>

      {/* Spacer */}
      <div style={{ width: collapsed ? '72px' : '250px', flexShrink: 0, transition: 'width 0.3s ease' }} className="sidebar-spacer" />

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .collapse-btn { display: none !important; }
          .sidebar { transform: translateX(-100%); width: 250px !important; }
          .sidebar-open { transform: translateX(0) !important; }
          .sidebar-spacer { width: 0 !important; }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
