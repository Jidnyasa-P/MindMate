import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Calendar, AlertTriangle, Download, Brain, Target } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAnalytics() {
  // Mock data
  const institutionData = [
    { institution: 'Tech University', students: 1245, active: 892 },
    { institution: 'State College', students: 987, active: 654 },
    { institution: 'Arts Institute', students: 756, active: 543 },
    { institution: 'Medical School', students: 654, active: 489 },
    { institution: 'Business Academy', students: 543, active: 398 }
  ];

  const branchData = [
    { branch: 'Computer Science', count: 456 },
    { branch: 'Engineering', count: 389 },
    { branch: 'Business', count: 298 },
    { branch: 'Medicine', count: 267 },
    { branch: 'Arts', count: 234 },
    { branch: 'Science', count: 198 }
  ];

  const assessmentData = [
    { month: 'Jun', phq9: 145, gad7: 178, stress: 234 },
    { month: 'Jul', phq9: 189, gad7: 212, stress: 267 },
    { month: 'Aug', phq9: 234, gad7: 256, stress: 289 },
    { month: 'Sep', phq9: 298, gad7: 312, stress: 345 },
    { month: 'Oct', phq9: 356, gad7: 389, stress: 412 },
    { month: 'Nov', phq9: 412, gad7: 445, stress: 478 }
  ];

  const severityDistribution = [
    { name: 'Minimal', value: 45, color: '#10b981' },
    { name: 'Mild', value: 28, color: '#3b82f6' },
    { name: 'Moderate', value: 18, color: '#f59e0b' },
    { name: 'Severe', value: 9, color: '#ef4444' }
  ];

  const engagementData = [
    { feature: 'Resources', usage: 1234 },
    { feature: 'Journal', usage: 987 },
    { feature: 'Appointments', usage: 756 },
    { feature: 'Community', usage: 654 },
    { feature: 'Assessments', usage: 543 },
    { feature: 'Habits', usage: 432 }
  ];

  const appointmentStats = [
    { month: 'Jun', booked: 89, completed: 76, cancelled: 13 },
    { month: 'Jul', booked: 112, completed: 98, cancelled: 14 },
    { month: 'Aug', booked: 134, completed: 119, cancelled: 15 },
    { month: 'Sep', booked: 167, completed: 145, cancelled: 22 },
    { month: 'Oct', booked: 198, completed: 172, cancelled: 26 },
    { month: 'Nov', booked: 223, completed: 195, cancelled: 28 }
  ];

  const handleExportReport = (format: 'pdf' | 'csv') => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
  };

  const aiInsights = [
    {
      severity: 'high',
      title: 'Anxiety Rising Among 2nd-Year Engineering Students',
      description: 'GAD-7 scores show a 23% increase in anxiety levels among 2nd-year engineering students compared to last month, particularly in Computer Science and Electrical Engineering branches.',
      recommendation: 'Recommend scheduling mindfulness workshops specifically for this demographic and increasing counselor availability during midterm periods.'
    },
    {
      severity: 'medium',
      title: 'Peak Stress During Exam Periods',
      description: 'Stress assessment completion rates spike 45% during weeks 6-8 and 13-15 of each semester, correlating with midterms and finals.',
      recommendation: 'Implement proactive stress management campaigns 2 weeks before peak periods and offer extended counseling hours.'
    },
    {
      severity: 'low',
      title: 'High Engagement with Meditation Resources',
      description: 'Meditation and yoga resources show 87% completion rates and positive feedback, with users reporting 34% improvement in self-reported stress levels.',
      recommendation: 'Expand meditation content library and consider live-guided meditation sessions during high-stress periods.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into platform usage and student mental health trends
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => handleExportReport('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-3xl">5,420</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% vs last month</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active This Week</p>
                  <p className="text-3xl">2,847</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 8% vs last week</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Appointments</p>
                  <p className="text-3xl">223</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">This month</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">High Risk</p>
                  <p className="text-3xl">38</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Requires attention</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-8 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/30 border-2 border-indigo-200 dark:border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
              AI-Generated Insights & Recommendations
            </CardTitle>
            <CardDescription>Automated analysis of platform data and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="bg-white dark:bg-slate-900">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Badge variant={
                      insight.severity === 'high' ? 'destructive' :
                      insight.severity === 'medium' ? 'default' :
                      'secondary'
                    }>
                      {insight.severity}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="mb-2">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      <div className="flex items-start space-x-2 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-900 dark:text-blue-100">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Users by Institution</CardTitle>
                  <CardDescription>Total and active users per institution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={institutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="institution" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#6366f1" name="Total Students" />
                      <Bar dataKey="active" fill="#10b981" name="Active Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Distribution by Branch/Major</CardTitle>
                  <CardDescription>Student enrollment across different fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={branchData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="branch" type="category" width={120} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Assessment Trends</CardTitle>
                  <CardDescription>Monthly completion rates by assessment type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={assessmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="phq9" stroke="#6366f1" strokeWidth={2} name="PHQ-9 (Depression)" />
                      <Line type="monotone" dataKey="gad7" stroke="#8b5cf6" strokeWidth={2} name="GAD-7 (Anxiety)" />
                      <Line type="monotone" dataKey="stress" stroke="#06b6d4" strokeWidth={2} name="Stress" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Severity Distribution</CardTitle>
                  <CardDescription>Aggregate outcomes across all assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={severityDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {severityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Number of interactions per feature this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#10b981">
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Appointment Statistics</CardTitle>
                <CardDescription>Booking, completion, and cancellation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={appointmentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="booked" stroke="#6366f1" strokeWidth={2} name="Booked" />
                    <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                    <Line type="monotone" dataKey="cancelled" stroke="#ef4444" strokeWidth={2} name="Cancelled" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
