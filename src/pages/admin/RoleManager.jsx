import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { demoUsers } from '../../data/demoData';
import toast from 'react-hot-toast';

const RoleManager = () => {
 const [users, setUsers] = useState(demoUsers);

 const handleRoleChange = (userId, newRole) => {
  setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  toast.success(`Role updated to ${newRole}`);
 };

 const roleColors = { student: '#9B8EC7', teacher: '#B4D3D9', admin: '#BDA6CE' };

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Role Management" subtitle="Manage user roles and permissions" />

   <div className="glass-card" style={{ padding: '0', overflow: 'auto' }}>
    <table className="data-table">
     <thead>
      <tr>
       <th>Name</th>
       <th>Email</th>
       <th>Department</th>
       <th>Current Role</th>
       <th>Change Role</th>
      </tr>
     </thead>
     <tbody>
      {users.map((u) => (
       <tr key={u.id}>
        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</td>
        <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{u.email}</td>
        <td>{u.dept}</td>
        <td>
         <span style={{
          padding: '3px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600,
          background: `${roleColors[u.role]}18`, color: roleColors[u.role], textTransform: 'capitalize',
         }}>
          {u.role}
         </span>
        </td>
        <td>
         <select
          value={u.role}
          onChange={(e) => handleRoleChange(u.id, e.target.value)}
          style={{
           padding: '6px 10px', borderRadius: '6px',
           border: '1px solid rgba(var(--border-rgb), 0.3)',
           background: 'rgba(var(--bg-app-rgb), 0.5)',
           color: 'var(--text-primary)', fontSize: '0.8rem',
          }}
         >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
         </select>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default RoleManager;
