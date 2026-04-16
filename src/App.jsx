import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Connections from './pages/Connections';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Schedule from './pages/Schedule';
import ScheduleCalendar from './pages/ScheduleCalendar';
import BrandKit from './pages/BrandKit';
import AiStudio from './pages/AiStudio';
import MediaLibrary from './pages/MediaLibrary';
import History from './pages/History';
import ApiKeys from './pages/ApiKeys';
import AuthCallback from './pages/AuthCallback';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DataDeletion from './pages/DataDeletion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import DevelopersPage from './pages/DevelopersPage';
import HowItWorksPage from './pages/HowItWorksPage';
import RavenCursor from './components/RavenCursor';
import DashboardLayout from './layouts/DashboardLayout';
import SmartInbox from './pages/SmartInbox';
import DeveloperApi from './pages/DeveloperApi';
import InstantPublish from './pages/InstantPublish';
import Profiles from './pages/Profiles';
import Product from './pages/Product';

import FeaturePublishing from './pages/features/Publishing';
import FeatureAnalytics from './pages/features/Analytics';
import FeatureEngagement from './pages/features/Engagement';
import FeatureListening from './pages/features/Listening';
import FeatureAdvocacy from './pages/features/Advocacy';
import FeatureGhostwriter from './pages/features/Ghostwriter';
import SolutionEnterprise from './pages/solutions/Enterprise';
import SolutionAgencies from './pages/solutions/Agencies';
import SolutionSmallBusiness from './pages/solutions/SmallBusiness';
import ResourceDocs from './pages/resources/Docs';
import ResourceHelp from './pages/resources/Help';
import ResourceBlog from './pages/resources/Blog';

// Layout for full-width marketing pages (Home, Features)
function LandingLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Layout for generic public pages (Legal, etc) - Contained
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-sans flex flex-col">
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
      <RavenCursor />
      <Routes>
        {/* Marketing Routes */}
        <Route path="/" element={<LandingLayout><Home /></LandingLayout>} />
        <Route path="/features/publishing" element={<LandingLayout><FeaturePublishing /></LandingLayout>} />
        <Route path="/features/analytics" element={<LandingLayout><FeatureAnalytics /></LandingLayout>} />
        <Route path="/features/engagement" element={<LandingLayout><FeatureEngagement /></LandingLayout>} />
        <Route path="/features/listening" element={<LandingLayout><FeatureListening /></LandingLayout>} />
        <Route path="/features/advocacy" element={<LandingLayout><FeatureAdvocacy /></LandingLayout>} />
        <Route path="/features/ghostwriter" element={<LandingLayout><FeatureGhostwriter /></LandingLayout>} />

        <Route path="/solutions/enterprise" element={<LandingLayout><SolutionEnterprise /></LandingLayout>} />
        <Route path="/solutions/agencies" element={<LandingLayout><SolutionAgencies /></LandingLayout>} />
        <Route path="/solutions/small-business" element={<LandingLayout><SolutionSmallBusiness /></LandingLayout>} />

        <Route path="/docs" element={<LandingLayout><ResourceDocs /></LandingLayout>} />
        <Route path="/help" element={<LandingLayout><ResourceHelp /></LandingLayout>} />
        <Route path="/blog" element={<LandingLayout><ResourceBlog /></LandingLayout>} />

        <Route path="/terms" element={<PublicLayout><TermsOfUse /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/data-deletion" element={<PublicLayout><DataDeletion /></PublicLayout>} />
        <Route path="/pricing" element={<LandingLayout><Pricing /></LandingLayout>} />
        <Route path="/how-it-works" element={<LandingLayout><HowItWorksPage /></LandingLayout>} />
        <Route path="/product" element={<LandingLayout><Product /></LandingLayout>} />
        <Route path="/community" element={<LandingLayout><DevelopersPage /></LandingLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Auth Callback */}
        <Route path="/auth/callback" element={<PublicLayout><AuthCallback /></PublicLayout>} />

        {/* Protected Dashboard Routes - Now Platform Routes */}
        <Route path="/publishing" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} /> {/* Legacy redirect/alias */}
        <Route path="/profiles" element={<DashboardLayout><Profiles /></DashboardLayout>} />
        <Route path="/connections" element={<DashboardLayout><Connections /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
        <Route path="/schedule" element={<DashboardLayout><ScheduleCalendar /></DashboardLayout>} />
        <Route path="/media" element={<DashboardLayout><MediaLibrary /></DashboardLayout>} />

        {/* New Placeholders */}
        <Route path="/inbox" element={<DashboardLayout><SmartInbox /></DashboardLayout>} />
        <Route path="/developer" element={<DashboardLayout><DeveloperApi /></DashboardLayout>} />
        <Route path="/listening" element={<DashboardLayout><div className="p-10 text-center text-gray-400">Social Listening Feature Coming Soon</div></DashboardLayout>} />
        <Route path="/ads" element={<DashboardLayout><div className="p-10 text-center text-gray-400">Social Ads Feature Coming Soon</div></DashboardLayout>} />

        <Route path="/instant" element={<DashboardLayout><InstantPublish /></DashboardLayout>} />
        <Route path="/brand" element={<DashboardLayout><BrandKit /></DashboardLayout>} />
        <Route path="/ai" element={<DashboardLayout><AiStudio /></DashboardLayout>} />
        <Route path="/media" element={<DashboardLayout><MediaLibrary /></DashboardLayout>} />
        <Route path="/history" element={<DashboardLayout><History /></DashboardLayout>} />
        <Route path="/apikeys" element={<DashboardLayout><ApiKeys /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
