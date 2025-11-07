import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Search, Play, Headphones, BookOpen, Video, Clock, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration?: string;
  image: string;
  content?: string;
};

export default function ResourceHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const resources: Resource[] = [
    // Meditation & Yoga
    {
      id: '1',
      title: '10-Minute Morning Meditation',
      description: 'Start your day with clarity and calm. Perfect for beginners.',
      category: 'meditation',
      duration: '10 min',
      image: 'https://images.unsplash.com/photo-1554885730-e5d7a39e0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzYyMjI1MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Guided meditation focusing on breath awareness and body scanning. Ideal for setting a positive intention for your day.'
    },
    {
      id: '2',
      title: 'Stress-Relief Yoga Flow',
      description: 'Gentle yoga sequence to release tension and anxiety.',
      category: 'meditation',
      duration: '20 min',
      image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzYyMTk3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Flow through poses designed to calm the nervous system and release physical tension from stress.'
    },
    {
      id: '3',
      title: 'Mindful Breathing Techniques',
      description: 'Learn powerful breathing exercises for instant calm.',
      category: 'meditation',
      duration: '15 min',
      image: 'https://images.unsplash.com/photo-1554885730-e5d7a39e0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzYyMjI1MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Master box breathing, 4-7-8 technique, and diaphragmatic breathing for anxiety management.'
    },

    // Podcasts & Audio
    {
      id: '4',
      title: 'The Mindful Student Podcast',
      description: 'Weekly episodes on navigating university life mindfully.',
      category: 'podcasts',
      duration: '30-45 min',
      image: 'https://images.unsplash.com/photo-1621887348744-6b0444f8a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjIxNjI4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Expert interviews and student stories covering exam stress, relationships, career anxiety, and more.'
    },
    {
      id: '5',
      title: 'Nature Sounds for Focus',
      description: 'Ambient soundscapes to enhance concentration while studying.',
      category: 'podcasts',
      duration: '60 min',
      image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzYyMTk3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Rain, ocean waves, forest sounds, and white noise designed for deep focus and productivity.'
    },
    {
      id: '6',
      title: 'Sleep Stories Collection',
      description: 'Calming narratives to help you drift off peacefully.',
      category: 'podcasts',
      duration: '20-40 min',
      image: 'https://images.unsplash.com/photo-1554885730-e5d7a39e0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzYyMjI1MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Soothing bedtime stories read in gentle voices to promote relaxation and healthy sleep.'
    },

    // Articles & Guides
    {
      id: '7',
      title: 'Managing Exam Anxiety: A Complete Guide',
      description: 'Evidence-based strategies to cope with test stress.',
      category: 'articles',
      duration: '10 min read',
      image: 'https://images.unsplash.com/photo-1729824186959-ba83cbd1978d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBoYXBweXxlbnwxfHx8fDE3NjIyMDQ2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Learn preparation techniques, in-the-moment coping skills, and long-term strategies for reducing exam anxiety.'
    },
    {
      id: '8',
      title: 'Building Healthy Sleep Habits in College',
      description: 'Science-backed tips for better sleep despite a busy schedule.',
      category: 'articles',
      duration: '8 min read',
      image: 'https://images.unsplash.com/photo-1621887348744-6b0444f8a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjIxNjI4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Establish a consistent sleep schedule, create a bedtime routine, and optimize your sleep environment.'
    },
    {
      id: '9',
      title: 'Recognizing and Preventing Burnout',
      description: 'Identify early warning signs and take preventive action.',
      category: 'articles',
      duration: '12 min read',
      image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNTA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Understanding the stages of burnout, setting boundaries, and implementing self-care practices.'
    },

    // Educational Videos
    {
      id: '10',
      title: 'Understanding Anxiety Disorders',
      description: 'Educational video on types, symptoms, and treatment options.',
      category: 'videos',
      duration: '18 min',
      image: 'https://images.unsplash.com/photo-1621887348744-6b0444f8a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjIxNjI4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Comprehensive overview of anxiety disorders presented by clinical psychologists.'
    },
    {
      id: '11',
      title: 'Cognitive Behavioral Therapy Basics',
      description: 'Introduction to CBT techniques you can use today.',
      category: 'videos',
      duration: '25 min',
      image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNTA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Learn how to identify and challenge negative thought patterns using proven CBT methods.'
    },

    // Screen Time Management
    {
      id: '12',
      title: 'Digital Detox Challenge',
      description: '7-day program to build a healthier relationship with technology.',
      category: 'screentime',
      duration: '7 days',
      image: 'https://images.unsplash.com/photo-1729824186959-ba83cbd1978d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBoYXBweXxlbnwxfHx8fDE3NjIyMDQ2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Gradual reduction strategies, mindful tech use tips, and offline activity suggestions.'
    },
    {
      id: '13',
      title: 'Focus Timer & Pomodoro Technique',
      description: 'Boost productivity with structured work intervals.',
      category: 'screentime',
      duration: 'Tool',
      image: 'https://images.unsplash.com/photo-1621887348744-6b0444f8a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjB3ZWxsbmVzcyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjIxNjI4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Interactive timer tool implementing the Pomodoro Technique for better focus and screen time management.'
    },

    // Self-care Tips
    {
      id: '14',
      title: '30 Quick Self-Care Ideas',
      description: 'Simple practices you can do in 5 minutes or less.',
      category: 'selfcare',
      duration: '5 min read',
      image: 'https://images.unsplash.com/photo-1554885730-e5d7a39e0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzYyMjI1MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'From stretching to gratitude journaling, discover micro-practices for daily self-care.'
    },
    {
      id: '15',
      title: 'Nutrition for Mental Health',
      description: 'How diet impacts mood, energy, and cognitive function.',
      category: 'selfcare',
      duration: '15 min read',
      image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzYyMTk3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Brain-boosting foods, meal planning tips, and the gut-brain connection explained.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'meditation', label: 'Meditation & Yoga', icon: Heart },
    { id: 'podcasts', label: 'Podcasts & Audio', icon: Headphones },
    { id: 'articles', label: 'Articles & Guides', icon: BookOpen },
    { id: 'videos', label: 'Educational Videos', icon: Video },
    { id: 'screentime', label: 'Screen Time Tools', icon: Clock },
    { id: 'selfcare', label: 'Self-Care Tips', icon: Heart }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getResourcesByCategory = (categoryId: string) => {
    if (categoryId === 'all') return filteredResources;
    return filteredResources.filter(r => r.category === categoryId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meditation': return Heart;
      case 'podcasts': return Headphones;
      case 'articles': return BookOpen;
      case 'videos': return Video;
      case 'screentime': return Clock;
      case 'selfcare': return Heart;
      default: return BookOpen;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2">Resource Hub</h1>
        <p className="text-muted-foreground mb-6">
          Explore our comprehensive library of mental health resources, tools, and educational content
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{category.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getResourcesByCategory(category.id).map((resource) => {
                const Icon = getCategoryIcon(resource.category);
                return (
                  <Card
                    key={resource.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedResource(resource)}
                  >
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        View Resource
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>

            {getResourcesByCategory(category.id).length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-muted-foreground">No resources found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Resource Detail Dialog */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-3xl">
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedResource.title}</DialogTitle>
                <DialogDescription>{selectedResource.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={selectedResource.image}
                    alt={selectedResource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted-foreground">{selectedResource.content}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{selectedResource.duration}</span>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Now
                  </Button>
                  <Button variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
