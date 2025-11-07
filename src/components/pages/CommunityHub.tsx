import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MessageSquare, Heart, Flag, Search, PlusCircle, Calendar, Users, Video } from 'lucide-react';
import { useAuth } from '../../App';
import { toast } from 'sonner';

type Post = {
  id: string;
  author: string;
  authorInitials: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  tags: string[];
};

type Comment = {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
};

type Event = {
  id: string;
  title: string;
  presenter: string;
  date: Date;
  time: string;
  type: 'webinar' | 'workshop';
  description: string;
  registered: boolean;
};

export default function CommunityHub() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Alex M.',
      authorInitials: 'AM',
      content: 'Just finished my first counseling session and I feel so much better. If you\'re hesitating, please reach out for help. It really makes a difference!',
      timestamp: new Date(2024, 10, 3, 14, 30),
      likes: 24,
      comments: [
        {
          id: '1',
          author: 'Sarah J.',
          content: 'So proud of you for taking that step! 💙',
          timestamp: new Date(2024, 10, 3, 15, 0)
        }
      ],
      tags: ['Support', 'Counseling']
    },
    {
      id: '2',
      author: 'Priya S.',
      authorInitials: 'PS',
      content: 'Does anyone have tips for managing exam anxiety? Finals are coming up and I\'m already feeling overwhelmed.',
      timestamp: new Date(2024, 10, 4, 10, 15),
      likes: 18,
      comments: [
        {
          id: '1',
          author: 'Michael C.',
          content: 'Try the breathing exercises in the Resources section. They help me a lot!',
          timestamp: new Date(2024, 10, 4, 10, 45)
        },
        {
          id: '2',
          author: 'Emma R.',
          content: 'Breaking study sessions into smaller chunks with the Pomodoro technique works for me.',
          timestamp: new Date(2024, 10, 4, 11, 0)
        }
      ],
      tags: ['Anxiety', 'Study Tips']
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Stress Management Workshop',
      presenter: 'Dr. Sarah Johnson',
      date: new Date(2024, 10, 15),
      time: '2:00 PM - 3:30 PM',
      type: 'workshop',
      description: 'Learn evidence-based techniques to manage academic and personal stress. Interactive session with Q&A.',
      registered: false
    },
    {
      id: '2',
      title: 'Mindfulness and Meditation Basics',
      presenter: 'Emma Rodriguez',
      date: new Date(2024, 10, 18),
      time: '6:00 PM - 7:00 PM',
      type: 'webinar',
      description: 'Introduction to mindfulness practices you can incorporate into your daily routine.',
      registered: true
    },
    {
      id: '3',
      title: 'Building Healthy Sleep Habits',
      presenter: 'Dr. Michael Chen',
      date: new Date(2024, 10, 20),
      time: '3:00 PM - 4:30 PM',
      type: 'workshop',
      description: 'Practical strategies for improving sleep quality and establishing consistent sleep schedules.',
      registered: false
    }
  ]);

  const [newPost, setNewPost] = useState({ content: '', tags: [] as string[] });
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast.error('Please write something');
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      author: user?.name || 'Anonymous',
      authorInitials: (user?.name || 'AN').split(' ').map(n => n[0]).join('').toUpperCase(),
      content: newPost.content,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      tags: newPost.tags
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', tags: [] });
    setIsPostDialogOpen(false);
    toast.success('Post created successfully!');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user?.name || 'Anonymous',
      content: newComment,
      timestamp: new Date()
    };

    setPosts(posts.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, comment] }
        : p
    ));
    setNewComment('');
    toast.success('Comment added');
  };

  const handleRegisterEvent = (eventId: string) => {
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, registered: !e.registered } : e
    ));
    toast.success('Registration updated!');
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2">Community Hub</h1>
            <p className="text-muted-foreground">
              Connect with peers, share experiences, and join events
            </p>
          </div>
          <Button
            onClick={() => setIsPostDialogOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>

        <Tabs defaultValue="forum" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="forum">
              <MessageSquare className="w-4 h-4 mr-2" />
              Forum
            </TabsTrigger>
            <TabsTrigger value="webinars">
              <Video className="w-4 h-4 mr-2" />
              Webinars
            </TabsTrigger>
            <TabsTrigger value="workshops">
              <Users className="w-4 h-4 mr-2" />
              Workshops
            </TabsTrigger>
          </TabsList>

          {/* Forum Tab */}
          <TabsContent value="forum">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                          {post.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p>{post.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {post.timestamp.toLocaleDateString()} at {post.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Flag className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="mb-4">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            {post.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPost(post)}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {post.comments.length}
                          </Button>
                        </div>

                        {/* Comments Preview */}
                        {post.comments.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border space-y-3">
                            {post.comments.slice(0, 2).map((comment) => (
                              <div key={comment.id} className="flex items-start space-x-3">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="bg-muted text-xs">
                                    {comment.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm">
                                    <span className="text-primary">{comment.author}</span> {comment.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {post.comments.length > 2 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedPost(post)}
                              >
                                View all {post.comments.length} comments
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Webinars Tab */}
          <TabsContent value="webinars">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.filter(e => e.type === 'webinar').map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <Users className="w-4 h-4" />
                            <span>{event.presenter}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • {event.time}
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <Video className="w-3 h-3 mr-1" />
                        Webinar
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <Button
                      onClick={() => handleRegisterEvent(event.id)}
                      variant={event.registered ? 'outline' : 'default'}
                      className={!event.registered ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 w-full' : 'w-full'}
                    >
                      {event.registered ? 'Registered ✓' : 'Register Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workshops Tab */}
          <TabsContent value="workshops">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.filter(e => e.type === 'workshop').map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <Users className="w-4 h-4" />
                            <span>{event.presenter}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • {event.time}
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <Users className="w-3 h-3 mr-1" />
                        Workshop
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <Button
                      onClick={() => handleRegisterEvent(event.id)}
                      variant={event.registered ? 'outline' : 'default'}
                      className={!event.registered ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 w-full' : 'w-full'}
                    >
                      {event.registered ? 'Registered ✓' : 'Register Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Post Dialog */}
        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share your thoughts, ask a question, or offer support..."
                rows={6}
              />
              <div>
                <label className="text-sm mb-2 block">Tags (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {['Support', 'Anxiety', 'Study Tips', 'Self-Care', 'Counseling'].map((tag) => (
                    <Badge
                      key={tag}
                      variant={newPost.tags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        setNewPost({
                          ...newPost,
                          tags: newPost.tags.includes(tag)
                            ? newPost.tags.filter(t => t !== tag)
                            : [...newPost.tags, tag]
                        });
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleCreatePost} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  Post
                </Button>
                <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Post Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedPost && (
              <>
                <DialogHeader>
                  <DialogTitle>Post by {selectedPost.author}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <p className="mb-4">{selectedPost.content}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedPost.timestamp.toLocaleDateString()} at {selectedPost.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h4 className="mb-4">Comments ({selectedPost.comments.length})</h4>
                    <div className="space-y-4 mb-6">
                      {selectedPost.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-muted">
                              {comment.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="text-primary">{comment.author}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(selectedPost.id)}
                      />
                      <Button onClick={() => handleAddComment(selectedPost.id)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
