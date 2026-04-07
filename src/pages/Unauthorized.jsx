import { Link } from 'react-router-dom';
import { HiOutlineShieldExclamation } from 'react-icons/hi2';

const Unauthorized = () => (
 <div style={{
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
 }}>
  <div style={{ textAlign: 'center' }}>
   <div style={{
    width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
   }}>
    <HiOutlineShieldExclamation size={40} color="#D98E8E" />
   </div>
   <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Access Denied</h2>
   <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '400px' }}>
    You don't have permission to access this page. Please contact your administrator.
   </p>
   <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>← Back to Login</Link>
  </div>
 </div>
);

export default Unauthorized;
