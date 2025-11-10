import { Home, BookOpen, Users, BarChart3, User, LogOut, Menu, Moon, Sun, Globe, ChevronDown, Calendar, Target, FileText, Activity } from 'lucide-react';
import { useAuth, useAppState } from '../../App';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/mannodhara_logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { currentPage, setCurrentPage, theme, toggleTheme, language, setLanguage } = useAppState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWellnessDropdownOpen, setIsWellnessDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo and Brand Name */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigation('dashboard')}
          >
            <img src={logo} alt="MannoDhara Logo" className="h-10 w-10 object-contain rounded" />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                MannoDhara
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                Mental Health Support
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                MannoDhara
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => handleNavigation(item.id)}
                  className="relative text-sm lg:text-base"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-green-100 dark:bg-green-900 rounded-md -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              );
            })}

            {/* Wellness Hub Dropdown */}
            <div className="relative">
              <Button
                variant={isWellnessActive ? 'default' : 'ghost'}
                onClick={() => setIsWellnessDropdownOpen(!isWellnessDropdownOpen)}
                className="relative text-sm lg:text-base"
              >
                <Activity className="mr-2 h-4 w-4" />
                Wellness Hub
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isWellnessDropdownOpen ? 'rotate-180' : ''}`} />
                {isWellnessActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-green-100 dark:bg-green-900 rounded-md -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
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
                          className={`w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm ${
                            isActive ? 'bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
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
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24 h-9 text-xs">
                <Globe className="h-4 w-4 mr-1" />
                <SelectValue placeholder="Language" />
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
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 lg:h-10 lg:w-10">
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </Button>

            {/* User Menu - FIXED WITH PORTAL-LIKE POSITIONING */}
            <div className="border-l pl-2 lg:pl-3 ml-2 lg:ml-3 flex items-center">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Guest'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'user'}</p>
              </div>

              {/* User Icon Button */}
              <div className="relative inline-block">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="h-9 w-9 lg:h-10 lg:w-10"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                >
                  <User className="h-5 w-5" />
                </Button>

                {/* User Dropdown Menu - FIXED POSITIONING */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="fixed right-4 top-16 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 py-1 z-[9999]"
                  >
                    <button
                      onClick={() => { handleNavigation('profile'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg"
                      role="menuitem"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => { handleNavigation('settings'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      role="menuitem"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors last:rounded-b-lg"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Quick Logout Icon */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout}
                className="h-9 w-9 lg:h-10 lg:w-10 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
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
              className="h-9 w-9"
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 max-h-96 overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Main Nav Items - Mobile */}
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => handleNavigation(item.id)}
                    className="w-full justify-start text-sm"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}

              {/* Wellness Hub Section - Mobile */}
              <div className="pt-3 pb-2 border-t border-gray-200 dark:border-gray-700">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Wellness Hub
                </p>
                {wellnessItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? 'default' : 'ghost'}
                      onClick={() => handleNavigation(item.id)}
                      className="w-full justify-start text-sm"
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>

              {/* Language Section - Mobile */}
              <div className="pt-3 pb-2 border-t border-gray-200 dark:border-gray-700">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Language
                </p>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* User Actions - Mobile */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Guest'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'user'}</p>
                  </div>
                </div>

                {/* Theme Toggle - Mobile */}
                <Button variant="outline" className="w-full justify-start text-sm" size="sm" onClick={toggleTheme}>
                  <Sun className="mr-3 h-5 w-5 dark:hidden" />
                  <Moon className="mr-3 h-5 w-5 hidden dark:block" />
                  <span className="dark:hidden">Light Mode</span>
                  <span className="hidden dark:block">Dark Mode</span>
                </Button>

                {/* Logout - Mobile */}
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm"
                  size="sm"
                  onClick={logout}
                >
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