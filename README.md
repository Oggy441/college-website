# College Management System

A comprehensive web-based management system for colleges built with React and Firebase. The application supports three distinct user roles: students, teachers, and administrators, each with tailored dashboards and features.

## Features

### Student Portal
- View personal dashboard with announcements
- Check attendance records and marks
- View results and academic performance
- Access class timetable
- View fee information

### Teacher Portal
- Access dashboard with class information
- Mark student attendance
- Upload and manage student results
- View assigned students
- Post announcements
- View class summary and statistics

### Admin Portal
- Full system dashboard with analytics
- Manage teachers and students
- Handle role assignments and permissions
- Generate detailed reports
- System-wide announcements
- Monitor overall system activity

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.4
- **Styling**: Tailwind CSS 4.2.2
- **Backend/Database**: Firebase
- **Routing**: React Router DOM 7.14.0
- **Notifications**: React Hot Toast 2.6.0
- **Icons**: React Icons 5.6.0
- **Charts**: Recharts 3.8.1

## Prerequisites

- Node.js and npm installed
- Firebase project with credentials
- Environment variables configured

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd college-ms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Add your Firebase credentials to `.env`:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (default Vite port).

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/        # React context for state management
├── data/           # Demo data and fixtures
├── firebase/       # Firebase configuration and utilities
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── pages/          # Page components organized by role
│   ├── admin/     # Admin pages
│   ├── student/   # Student pages
│   └── teacher/   # Teacher pages
└── routes/        # Route configuration and protection
```

## Authentication

The application uses Firebase Authentication with role-based access control. Users are authenticated and routed to their respective dashboards based on their assigned role.

## Environment Variables

All environment variables must start with `VITE_` to be exposed to client-side code in Vite. Sensitive credentials should never be committed to version control. The `.env` file is git-ignored, and only `.env.example` should be tracked.

## Creating New Users

The system includes seeds for demo data. Use the auto-seed hooks to populate initial test data for development.

## Contributing

Follow these guidelines when contributing:
- Keep components modular and reusable
- Use Tailwind CSS for styling
- Maintain role-based access control for protected routes
- Test across all user roles

## License

This project is private and confidential.
