import PageHeader from '../../components/common/PageHeader';
import { HiOutlineCurrencyRupee, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle } from 'react-icons/hi2';

const Fees = () => {
 const feeData = {
  totalFee: 120000,
  paid: 120000,
  pending: 0,
  status: 'paid',
  dueDate: '2026-04-30',
  semester: 'Spring 2026',
  breakdown: [
   { item: 'Tuition Fee', amount: 85000, paid: true },
   { item: 'Lab Fee', amount: 15000, paid: true },
   { item: 'Library Fee', amount: 5000, paid: true },
   { item: 'Exam Fee', amount: 10000, paid: true },
   { item: 'Hostel Fee', amount: 5000, paid: true },
  ],
 };

 const statusConfig = {
  paid: { icon: HiOutlineCheckCircle, color: '#7EC8A0', label: 'Fully Paid', bg: 'rgba(16, 185, 129, 0.1)' },
  pending: { icon: HiOutlineClock, color: '#BDA6CE', label: 'Payment Pending', bg: 'rgba(245, 158, 11, 0.1)' },
  overdue: { icon: HiOutlineExclamationCircle, color: '#D98E8E', label: 'Payment Overdue', bg: 'rgba(239, 68, 68, 0.1)' },
 };

 const status = statusConfig[feeData.status];
 const StatusIcon = status.icon;

 return (
  <div className="animate-fade-in" style={{ padding: '24px 28px' }}>
   <PageHeader title="Fee Details" subtitle={`Semester: ${feeData.semester}`} />

   {/* Status Banner */}
   <div className="glass-card" style={{
    padding: '20px 24px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderLeft: `4px solid ${status.color}`,
   }}>
    <div style={{
     width: '48px',
     height: '48px',
     borderRadius: '12px',
     background: status.bg,
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     color: status.color,
    }}>
     <StatusIcon size={24} />
    </div>
    <div>
     <div style={{ fontSize: '1.1rem', fontWeight: 700, color: status.color }}>{status.label}</div>
     <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
      Due Date: {new Date(feeData.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
     </div>
    </div>
    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Fee</div>
     <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{feeData.totalFee.toLocaleString('en-IN')}</div>
    </div>
   </div>

   {/* Summary Cards */}
   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
    <div className="glass-card" style={{ padding: '16px 20px', textAlign: 'center' }}>
     <HiOutlineCurrencyRupee size={20} style={{ color: '#9B8EC7', margin: '0 auto 8px' }} />
     <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{feeData.totalFee.toLocaleString('en-IN')}</div>
     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Total Fee</div>
    </div>
    <div className="glass-card" style={{ padding: '16px 20px', textAlign: 'center' }}>
     <HiOutlineCheckCircle size={20} style={{ color: '#7EC8A0', margin: '0 auto 8px' }} />
     <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#7EC8A0' }}>₹{feeData.paid.toLocaleString('en-IN')}</div>
     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Amount Paid</div>
    </div>
    <div className="glass-card" style={{ padding: '16px 20px', textAlign: 'center' }}>
     <HiOutlineClock size={20} style={{ color: '#BDA6CE', margin: '0 auto 8px' }} />
     <div style={{ fontSize: '1.2rem', fontWeight: 800, color: feeData.pending > 0 ? '#BDA6CE' : '#7EC8A0' }}>₹{feeData.pending.toLocaleString('en-IN')}</div>
     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Pending</div>
    </div>
   </div>

   {/* Breakdown */}
   <div className="glass-card" style={{ padding: '20px 24px' }}>
    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}> Fee Breakdown</h3>
    <table className="data-table">
     <thead>
      <tr>
       <th>#</th>
       <th>Fee Component</th>
       <th>Amount</th>
       <th>Status</th>
      </tr>
     </thead>
     <tbody>
      {feeData.breakdown.map((item, i) => (
       <tr key={i}>
        <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.item}</td>
        <td style={{ fontWeight: 500 }}>₹{item.amount.toLocaleString('en-IN')}</td>
        <td>
         <span className={`badge ${item.paid ? 'badge-success' : 'badge-warning'}`}>
          {item.paid ? 'Paid' : 'Pending'}
         </span>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default Fees;
