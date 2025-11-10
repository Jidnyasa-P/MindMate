import { Home, BookOpen, Users, BarChart3, User, LogOut, Menu, Moon, Sun, Globe, ChevronDown, Calendar, Target, FileText, Activity, Sparkles } from 'lucide-react';
import { useAuth, useAppState } from '../../App';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { currentPage, setCurrentPage, theme, toggleTheme, language, setLanguage } = useAppState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWellnessDropdownOpen, setIsWellnessDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' }
  ];

  const wellnessItems = [
    { id: 'appointments', label: 'Bookings & Events', icon: Calendar },
    { id: 'habits', label: 'Habit Tracker', icon: Target },
    { id: 'journal', label: 'Journaling', icon: FileText },
    { id: 'assessments', label: 'Assessments', icon: Activity },
  ];

  const mainNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    ...(user?.role === 'admin' ? [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }] : []),
  ];

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    setIsWellnessDropdownOpen(false);
  };

  const isWellnessActive = wellnessItems.some(item => currentPage === item.id);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Sparkles className="h-8 w-8 text-teal-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              MindMate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.id)}
                  className="relative"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-teal-100 dark:bg-teal-900 rounded-md -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              );
            })}

            {/* Wellness Hub Dropdown - Desktop */}
            <div className="relative">
              <Button
                variant={isWellnessActive ? "default" : "ghost"}
                onClick={() => setIsWellnessDropdownOpen(!isWellnessDropdownOpen)}
                className="relative"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Wellness Hub
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isWellnessDropdownOpen ? 'rotate-180' : ''}`} />
                {isWellnessActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-teal-100 dark:bg-teal-900 rounded-md -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Button>

              <AnimatePresence>
                {isWellnessDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                  >
                    {wellnessItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigation(item.id)}
                          className={`w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            isActive ? 'bg-teal-50 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <Icon className="mr-3 h-4 w-4" />
                          {item.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2 border-l pl-3 ml-3">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Main Nav Items - Mobile */}
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.id)}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}

              {/* Wellness Hub Section - Mobile */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Wellness Hub
                </p>
                {wellnessItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => handleNavigation(item.id)}
                      className="w-full justify-start"
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>

              {/* User Actions - Mobile */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <User className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>

                {/* Language Selector - Mobile */}
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <Globe className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Theme Toggle - Mobile */}
                <Button variant="outline" className="w-full justify-start" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="mr-3 h-5 w-5" /> : <Sun className="mr-3 h-5 w-5" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>

                {/* Logout - Mobile */}
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={logout}>
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}