import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Connections from './pages/Connections';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Schedule from './pages/Schedule';
import ScheduleCalendar from './pages/ScheduleCalendar';
import BrandKit from './pages/BrandKit';
import Ghostwriter from './pages/Ghostwriter';
import MediaLibrary from './pages/MediaLibrary';
import History from './pages/History';
import ApiKeys from './pages/ApiKeys';
import AuthCallback from './pages/AuthCallback';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';

// Layout for public pages (Landing, Legal)
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 font-sans flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><TermsOfUse /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />

        {/* Auth Callback works best in Public Layout usually */}
        <Route path="/auth/callback" element={<PublicLayout><AuthCallback /></PublicLayout>} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/connections" element={<DashboardLayout><Connections /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
        <Route path="/schedule" element={<DashboardLayout><Schedule /></DashboardLayout>} />
        <Route path="/schedule/calendar" element={<DashboardLayout><ScheduleCalendar /></DashboardLayout>} />
        <Route path="/brand" element={<DashboardLayout><BrandKit /></DashboardLayout>} />
        <Route path="/ai" element={<DashboardLayout><Ghostwriter /></DashboardLayout>} />
        <Route path="/media" element={<DashboardLayout><MediaLibrary /></DashboardLayout>} />
        <Route path="/history" element={<DashboardLayout><History /></DashboardLayout>} />
        <Route path="/apikeys" element={<DashboardLayout><ApiKeys /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
