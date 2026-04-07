import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import { useTeachers, useSubjects } from '../../hooks/useFirestore';
import { HiOutlinePlusCircle, HiOutlinePencilSquare, HiOutlineEye } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Teachers = () => {
  const { user } = useAuth();
  const { data: teachers, loading } = useTeachers();
  const { data: subjects } = useSubjects();
  const [showModal, setShowModal] = useState(false);
  const [viewTeacher, setViewTeacher] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', dept: 'CSE', password: 'Test@1234' });

  const isDemo = user?.uid?.startsWith('demo-');

  const subjectNames = [...new Set(subjects.map(s => s.name))];

  const openAdd = () => {
    setForm({ name: '', email: '', dept: 'CSE', password: 'Test@1234' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) { toast.error('Name and email required'); return; }
    setSaving(true);
    try {
      if (isDemo) {
        toast.success('Teacher added! (demo mode)');
      } else {
        await registerUser(form.email, form.password, {
          name: form.name,
          dept: form.dept,
          role: 'teacher',
        });
        toast.success('Teacher account created!');
      }
      setShowModal(false);
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid rgba(var(--border-rgb), 0.3)',
    background: 'rgba(var(--bg-app-rgb), 0.5)',
    color: 'var(--text-primary)', fontSize: '0.85rem',
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
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading faculty…</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Department</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{t.email}</td>
                  <td>{t.dept}</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setViewTeacher(t)}
                        style={{ padding: '6px', borderRadius: '6px', border: '1px solid rgba(14,165,233,0.3)', background: 'rgba(14,165,233,0.1)', color: '#C8DFE4', cursor: 'pointer' }}
                      >
                        <HiOutlineEye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Teacher">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} placeholder="Dr. Name" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle} placeholder="teacher@college.edu" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Temporary Password</label>
            <input type="text" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Department</label>
            <select value={form.dept} onChange={(e) => setForm(p => ({ ...p, dept: e.target.value }))} style={inputStyle}>
              {['CSE','ECE','EEE','ME'].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            A Firebase Auth account will be created for the teacher with the provided email and password.
          </p>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ marginTop: '8px' }}>
            {saving ? 'Creating…' : 'Create Teacher Account'}
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
                {viewTeacher.name?.charAt(0)}
              </div>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{viewTeacher.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{viewTeacher.email}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Department', value: viewTeacher.dept },
                { label: 'Role', value: viewTeacher.role },
                { label: 'Status', value: 'Active' },
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
