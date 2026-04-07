import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import { demoTeachers, demoSubjects } from '../../data/demoData';
import { HiOutlinePlusCircle, HiOutlinePencilSquare, HiOutlineEye } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Teachers = () => {
 const [teachers, setTeachers] = useState(demoTeachers);
 const [showModal, setShowModal] = useState(false);
 const [viewTeacher, setViewTeacher] = useState(null);
 const [editTeacher, setEditTeacher] = useState(null);
 const [form, setForm] = useState({ name: '', email: '', dept: 'CSE', subjects: [] });

 const openAdd = () => {
  setEditTeacher(null);
  setForm({ name: '', email: '', dept: 'CSE', subjects: [] });
  setShowModal(true);
 };

 const openEdit = (t) => {
  setEditTeacher(t);
  setForm({ name: t.name, email: t.email, dept: t.dept, subjects: t.subjects });
  setShowModal(true);
 };

 const handleSave = () => {
  if (!form.name ||!form.email) {
   toast.error('Name and email required');
   return;
  }
  if (editTeacher) {
   setTeachers(prev => prev.map(t => t.id === editTeacher.id ? { ...t, ...form } : t));
   toast.success('Teacher updated!');
  } else {
   setTeachers(prev => [...prev, { id: `t${Date.now()}`, ...form, role: 'teacher', studentsCount: 0 }]);
   toast.success('Teacher added!');
  }
  setShowModal(false);
 };

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader
    title="Teacher Management"
    subtitle="Manage faculty accounts and subject assignments"
    actions={
     <button className="btn btn-primary" onClick={openAdd} id="add-teacher-btn">
      <HiOutlinePlusCircle size={18} /> Add Teacher
     </button>
    }
   />

   <div className="glass-card" style={{ padding: '0', overflow: 'auto' }}>
    <table className="data-table">
     <thead>
      <tr>
       <th>Name</th>
       <th>Email</th>
       <th>Department</th>
       <th>Subjects</th>
       <th>Students</th>
       <th>Status</th>
       <th>Actions</th>
      </tr>
     </thead>
     <tbody>
      {teachers.map((t) => (
       <tr key={t.id}>
        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
        <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{t.email}</td>
        <td>{t.dept}</td>
        <td>
         <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {t.subjects.map((s, i) => (
           <span key={i} className="badge badge-info">{s}</span>
          ))}
         </div>
        </td>
        <td style={{ fontWeight: 600 }}>{t.studentsCount}</td>
        <td><span className="badge badge-success">Active</span></td>
        <td>
         <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => setViewTeacher(t)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid rgba(14, 165, 233, 0.3)', background: 'rgba(14, 165, 233, 0.1)', color: '#C8DFE4', cursor: 'pointer' }}>
           <HiOutlineEye size={14} />
          </button>
          <button onClick={() => openEdit(t)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.1)', color: '#BDA6CE', cursor: 'pointer' }}>
           <HiOutlinePencilSquare size={14} />
          </button>
         </div>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>

   {/* Add/Edit Modal */}
   <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editTeacher ? 'Edit Teacher' : 'Add Teacher'}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
     <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Full Name</label>
      <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Email</label>
      <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Department</label>
      <select value={form.dept} onChange={(e) => setForm(p => ({ ...p, dept: e.target.value }))}
       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
       <option value="CSE">CSE</option>
       <option value="ECE">ECE</option>
       <option value="EEE">EEE</option>
       <option value="ME">ME</option>
      </select>
     </div>
     <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Assign Subjects</label>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
       {demoSubjects.map((s) => (
        <label key={s.id} style={{
         display: 'flex', alignItems: 'center', gap: '6px',
         padding: '6px 10px', borderRadius: '6px',
         background: form.subjects.includes(s.name) ? 'rgba(99, 102, 241, 0.15)' : 'rgba(var(--bg-app-rgb), 0.3)',
         border: '1px solid rgba(var(--border-rgb), 0.3)',
         cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-primary)',
        }}>
         <input
          type="checkbox"
          checked={form.subjects.includes(s.name)}
          onChange={(e) => {
           if (e.target.checked) setForm(p => ({ ...p, subjects: [...p.subjects, s.name] }));
           else setForm(p => ({ ...p, subjects: p.subjects.filter(x => x!== s.name) }));
          }}
         />
         {s.name}
        </label>
       ))}
      </div>
     </div>
     <button className="btn btn-primary" onClick={handleSave} style={{ marginTop: '8px' }}>
      {editTeacher ? 'Update Teacher' : 'Add Teacher'}
     </button>
    </div>
   </Modal>

   {/* View Modal */}
   <Modal isOpen={!!viewTeacher} onClose={() => setViewTeacher(null)} title="Teacher Profile">
    {viewTeacher && (
     <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
       <div style={{
        width: '64px', height: '64px', borderRadius: '16px',
        background: 'linear-gradient(135deg, #B4D3D9, #96C1CA)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '12px',
       }}>
        {viewTeacher.name.charAt(0)}
       </div>
       <h3 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{viewTeacher.name}</h3>
       <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{viewTeacher.email}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
       {[
        { label: 'Department', value: viewTeacher.dept },
        { label: 'Students', value: viewTeacher.studentsCount },
        { label: 'Status', value: 'Active' },
        { label: 'Subjects', value: viewTeacher.subjects.length },
       ].map((item, i) => (
        <div key={i} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(var(--bg-app-rgb), 0.5)', textAlign: 'center' }}>
         <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{item.label}</div>
         <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{item.value}</div>
        </div>
       ))}
      </div>
     </div>
    )}
   </Modal>
  </div>
 );
};

export default Teachers;
