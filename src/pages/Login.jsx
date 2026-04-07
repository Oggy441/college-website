import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../firebase/auth';
import { HiOutlineAcademicCap, HiOutlineUserCircle, HiOutlineBriefcase, HiOutlineShieldCheck } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import useAutoSeed from '../hooks/useAutoSeed';

const roles = [
 { key: 'student', label: 'Student', icon: HiOutlineUserCircle, color: '#9B8EC7', gradient: 'linear-gradient(135deg, #9B8EC7, #8577B5)' },
 { key: 'teacher', label: 'Teacher', icon: HiOutlineBriefcase, color: '#B4D3D9', gradient: 'linear-gradient(135deg, #B4D3D9, #96C1CA)' },
 { key: 'admin', label: 'Admin', icon: HiOutlineShieldCheck, color: '#BDA6CE', gradient: 'linear-gradient(135deg, #BDA6CE, #A88DBC)' },
];

const defaultEmails = {
 student: 'student@college.edu',
 teacher: 'teacher@college.edu',
 admin: 'admin@college.edu',
};

const Login = () => {
 const [selectedRole, setSelectedRole] = useState('student');
 const [email, setEmail] = useState(defaultEmails.student);
 const [password, setPassword] = useState('Test@1234');
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const { demoLogin } = useAuth();
 const { seeding } = useAutoSeed();

 const handleRoleChange = (role) => {
  setSelectedRole(role);
  setEmail(defaultEmails[role]);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
   const user = await loginUser(email, password);
   toast.success(`Welcome, ${user.name}!`);
   navigate(`/${user.role}/dashboard`);
  } catch (err) {
   console.error('Firebase login failed:', err);
   toast.error('Login failed: ' + err.message);
  } finally {
   setLoading(false);
  }
 };

 const handleDemoLogin = (role) => {
  demoLogin(role);
  toast.success(`Demo mode — Welcome as ${role}!`);
  navigate(`/${role}/dashboard`);
 };

 const activeRole = roles.find(r => r.key === selectedRole);

 return (
  <div style={{
   minHeight: '100vh',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '20px',
   background: 'var(--bg-gradient)',
   position: 'relative',
   overflow: 'hidden',
  }}>
   {/* Background orbs */}
   <div style={{
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(155, 142, 199, 0.15) 0%, transparent 70%)',
    top: '-100px',
    right: '-100px',
    pointerEvents: 'none',
   }} />
   <div style={{
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(180, 211, 217, 0.1) 0%, transparent 70%)',
    bottom: '-50px',
    left: '-50px',
    pointerEvents: 'none',
   }} />

   <div className="animate-fade-in" style={{ width: '100%', maxWidth: '420px' }}>
    {/* Logo */}
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
     <div style={{
      width: '64px',
      height: '64px',
      borderRadius: '16px',
      background: activeRole.gradient,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      boxShadow: `0 8px 32px ${activeRole.color}44`,
      transition: 'all 0.3s ease',
     }}>
      <HiOutlineAcademicCap size={32} color="white" />
     </div>
     <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
      College Management System
     </h1>
     <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Sign in to your portal</p>
    </div>

    {/* Card */}
    <div className="glass-card" style={{ padding: '28px' }}>
     {/* Role tabs */}
     <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      background: 'rgba(var(--bg-app-rgb), 0.5)',
      borderRadius: '12px',
      padding: '4px',
     }}>
      {roles.map((r) => (
       <button
        key={r.key}
        id={`role-tab-${r.key}`}
        onClick={() => handleRoleChange(r.key)}
        style={{
         flex: 1,
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         gap: '6px',
         padding: '10px 8px',
         borderRadius: '10px',
         border: 'none',
         fontSize: '0.8rem',
         fontWeight: selectedRole === r.key ? 700 : 500,
         color: selectedRole === r.key ? 'white' : 'var(--text-secondary)',
         background: selectedRole === r.key ? r.gradient : 'transparent',
         cursor: 'pointer',
         transition: 'all 0.25s ease',
         boxShadow: selectedRole === r.key ? `0 4px 12px ${r.color}44` : 'none',
        }}
       >
        <r.icon size={16} />
        {r.label}
       </button>
      ))}
     </div>

     {/* Form */}
     <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
       <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
        Email Address
       </label>
       <input
        id="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
         width: '100%',
         padding: '10px 14px',
         borderRadius: '10px',
         border: '1px solid rgba(var(--border-rgb), 0.3)',
         background: 'rgba(var(--bg-app-rgb), 0.5)',
         color: 'var(--text-primary)',
         fontSize: '0.875rem',
        }}
        placeholder="Enter your email"
       />
      </div>

      <div style={{ marginBottom: '24px' }}>
       <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
        Password
       </label>
       <input
        id="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
         width: '100%',
         padding: '10px 14px',
         borderRadius: '10px',
         border: '1px solid rgba(var(--border-rgb), 0.3)',
         background: 'rgba(var(--bg-app-rgb), 0.5)',
         color: 'var(--text-primary)',
         fontSize: '0.875rem',
        }}
        placeholder="Enter your password"
       />
      </div>

      <button
       id="login-submit"
       type="submit"
       disabled={loading || seeding}
       style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        border: 'none',
        background: activeRole.gradient,
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: 700,
        cursor: loading || seeding ? 'not-allowed' : 'pointer',
        opacity: loading || seeding ? 0.7 : 1,
        transition: 'all 0.2s ease',
        boxShadow: `0 4px 15px ${activeRole.color}33`,
       }}
      >
       {(loading || seeding) ? 'Please wait...' : `Sign in as ${activeRole.label}`}
      </button>
     </form>

     {/* Divider */}
     <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: '20px 0',
     }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(var(--border-rgb), 0.3)' }} />
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick Demo Access</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(var(--border-rgb), 0.3)' }} />
     </div>

     {/* Demo buttons */}
     <div style={{ display: 'flex', gap: '8px' }}>
      {roles.map((r) => (
       <button
        key={r.key}
        id={`demo-${r.key}`}
        onClick={() => handleDemoLogin(r.key)}
        style={{
         flex: 1,
         padding: '8px',
         borderRadius: '8px',
         border: `1px solid ${r.color}33`,
         background: `${r.color}11`,
         color: r.color,
         fontSize: '0.75rem',
         fontWeight: 600,
         cursor: 'pointer',
         transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
         e.currentTarget.style.background = `${r.color}22`;
         e.currentTarget.style.borderColor = `${r.color}55`;
        }}
        onMouseLeave={(e) => {
         e.currentTarget.style.background = `${r.color}11`;
         e.currentTarget.style.borderColor = `${r.color}33`;
        }}
       >
        {r.label}
       </button>
      ))}
     </div>
    </div>

    {/* Footer */}
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
     <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
      Default credentials: student / teacher / admin @college.edu • Test@1234
     </p>
     {seeding && (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#7EC8A0', background: 'rgba(126, 200, 160, 0.1)', padding: '6px 12px', borderRadius: '12px' }}>
        <div className="spinner" style={{ width: '12px', height: '12px', borderColor: 'rgba(126, 200, 160, 0.3)', borderTopColor: '#7EC8A0' }} />
        Provisioning database...
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default Login;
