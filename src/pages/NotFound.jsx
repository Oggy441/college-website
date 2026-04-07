import { Link } from 'react-router-dom';

const NotFound = () => (
 <div style={{
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
 }}>
  <div style={{ textAlign: 'center' }}>
   <div style={{ fontSize: '6rem', fontWeight: 900, lineHeight: 1, marginBottom: '8px' }} className="gradient-text">404</div>
   <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Page Not Found</h2>
   <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '400px' }}>The page you're looking for doesn't exist or has been moved.</p>
   <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>← Back to Login</Link>
  </div>
 </div>
);

export default NotFound;
