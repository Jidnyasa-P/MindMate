import { useState, createContext, useContext, useEffect } from 'react';
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import ResourceHub from './components/pages/ResourceHub';
import JournalPage from './components/pages/JournalPage';
import HabitsPage from './components/pages/HabitsPage';
import CommunityHub from './components/pages/CommunityHub';
import AppointmentsPage from './components/pages/AppointmentsPage';
import AssessmentsPage from './components/pages/AssessmentsPage';
import AdminAnalytics from './components/pages/AdminAnalytics';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ChatBot from './components/shared/ChatBot';
import DailyQuote from './components/shared/DailyQuote';
import { Toaster } from './components/ui/sonner';

// Auth Context
type User = {
  name: string;
  email: string;
  role: 'student' | 'counselor' | 'admin';
  institution: string;
  branch?: string;
  age?: number;
  area?: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// App State Context
type AppState = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: string;
  setLanguage: (lang: string) => void;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const login = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const authValue: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  const appStateValue: AppState = {
    currentPage,
    setCurrentPage,
    theme,
    toggleTheme,
    language,
    setLanguage,
  };

  const renderPage = () => {
    if (!user) {
      return <LoginPage />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'resources':
        return <ResourceHub />;
      case 'journal':
        return <JournalPage />;
      case 'habits':
        return <HabitsPage />;
      case 'community':
        return <CommunityHub />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'assessments':
        return <AssessmentsPage />;
      case 'analytics':
        return user.role === 'admin' ? <AdminAnalytics /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthContext.Provider value={authValue}>
      <AppStateContext.Provider value={appStateValue}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 transition-colors duration-300">
          {user && <Navbar />}
          {user && <DailyQuote />}
          <main className={user ? 'pt-16' : ''}>
            {renderPage()}
          </main>
          {user && <Footer />}
          {user && <ChatBot />}
          <Toaster position="top-right" />
        </div>
      </AppStateContext.Provider>
    </AuthContext.Provider>
  );
}
