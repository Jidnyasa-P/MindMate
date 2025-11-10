import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { CheckCircle2, XCircle, Users, TrendingUp, Heart, Shield, Brain, Clock, Lock, Sparkles, Target, MessageCircle } from 'lucide-react';
import { useAuth, useAppState } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function Dashboard() {
  const { user } = useAuth();
  const { setCurrentPage } = useAppState();
  const [stats, setStats] = useState({ users: 0, sessions: 0, satisfaction: 0, resources: 0 });

  // Animated counter effect
  useEffect(() => {
    const targets = { users: 5420, sessions: 12350, satisfaction: 94, resources: 250 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        users: Math.floor(targets.users * progress),
        sessions: Math.floor(targets.sessions * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        resources: Math.floor(targets.resources * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: `Welcome back, ${user?.name}!`,
      description: "Your mental wellness journey continues today. Take a moment to check in with yourself.",
      image: "https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzYyMTk3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cta: "Start Journal Entry"
    },
    {
      title: "Book Your Counseling Session",
      description: "Professional counselors are available to support you. Schedule a session that fits your time.",
      image: "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNTA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cta: "Book Appointment"
    },
    {
      title: "Explore Wellness Resources",
      description: "Access meditation guides, podcasts, articles, and tools to support your mental health.",
      image: "https://images.unsplash.com/photo-1554885730-e5d7a39e0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzYyMjI1MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cta: "Browse Resources"
    }
  ];

  const prosAndCons = {
    pros: [
      "24/7 accessible mental health resources",
      "Anonymous and confidential support",
      "Professional counselors available",
      "Self-paced assessment and tracking",
      "Community support and peer connections",
      "AI-powered personalized recommendations"
    ],
    cons: [
      "Requires internet connection",
      "Not a replacement for emergency services",
      "Digital literacy needed",
      "Screen time considerations"
    ]
  };

  const teamMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Clinical Psychologist & Platform Director",
      bio: "15+ years experience in university mental health with focus on student wellness and digital therapeutics.",
      image: "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNTA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Dr. Arjun Patel",
      role: "Counseling Services Lead",
      bio: "Specializes in anxiety, depression, and stress management for young adults. Licensed therapist and educator.",
      image: "https://images.unsplash.com/photo-1729824186959-ba83cbd1978d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBoYXBweXxlbnwxfHx8fDE3NjIyMDQ2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Ananya Reddy",
      role: "Peer Support Coordinator",
      bio: "Recent graduate who champions mental health awareness. Manages community programs and student engagement.",
      image: "https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjIyMTIzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const testimonials = [
    {
      name: "Rahul K.",
      role: "Computer Science, 3rd Year",
      text: "MannoDhara helped me through my toughest semester. The counselors are understanding, and the resources are incredibly helpful.",
      rating: 5
    },
    {
      name: "Priya S.",
      role: "Biology, 2nd Year",
      text: "I was skeptical at first, but the self-assessments helped me understand my anxiety better. Booking appointments is so easy!",
      rating: 5
    },
    {
      name: "Arjun M.",
      role: "Engineering, 4th Year",
      text: "The community forum is amazing. It's comforting to know others are going through similar challenges. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Carousel className="w-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 flex flex-col justify-center space-y-4">
                      <h2 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {slide.title}
                      </h2>
                      <p className="text-muted-foreground">{slide.description}</p>
                      <Button
                        onClick={() => setCurrentPage(index === 0 ? 'journal' : index === 1 ? 'appointments' : 'resources')}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 w-fit"
                      >
                        {slide.cta}
                      </Button>
                    </div>
                    <div className="relative h-64 md:h-auto">
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h2>Making a Difference</h2>
          <p className="text-muted-foreground">Real impact on student mental health</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Students Helped', value: stats.users, icon: Users, color: 'from-blue-500 to-cyan-500' },
            { label: 'Counseling Sessions', value: stats.sessions, icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
            { label: 'Satisfaction Rate', value: `${stats.satisfaction}%`, icon: Heart, color: 'from-green-500 to-emerald-500' },
            { label: 'Resources Available', value: stats.resources, icon: Brain, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Pros and Cons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center mb-8">
          <h2>Understanding Digital Mental Health Support</h2>
          <p className="text-muted-foreground">What you should know about our platform</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {prosAndCons.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-600 dark:text-amber-400">
                <XCircle className="w-5 h-5 mr-2" />
                Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {prosAndCons.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="w-5 h-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Why This Solution Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-center mb-8">
          <h2>Why This Solution Works</h2>
          <p className="text-muted-foreground">Real stories from real students</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Sneha's Journey with Exam Anxiety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "As finals approached, my anxiety was overwhelming. I couldn't sleep and felt paralyzed. Through MannoDhara, I found CBT resources and scheduled weekly sessions with Dr. Patel. The habit tracker helped me build a healthy sleep routine, and the community forum showed me I wasn't alone."
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                <p className="text-sm">
                  <span className="text-primary">Outcome:</span> Sneha completed her exams, maintained a healthy routine, and continues using the platform for preventive care.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle>Rohan Overcomes Isolation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                "Moving to a new city for college, I felt isolated and homesick. I didn't know where to turn. The AI chatbot guided me to resources on managing homesickness, and I joined a peer support workshop. Meeting others who understood my experience changed everything."
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                <p className="text-sm">
                  <span className="text-primary">Outcome:</span> Rohan built a support network, became a community moderator, and now mentors other students.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8" />
                  <h2 className="text-white">Our Mission</h2>
                </div>
                <p className="text-white/90">
                  To provide accessible, confidential, and comprehensive mental health support to every university student, breaking down barriers to care and fostering a culture of wellness.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-8 h-8" />
                  <h2 className="text-white">Our Vision</h2>
                </div>
                <p className="text-white/90">
                  A future where every student has the tools and support to thrive mentally, academically, and personally—where seeking help is normalized and wellness is prioritized.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2>Why Choose MannoDhara</h2>
          <p className="text-muted-foreground">What makes us different</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Lock,
              title: "Complete Confidentiality",
              description: "End-to-end encryption ensures your data and conversations remain private and secure.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Clock,
              title: "24/7 Accessibility",
              description: "Access resources, tools, and AI support anytime, anywhere. Professional counselors available during business hours.",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: Brain,
              title: "AI-Powered Insights",
              description: "Personalized recommendations based on your assessments, habits, and goals to optimize your wellness journey.",
              color: "from-green-500 to-emerald-500"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Meet Our Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center mb-8">
          <h2>Meet Our Team</h2>
          <p className="text-muted-foreground">Dedicated professionals committed to your wellness</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-64">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center mb-8">
          <h2>Student Testimonials</h2>
          <p className="text-muted-foreground">Hear from those we've helped</p>
        </div>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/30 border-2">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Heart key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                    <div>
                      <p>{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center"
      >
        <Card className="shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <h2 className="text-white mb-4">Ready to Start Your Wellness Journey?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Take the first step towards better mental health. Explore our resources, book a session, or take a quick self-assessment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setCurrentPage('resources')}
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Explore Resources
              </Button>
              <Button
                onClick={() => setCurrentPage('appointments')}
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Book Appointment
              </Button>
              <Button
                onClick={() => setCurrentPage('assessments')}
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Take Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
