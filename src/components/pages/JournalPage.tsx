import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PlusCircle, Calendar as CalendarIcon, List, Smile, Meh, Frown, HeartCrack, Sparkles, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Mood = 'happy' | 'neutral' | 'sad' | 'anxious' | 'calm';
type Tag = 'Grateful' | 'Reflective' | 'Stressed' | 'Hopeful' | 'Overwhelmed';

type JournalEntry = {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: Mood;
  tags: Tag[];
  images?: string[];
};

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(2024, 10, 1),
      title: 'Feeling grateful today',
      content: 'Had a great study session with friends. Really appreciate their support during exam prep.',
      mood: 'happy',
      tags: ['Grateful']
    },
    {
      id: '2',
      date: new Date(2024, 10, 3),
      title: 'Exam stress building up',
      content: 'Two exams next week. Feeling a bit overwhelmed but trying to stay organized.',
      mood: 'anxious',
      tags: ['Stressed', 'Overwhelmed']
    },
    {
      id: '3',
      date: new Date(2024, 10, 4),
      title: 'Meditation helped',
      content: 'Did the 10-minute morning meditation from resources. Felt much calmer afterward.',
      mood: 'calm',
      tags: ['Reflective']
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral' as Mood,
    tags: [] as Tag[]
  });
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-500' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-gray-500' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-500' },
    { value: 'anxious', label: 'Anxious', icon: HeartCrack, color: 'text-orange-500' },
    { value: 'calm', label: 'Calm', icon: Sparkles, color: 'text-purple-500' }
  ];

  const tagOptions: Tag[] = ['Grateful', 'Reflective', 'Stressed', 'Hopeful', 'Overwhelmed'];

  const handleSaveEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      toast.error('Please fill in title and content');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      ...newEntry
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: '', content: '', mood: 'neutral', tags: [] });
    setIsDialogOpen(false);
    toast.success('Journal entry saved!');
  };

  const toggleTag = (tag: Tag) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const getMoodIcon = (mood: Mood) => {
    const option = moodOptions.find(m => m.value === mood);
    return option ? option.icon : Meh;
  };

  const getMoodColor = (mood: Mood) => {
    const option = moodOptions.find(m => m.value === mood);
    return option ? option.color : 'text-gray-500';
  };

  const getMoodData = () => {
    const moodValues: Record<Mood, number> = {
      happy: 5,
      calm: 4,
      neutral: 3,
      sad: 2,
      anxious: 1
    };

    return entries
      .slice(0, 7)
      .reverse()
      .map(entry => ({
        date: entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: moodValues[entry.mood],
        moodLabel: entry.mood
      }));
  };

  const getEntriesForDate = (date: Date) => {
    return entries.filter(entry =>
      entry.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="mb-2">Journal & Mood Tracker</h1>
            <p className="text-muted-foreground">
              Document your thoughts and track your emotional well-being
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>

        {/* Mood Chart */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Mood Trends</CardTitle>
            <CardDescription>Track your emotional patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={getMoodData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      return (
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-border">
                          <p className="text-sm">{payload[0].payload.date}</p>
                          <p className="text-sm capitalize">Mood: {payload[0].payload.moodLabel}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="list">
            <List className="w-4 h-4 mr-2" />
            List View
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar View
          </TabsTrigger>
        </TabsList>

        {/* List View */}
        <TabsContent value="list">
          <div className="space-y-4">
            {entries.map((entry) => {
              const MoodIcon = getMoodIcon(entry.mood);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center space-x-3">
                            <MoodIcon className={`w-6 h-6 ${getMoodColor(entry.mood)}`} />
                            <span>{entry.title}</span>
                          </CardTitle>
                          <CardDescription>
                            {entry.date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{entry.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {entries.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <PlusCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="mb-2">No journal entries yet</h3>
                  <p className="text-muted-foreground mb-4">Start documenting your thoughts and feelings</p>
                  <Button onClick={() => setIsDialogOpen(true)}>Create First Entry</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Select a Date</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  modifiers={{
                    hasEntry: entries.map(e => e.date)
                  }}
                  modifiersStyles={{
                    hasEntry: {
                      fontWeight: 'bold',
                      color: '#6366f1'
                    }
                  }}
                />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>
                    Entries for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getEntriesForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                      {getEntriesForDate(selectedDate).map((entry) => {
                        const MoodIcon = getMoodIcon(entry.mood);
                        return (
                          <div
                            key={entry.id}
                            className="p-4 rounded-lg bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
                            onClick={() => setSelectedEntry(entry)}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <MoodIcon className={`w-5 h-5 ${getMoodColor(entry.mood)}`} />
                              <h4>{entry.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{entry.content}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {entry.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No entries for this date</p>
                      <Button
                        onClick={() => setIsDialogOpen(true)}
                        variant="outline"
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create Entry
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Entry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Journal Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Date</label>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>{selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="text-sm mb-2 block">Title</label>
              <Input
                id="title"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                placeholder="Give your entry a title..."
              />
            </div>

            <div>
              <label htmlFor="content" className="text-sm mb-2 block">Content</label>
              <Textarea
                id="content"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="How are you feeling? What's on your mind?"
                rows={6}
              />
            </div>

            <div>
              <label className="text-sm mb-3 block">How are you feeling?</label>
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={newEntry.mood === option.value ? 'default' : 'outline'}
                      onClick={() => setNewEntry({ ...newEntry, mood: option.value as Mood })}
                      className="flex-col h-auto py-3"
                    >
                      <Icon className={`w-6 h-6 mb-1 ${option.color}`} />
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm mb-3 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => (
                  <Badge
                    key={tag}
                    variant={newEntry.tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button onClick={handleSaveEntry} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                Save Entry
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Entry Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEntry && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3">
                  {(() => {
                    const MoodIcon = getMoodIcon(selectedEntry.mood);
                    return <MoodIcon className={`w-6 h-6 ${getMoodColor(selectedEntry.mood)}`} />;
                  })()}
                  <DialogTitle>{selectedEntry.title}</DialogTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedEntry.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedEntry.content}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
