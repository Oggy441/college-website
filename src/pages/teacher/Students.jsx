import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import { demoStudents } from '../../data/demoData';
import { HiOutlineUserGroup, HiOutlineChartBarSquare, HiOutlineBookOpen, HiOutlineCalendarDays, HiOutlinePencilSquare, HiOutlineTrash, HiOutlinePlusCircle, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import StatCard from '../../components/common/StatCard';
import toast from 'react-hot-toast';

const Students = () => {
 const [students, setStudents] = useState(demoStudents);
 const [search, setSearch] = useState('');
 const [showModal, setShowModal] = useState(false);
 const [editStudent, setEditStudent] = useState(null);
 const [form, setForm] = useState({ name: '', rollNo: '', dept: 'CSE', section: 'A', cgpa: '', feeStatus: 'pending', feeDue: 0 });

 const filtered = students.filter(s =>
  s.name.toLowerCase().includes(search.toLowerCase()) ||
  s.rollNo.toLowerCase().includes(search.toLowerCase())
 );

 const avgAtt = 84;
 const avgCgpa = (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1);

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

 const handleSave = () => {
  if (!form.name ||!form.rollNo) {
   toast.error('Name and Roll No are required');
   return;
  }
  if (editStudent) {
   setStudents(prev => prev.map(s => s.id === editStudent.id ? { ...s, ...form, cgpa: parseFloat(form.cgpa) } : s));
   toast.success('Student updated!');
  } else {
   setStudents(prev => [...prev, { id: `s${Date.now()}`, ...form, cgpa: parseFloat(form.cgpa), enrolledSubjects: [] }]);
   toast.success('Student added!');
  }
  setShowModal(false);
 };

 const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this student?')) {
   setStudents(prev => prev.filter(s => s.id!== id));
   toast.success('Student removed');
  }
 };

 const feeColor = { paid: '#7EC8A0', pending: '#BDA6CE', overdue: '#D98E8E' };

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

   {/* Stat Pills */}
   <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px',
    marginBottom: '20px',
   }}>
    <StatCard title="Total Students" value={students.length} icon={HiOutlineUserGroup} color="#9B8EC7" />
    <StatCard title="Avg Attendance" value={`${avgAtt}%`} icon={HiOutlineChartBarSquare} color="#B4D3D9" />
    <StatCard title="Avg CGPA" value={avgCgpa} icon={HiOutlineBookOpen} color="#7EC8A0" />
    <StatCard title="Upcoming Exams" value="2" icon={HiOutlineCalendarDays} color="#BDA6CE" />
   </div>

   {/* Search */}
   <div style={{ marginBottom: '16px', position: 'relative' }}>
    <HiOutlineMagnifyingGlass size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
    <input
     id="search-students"
     type="text"
     placeholder="Search by name or roll number..."
     value={search}
     onChange={(e) => setSearch(e.target.value)}
     style={{
      width: '100%',
      maxWidth: '400px',
      padding: '10px 14px 10px 40px',
      borderRadius: '10px',
      border: '1px solid rgba(var(--border-rgb), 0.3)',
      background: 'rgba(var(--bg-app-rgb), 0.5)',
      color: 'var(--text-primary)',
      fontSize: '0.875rem',
     }}
    />
   </div>

   {/* Table */}
   <div className="glass-card" style={{ padding: '0', overflow: 'auto' }}>
    <table className="data-table">
     <thead>
      <tr>
       <th>Roll No</th>
       <th>Name</th>
       <th>Dept</th>
       <th>Section</th>
       <th>CGPA</th>
       <th>Fee Status</th>
       <th>Actions</th>
      </tr>
     </thead>
     <tbody>
      {filtered.map((s) => (
       <tr key={s.id}>
        <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#BDA6CE' }}>{s.rollNo}</td>
        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
        <td>{s.dept}</td>
        <td>{s.section}</td>
        <td style={{ fontWeight: 600, color: s.cgpa >= 8 ? '#9DD8B7' : s.cgpa >= 6 ? '#D1BFD9' : '#E4A8A8' }}>
         {s.cgpa}
        </td>
        <td>
         <span style={{
          padding: '3px 10px',
          borderRadius: '6px',
          fontSize: '0.7rem',
          fontWeight: 600,
          background: `${feeColor[s.feeStatus]}18`,
          color: feeColor[s.feeStatus],
          textTransform: 'capitalize',
         }}>
          {s.feeStatus}
         </span>
        </td>
        <td>
         <div style={{ display: 'flex', gap: '6px' }}>
          <button
           onClick={() => openEdit(s)}
           style={{
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            background: 'rgba(99, 102, 241, 0.1)',
            color: '#BDA6CE',
            cursor: 'pointer',
            transition: 'all 0.2s',
           }}
          >
           <HiOutlinePencilSquare size={14} />
          </button>
          <button
           onClick={() => handleDelete(s.id)}
           style={{
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#E4A8A8',
            cursor: 'pointer',
            transition: 'all 0.2s',
           }}
          >
           <HiOutlineTrash size={14} />
          </button>
         </div>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>

   {/* Add/Edit Modal */}
   <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editStudent ? 'Edit Student' : 'Add New Student'}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
     {[
      { label: 'Full Name', key: 'name', type: 'text' },
      { label: 'Roll Number', key: 'rollNo', type: 'text' },
      { label: 'CGPA', key: 'cgpa', type: 'number' },
     ].map((f) => (
      <div key={f.key}>
       <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>{f.label}</label>
       <input
        type={f.type}
        value={form[f.key]}
        onChange={(e) => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
        style={{
         width: '100%',
         padding: '8px 12px',
         borderRadius: '8px',
         border: '1px solid rgba(var(--border-rgb), 0.3)',
         background: 'rgba(var(--bg-app-rgb), 0.5)',
         color: 'var(--text-primary)',
         fontSize: '0.85rem',
        }}
       />
      </div>
     ))}
     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <div>
       <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Department</label>
       <select
        value={form.dept}
        onChange={(e) => setForm(prev => ({ ...prev, dept: e.target.value }))}
        style={{
         width: '100%',
         padding: '8px 12px',
         borderRadius: '8px',
         border: '1px solid rgba(var(--border-rgb), 0.3)',
         background: 'rgba(var(--bg-app-rgb), 0.5)',
         color: 'var(--text-primary)',
         fontSize: '0.85rem',
        }}
       >
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="ME">ME</option>
       </select>
      </div>
      <div>
       <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Section</label>
       <select
        value={form.section}
        onChange={(e) => setForm(prev => ({ ...prev, section: e.target.value }))}
        style={{
         width: '100%',
         padding: '8px 12px',
         borderRadius: '8px',
         border: '1px solid rgba(var(--border-rgb), 0.3)',
         background: 'rgba(var(--bg-app-rgb), 0.5)',
         color: 'var(--text-primary)',
         fontSize: '0.85rem',
        }}
       >
        <option value="A">A</option>
        <option value="B">B</option>
       </select>
      </div>
     </div>
     <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
      <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>
       {editStudent ? 'Update Student' : 'Add Student'}
      </button>
      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
     </div>
    </div>
   </Modal>
  </div>
 );
};

export default Students;
