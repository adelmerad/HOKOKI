import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

// Auth
import { Splash } from './pages/auth/Splash'
import { Onboarding } from './pages/auth/Onboarding'
import { AccountType } from './pages/auth/AccountType'
import { RegisterPhone } from './pages/auth/RegisterPhone'
import { RegisterOTP } from './pages/auth/RegisterOTP'
import { RegisterProfile } from './pages/auth/RegisterProfile'
import { Login } from './pages/auth/Login'
import { ForgotPassword } from './pages/auth/ForgotPassword'

// Home
import { Home } from './pages/home/Home'

// Laws
import { LawsGrid } from './pages/laws/LawsGrid'
import { CategoryDetail } from './pages/laws/CategoryDetail'
import { ArticleDetail } from './pages/laws/ArticleDetail'
import { SearchResults } from './pages/laws/SearchResults'
import { Bookmarks } from './pages/laws/Bookmarks'
import { RecentChanges } from './pages/laws/RecentChanges'
import { TermDefinition } from './pages/laws/TermDefinition'

// Chat
import { ChatEmpty } from './pages/chat/ChatEmpty'
import { ChatActive } from './pages/chat/ChatActive'
import { ChatHistory } from './pages/chat/ChatHistory'
import { ChatEmergency } from './pages/chat/ChatEmergency'
import { ChatVoiceInput } from './pages/chat/ChatVoiceInput'
import { ChatImageAttach } from './pages/chat/ChatImageAttach'

// Contract analysis
import { ContractAnalyse } from './pages/contract/ContractAnalyse'

// Procedures
import { ProcedureSearch } from './pages/procedures/ProcedureSearch'
import { ProceduresHub } from './pages/procedures/ProceduresHub'
import { ProcedureDetail } from './pages/procedures/ProcedureDetail'
import { ProcedureActive } from './pages/procedures/ProcedureActive'
import { ProcedureCompleted } from './pages/procedures/ProcedureCompleted'
import { ProceduresTracker } from './pages/procedures/ProceduresTracker'
import { DocumentGeneratorHome } from './pages/procedures/DocumentGeneratorHome'
import { DocumentGeneratorForm } from './pages/procedures/DocumentGeneratorForm'
import { DocumentGeneratorPreview } from './pages/procedures/DocumentGeneratorPreview'

// Lawyers — client side
import { LawyersList } from './pages/lawyers/LawyersList'
import { LawyerProfile } from './pages/lawyers/LawyerProfile'
import { LawyerMatching } from './pages/lawyers/LawyerMatching'
import { LawyerReviews } from './pages/lawyers/LawyerReviews'
import { FreeConsultation } from './pages/lawyers/FreeConsultation'
import { ContactLawyer } from './pages/lawyers/ContactLawyer'
import { WriteReview } from './pages/lawyers/WriteReview'

// Lawyers — enterprise / registration
import { LawyerRegister } from './pages/lawyers/LawyerRegister'
import { LawyerPending } from './pages/lawyers/LawyerPending'
import { LawyerDashboard } from './pages/lawyers/LawyerDashboard'
import { LawyerRequests } from './pages/lawyers/LawyerRequests'
import { LawyerRequestDetail } from './pages/lawyers/LawyerRequestDetail'
import { LawyerAvailability } from './pages/lawyers/LawyerAvailability'
import { LawyerEditProfile } from './pages/lawyers/LawyerEditProfile'

// Error
import { NoInternet } from './pages/error/NoInternet'
import { ServerError } from './pages/error/ServerError'

// Profile
import { Profile } from './pages/profile/Profile'
import { Settings } from './pages/profile/Settings'
import { Reminders } from './pages/profile/Reminders'

// Notifications
import { Notifications } from './pages/notifications/Notifications'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Root */}
        <Route path="/" element={<Splash />} />

        {/* Auth */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/register" element={<RegisterPhone />} />
        <Route path="/register/otp" element={<RegisterOTP />} />
        <Route path="/register/profile" element={<RegisterProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main */}
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Laws */}
        <Route path="/laws" element={<LawsGrid />} />
        <Route path="/laws/recent" element={<RecentChanges />} />
        <Route path="/laws/:category" element={<CategoryDetail />} />
        <Route path="/laws/:category/:id" element={<ArticleDetail />} />

        {/* Search & Bookmarks & Terms */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/terms/:id" element={<TermDefinition />} />
        <Route path="/terms" element={<TermDefinition />} />

        {/* Chat — specific routes before parameterised ones */}
        <Route path="/chat" element={<ChatEmpty />} />
        <Route path="/chat/history" element={<ChatHistory />} />
        <Route path="/chat/emergency" element={<ChatEmergency />} />
        <Route path="/chat/voice" element={<ChatVoiceInput />} />
        <Route path="/chat/image" element={<ChatImageAttach />} />
<Route path="/chat/:id" element={<ChatActive />} />

        {/* Contract analysis */}
        <Route path="/contract" element={<ContractAnalyse />} />

        {/* Procedures */}
        <Route path="/procedures/search" element={<ProcedureSearch />} />
        <Route path="/procedures" element={<ProceduresHub />} />
        <Route path="/procedures/:id" element={<ProcedureDetail />} />
        <Route path="/procedures/:id/active" element={<ProcedureActive />} />
        <Route path="/procedures/:id/completed" element={<ProcedureCompleted />} />
        <Route path="/tracker" element={<ProceduresTracker />} />
        <Route path="/documents" element={<DocumentGeneratorHome />} />
        <Route path="/documents/:type" element={<DocumentGeneratorForm />} />
        <Route path="/documents/:type/preview" element={<DocumentGeneratorPreview />} />

        {/* Lawyers — specific routes before :id */}
        <Route path="/lawyers" element={<LawyersList />} />
        <Route path="/lawyers/matching" element={<LawyerMatching />} />
        <Route path="/lawyers/free" element={<FreeConsultation />} />
        <Route path="/lawyers/:id/reviews" element={<LawyerReviews />} />
        <Route path="/lawyers/:id/contact" element={<ContactLawyer />} />
        <Route path="/lawyers/:id/write-review" element={<WriteReview />} />
        <Route path="/lawyers/:id" element={<LawyerProfile />} />

        {/* Lawyer Registration */}
        <Route path="/lawyer-register" element={<LawyerRegister />} />
        <Route path="/lawyer-register/pending" element={<LawyerPending />} />

        {/* Lawyer Dashboard (Enterprise) */}
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
        <Route path="/lawyer-dashboard/requests" element={<LawyerRequests />} />
        <Route path="/lawyer-dashboard/requests/:id" element={<LawyerRequestDetail />} />
        <Route path="/lawyer-dashboard/availability" element={<LawyerAvailability />} />
        <Route path="/lawyer-dashboard/profile/edit" element={<LawyerEditProfile />} />

        {/* Error pages */}
        <Route path="/no-internet" element={<NoInternet />} />
        <Route path="/server-error" element={<ServerError />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reminders" element={<Reminders />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#141418',
            color: '#F0F0F5',
            border: '1px solid #242430',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Cairo, sans-serif',
          },
        }}
      />
    </BrowserRouter>
  )
}
