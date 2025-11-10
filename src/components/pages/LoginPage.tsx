import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Brain, Shield, Info } from 'lucide-react';
import { useAuth } from '../../App';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type UserRole = 'student' | 'counselor' | 'admin';

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    branch: '',
    institution: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (!formData.name || !formData.email || !formData.password || !formData.institution) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else {
      // Login validation
      if (!formData.email || !formData.password) {
        toast.error('Please enter email and password');
        return;
      }
    }

    // Simulate successful login
    const user = {
      name: formData.name || 'Demo User',
      email: formData.email,
      role: selectedRole,
      institution: formData.institution || 'Demo University',
      branch: formData.branch,
      age: formData.age ? parseInt(formData.age) : undefined
    };

    toast.success(`Welcome, ${user.name}!`);
    login(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-6"
        >
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MannoDhara
            </h1>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621887348744-6b0444f8a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjIxNjI4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Mental wellness illustration"
              className="w-full h-full object-cover"
            />
          </div>

          <h2>Your Mental Wellness Journey Starts Here</h2>
          <p className="text-muted-foreground">
            A comprehensive platform designed specifically for university students, providing accessible, confidential mental health support and resources.
          </p>

          <Alert className="bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <AlertDescription className="text-indigo-900 dark:text-indigo-100">
              <span>Privacy & Confidentiality:</span> Your information is protected with end-to-end encryption. All counseling sessions and assessments are completely confidential.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Login/Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-2">
            <CardHeader>
              <CardTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
              <CardDescription>
                {isLogin ? 'Sign in to access your MannoDhara dashboard' : 'Join our mental wellness community'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selector */}
                <div>
                  <Label className="mb-3 block">I am a:</Label>
                  <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="student">Student</TabsTrigger>
                      <TabsTrigger value="counselor">Counselor</TabsTrigger>
                      <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Signup Fields */}
                {!isLogin && (
                  <>
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Rahul Kumar"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age {selectedRole === 'student' ? '*' : '(Optional)'}</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="20"
                          required={selectedRole === 'student'}
                        />
                      </div>
                      {selectedRole === 'student' && (
                        <div>
                          <Label htmlFor="branch">Branch/Major *</Label>
                          <Input
                            id="branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            placeholder="Computer Science"
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="institution">Institution Name *</Label>
                      <Input
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        placeholder="University of Example"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@university.edu"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>

                  {isLogin && (
                    <Button type="button" variant="ghost" className="w-full">
                      Forgot Password?
                    </Button>
                  )}
                </div>

                {/* Toggle Login/Signup */}
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </div>
              </form>

              {/* Info Alert */}
              <Alert className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-900 dark:text-blue-100 text-sm">
                  Demo: Use any email and password to log in
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
