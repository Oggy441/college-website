import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Loading fallback
const LoadingScreen = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px' }}>
    <div className="spinner"></div>
  </div>
);

// Lazy-loaded pages for code splitting
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));

// Student
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const StudentAttendance = lazy(() => import('./pages/student/Attendance'));
const StudentResults = lazy(() => import('./pages/student/Results'));
const StudentTimetable = lazy(() => import('./pages/student/Timetable'));
const StudentAnnouncements = lazy(() => import('./pages/student/Announcements'));
const StudentFees = lazy(() => import('./pages/student/Fees'));

// Teacher
const TeacherDashboard = lazy(() => import('./pages/teacher/Dashboard'));
const TeacherStudents = lazy(() => import('./pages/teacher/Students'));
const MarkAttendance = lazy(() => import('./pages/teacher/MarkAttendance'));
const UploadResults = lazy(() => import('./pages/teacher/UploadResults'));
const TeacherAnnouncements = lazy(() => import('./pages/teacher/Announcements'));
const ClassSummary = lazy(() => import('./pages/teacher/ClassSummary'));

// Admin
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminTeachers = lazy(() => import('./pages/admin/Teachers'));
const AdminStudents = lazy(() => import('./pages/admin/Students'));
const RoleManager = lazy(() => import('./pages/admin/RoleManager'));
const Reports = lazy(() => import('./pages/admin/Reports'));

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#241e2c',
              color: '#F2EAE0',
              border: '1px solid rgba(78, 69, 96, 0.3)',
              borderRadius: '10px',
              fontSize: '0.85rem',
            },
            success: {
              iconTheme: { primary: '#7EC8A0', secondary: '#F2EAE0' },
            },
            error: {
              iconTheme: { primary: '#D98E8E', secondary: '#F2EAE0' },
            },
          }}
        />

        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Student Portal */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/attendance" element={<StudentAttendance />} />
              <Route path="/student/results" element={<StudentResults />} />
              <Route path="/student/timetable" element={<StudentTimetable />} />
              <Route path="/student/announcements" element={<StudentAnnouncements />} />
              <Route path="/student/fees" element={<StudentFees />} />
            </Route>

            {/* Teacher Portal */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/students" element={<TeacherStudents />} />
              <Route path="/teacher/attendance" element={<MarkAttendance />} />
              <Route path="/teacher/results" element={<UploadResults />} />
              <Route path="/teacher/announcements" element={<TeacherAnnouncements />} />
              <Route path="/teacher/class-summary" element={<ClassSummary />} />
            </Route>

            {/* Admin Portal */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/teachers" element={<AdminTeachers />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/roles" element={<RoleManager />} />
              <Route path="/admin/reports" element={<Reports />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
