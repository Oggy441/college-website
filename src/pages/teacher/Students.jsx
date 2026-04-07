import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import { useStudents } from '../../hooks/useFirestore';
import { addStudent, updateStudent, deleteStudent } from '../../firebase/firestore';
import { HiOutlineUserGroup, HiOutlineChartBarSquare, HiOutlineBookOpen, HiOutlineCalendarDays, HiOutlinePencilSquare, HiOutlineTrash, HiOutlinePlusCircle, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import StatCard from '../../components/common/StatCard';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Students = () => {
  const { user } = useAuth();
  const { data: students, loading } = useStudents();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', rollNo: '', dept: 'CSE', section: 'A', cgpa: '', feeStatus: 'pending', feeDue: 0 });

  const isDemo = user?.uid?.startsWith('demo-');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo?.toLowerCase().includes(search.toLowerCase())
  );

  const avgCgpa = students.length
    ? (students.reduce((sum, s) => sum + (s.cgpa || 0), 0) / students.length).toFixed(1)
    : '—';

  const openAdd = () => {
    setEditStudent(null);
    setForm({ name: '', rollNo: '', dept: 'CSE', section: 'A', cgpa: '', feeStatus: 'pending', feeDue: 0 });
    setShowModal(true);
  };

  const openEdit = (s) => {
    setEditStudent(s);
    setForm({ name: s.name, rollNo: s.rollNo, dept: s.dept, section: s.section, cgpa: s.cgpa, feeStatus: s.feeStatus, feeDue: s.feeDue });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.rollNo) { toast.error('Name and Roll No are required'); return; }
    setSaving(true);
    try {
      const data = { ...form, cgpa: parseFloat(form.cgpa) || 0, feeDue: parseFloat(form.feeDue) || 0 };
      if (isDemo) {
        toast.success(editStudent ? 'Student updated! (demo)' : 'Student added! (demo)');
      } else if (editStudent) {
        await updateStudent(editStudent.id, data);
        toast.success('Student updated!');
      } else {
        await addStudent({ ...data, enrolledSubjects: [] });
        toast.success('Student added!');
      }
      setShowModal(false);
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      if (!isDemo) await deleteStudent(id);
      toast.success('Student removed');
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  const feeColor = { paid: '#7EC8A0', pending: '#BDA6CE', overdue: '#D98E8E' };
  const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.85rem' };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
      <PageHeader
        title="Student Management"
        subtitle="Manage students in your assigned classes"
        actions={
          <button className="btn btn-primary" onClick={openAdd} id="add-student-btn">
            <HiOutlinePlusCircle size={18} /> Add Student
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <StatCard title="Total Students" value={students.length} icon={HiOutlineUserGroup} color="#9B8EC7" />
        <StatCard title="Avg Attendance" value="84%" icon={HiOutlineChartBarSquare} color="#B4D3D9" />
        <StatCard title="Avg CGPA" value={avgCgpa} icon={HiOutlineBookOpen} color="#7EC8A0" />
        <StatCard title="Upcoming Exams" value="2" icon={HiOutlineCalendarDays} color="#BDA6CE" />
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <HiOutlineMagnifyingGlass size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input id="search-students" type="text" placeholder="Search by name or roll number..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '360px', padding: '10px 14px 10px 40px', borderRadius: '10px', border: '1px solid rgba(var(--border-rgb), 0.3)', background: 'rgba(var(--bg-app-rgb), 0.5)', color: 'var(--text-primary)', fontSize: '0.875rem' }} />
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing {filtered.length} of {students.length}
        </span>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'auto' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading students…</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th><th>Name</th><th>Dept</th><th>Section</th><th>CGPA</th><th>Fee Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#BDA6CE' }}>{s.rollNo}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                  <td>{s.dept}</td>
                  <td>{s.section}</td>
                  <td style={{ fontWeight: 600, color: s.cgpa >= 8 ? '#9DD8B7' : s.cgpa >= 6 ? '#D1BFD9' : '#E4A8A8' }}>{s.cgpa}</td>
                  <td>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600, background: `${feeColor[s.feeStatus] || '#9B8EC7'}18`, color: feeColor[s.feeStatus] || '#9B8EC7', textTransform: 'capitalize' }}>
                      {s.feeStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => openEdit(s)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.1)', color: '#BDA6CE', cursor: 'pointer' }}>
                        <HiOutlinePencilSquare size={14} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#E4A8A8', cursor: 'pointer' }}>
                        <HiOutlineTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editStudent ? 'Edit Student' : 'Add New Student'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[{ label: 'Full Name', key: 'name', type: 'text' }, { label: 'Roll Number', key: 'rollNo', type: 'text' }, { label: 'CGPA', key: 'cgpa', type: 'number' }].map((f) => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={(e) => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Department</label>
              <select value={form.dept} onChange={(e) => setForm(p => ({ ...p, dept: e.target.value }))} style={inputStyle}>
                {['CSE','ECE','EEE','ME'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Section</label>
              <select value={form.section} onChange={(e) => setForm(p => ({ ...p, section: e.target.value }))} style={inputStyle}>
                {['A','B'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Fee Status</label>
            <select value={form.feeStatus} onChange={(e) => setForm(p => ({ ...p, feeStatus: e.target.value }))} style={inputStyle}>
              {['paid','pending','overdue'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ flex: 1 }}>
              {saving ? 'Saving…' : editStudent ? 'Update Student' : 'Add Student'}
            </button>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Students;
