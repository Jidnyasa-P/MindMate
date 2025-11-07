import { Home, BookOpen, FileText, Target, Users, Calendar, Activity, BarChart3, User, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useAuth, useAppState } from '../../App';
import { Button } from '../ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { currentPage, setCurrentPage, theme, toggleTheme } = useAppState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'journal', label: 'Journal', icon: FileText },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'assessments', label: 'Assessments', icon: Activity },
    ...(user?.role === 'admin' ? [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }] : []),
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MindCare
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    onClick={() => setCurrentPage(item.id)}
                    className="relative"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
              
              <div className="hidden md:flex items-center space-x-3 ml-3 pl-3 border-l border-border">
                <div className="text-right">
                  <p className="text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white dark:bg-slate-900 border-b border-border shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
