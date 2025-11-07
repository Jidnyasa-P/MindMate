import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PlusCircle, Flame, Target, CheckCircle, Edit, Trash2, Trophy, TrendingUp, Dumbbell, Book, Music, Coffee, Heart, Moon } from 'lucide-react';
import { toast } from 'sonner';
import ProgressRing from '../shared/ProgressRing';

type HabitIcon = 'dumbbell' | 'book' | 'music' | 'coffee' | 'heart' | 'moon';
type FrequencyType = 'daily' | 'weekly';

type Habit = {
  id: string;
  name: string;
  icon: HabitIcon;
  target: number;
  current: number;
  frequency: FrequencyType;
  unit: string;
  streak: number;
  lastCompleted?: Date;
  color: string;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Exercise',
      icon: 'dumbbell',
      target: 30,
      current: 25,
      frequency: 'daily',
      unit: 'minutes',
      streak: 7,
      color: '#10b981'
    },
    {
      id: '2',
      name: 'Reading',
      icon: 'book',
      target: 30,
      current: 15,
      frequency: 'daily',
      unit: 'minutes',
      streak: 3,
      color: '#6366f1'
    },
    {
      id: '3',
      name: 'Meditation',
      icon: 'heart',
      target: 10,
      current: 10,
      frequency: 'daily',
      unit: 'minutes',
      streak: 12,
      color: '#8b5cf6'
    },
    {
      id: '4',
      name: 'Sleep Schedule',
      icon: 'moon',
      target: 7,
      current: 6.5,
      frequency: 'daily',
      unit: 'hours',
      streak: 5,
      color: '#06b6d4'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [newHabit, setNewHabit] = useState({
    name: '',
    icon: 'heart' as HabitIcon,
    target: 30,
    frequency: 'daily' as FrequencyType,
    unit: 'minutes',
    color: '#6366f1'
  });

  const iconOptions = [
    { value: 'dumbbell', Icon: Dumbbell, label: 'Exercise' },
    { value: 'book', Icon: Book, label: 'Reading' },
    { value: 'music', Icon: Music, label: 'Music' },
    { value: 'coffee', Icon: Coffee, label: 'Hydration' },
    { value: 'heart', Icon: Heart, label: 'Wellness' },
    { value: 'moon', Icon: Moon, label: 'Sleep' }
  ];

  const colorOptions = [
    '#10b981', '#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'
  ];

  const getIcon = (iconName: HabitIcon) => {
    const option = iconOptions.find(i => i.value === iconName);
    return option ? option.Icon : Heart;
  };

  const handleSaveHabit = () => {
    if (!newHabit.name || !newHabit.target) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingHabit) {
      setHabits(habits.map(h =>
        h.id === editingHabit.id
          ? { ...h, ...newHabit }
          : h
      ));
      toast.success('Habit updated!');
    } else {
      const habit: Habit = {
        id: Date.now().toString(),
        ...newHabit,
        current: 0,
        streak: 0
      };
      setHabits([...habits, habit]);
      toast.success('Habit created!');
    }

    setNewHabit({ name: '', icon: 'heart', target: 30, frequency: 'daily', unit: 'minutes', color: '#6366f1' });
    setEditingHabit(null);
    setIsDialogOpen(false);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
    toast.success('Habit deleted');
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setNewHabit({
      name: habit.name,
      icon: habit.icon,
      target: habit.target,
      frequency: habit.frequency,
      unit: habit.unit,
      color: habit.color
    });
    setIsDialogOpen(true);
  };

  const handleUpdateProgress = (habitId: string, increment: number) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const newCurrent = Math.max(0, Math.min(h.target, h.current + increment));
        const wasCompleted = h.current >= h.target;
        const isNowCompleted = newCurrent >= h.target;

        if (!wasCompleted && isNowCompleted) {
          toast.success('🎉 Habit completed! Streak increased!');
          return { ...h, current: newCurrent, streak: h.streak + 1, lastCompleted: new Date() };
        }

        return { ...h, current: newCurrent };
      }
      return h;
    }));
  };

  const getWeeklyProgress = () => {
    const completed = habits.filter(h => h.current >= h.target).length;
    const total = habits.length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getTotalStreak = () => {
    return habits.reduce((sum, h) => sum + h.streak, 0);
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
            <h1 className="mb-2">Habit Tracker</h1>
            <p className="text-muted-foreground">
              Build healthy routines and track your progress
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingHabit(null);
              setNewHabit({ name: '', icon: 'heart', target: 30, frequency: 'daily', unit: 'minutes', color: '#6366f1' });
              setIsDialogOpen(true);
            }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Habit
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Streak Days</p>
                  <p className="text-3xl">{getTotalStreak()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Habits</p>
                  <p className="text-3xl">{habits.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Today's Progress</p>
                  <p className="text-3xl">{Math.round(getWeeklyProgress())}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((habit) => {
          const Icon = getIcon(habit.icon);
          const progress = (habit.current / habit.target) * 100;
          const isCompleted = habit.current >= habit.target;

          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className={`shadow-lg hover:shadow-xl transition-all ${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: habit.color + '20' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: habit.color }} />
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{habit.name}</span>
                          {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </CardTitle>
                        <CardDescription>
                          {habit.target} {habit.unit} {habit.frequency}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditHabit(habit)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteHabit(habit.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Ring */}
                  <div className="flex justify-center">
                    <ProgressRing
                      progress={progress}
                      size={100}
                      strokeWidth={8}
                      color={habit.color}
                      showLabel={false}
                    />
                  </div>

                  {/* Progress Info */}
                  <div className="text-center">
                    <p className="text-2xl mb-1">
                      {habit.current} / {habit.target} {habit.unit}
                    </p>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Streak */}
                  <div className="flex items-center justify-center space-x-2 text-orange-500">
                    <Flame className="w-5 h-5" />
                    <span>{habit.streak} day streak</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateProgress(habit.id, -5)}
                      disabled={habit.current === 0}
                    >
                      -5
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateProgress(habit.id, 5)}
                      disabled={isCompleted}
                    >
                      +5
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateProgress(habit.id, habit.target - habit.current)}
                      disabled={isCompleted}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      Done
                    </Button>
                  </div>

                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center"
                    >
                      <Trophy className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-1" />
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Completed! Great job! 🎉
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {habits.length === 0 && (
          <Card className="col-span-full text-center py-12 shadow-lg">
            <CardContent>
              <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="mb-2">No habits yet</h3>
              <p className="text-muted-foreground mb-4">Start building healthy routines today</p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Create First Habit
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Habit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingHabit ? 'Edit Habit' : 'Create New Habit'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="habitName" className="text-sm mb-2 block">Habit Name</label>
              <Input
                id="habitName"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                placeholder="e.g., Morning Exercise"
              />
            </div>

            <div>
              <label className="text-sm mb-3 block">Icon</label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map((option) => {
                  const IconComp = option.Icon;
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={newHabit.icon === option.value ? 'default' : 'outline'}
                      onClick={() => setNewHabit({ ...newHabit, icon: option.value as HabitIcon })}
                      className="h-12 w-12 p-0"
                    >
                      <IconComp className="w-5 h-5" />
                    </Button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm mb-3 block">Color</label>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewHabit({ ...newHabit, color })}
                    className={`w-10 h-10 rounded-full transition-transform ${
                      newHabit.color === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="target" className="text-sm mb-2 block">Target</label>
                <Input
                  id="target"
                  type="number"
                  value={newHabit.target}
                  onChange={(e) => setNewHabit({ ...newHabit, target: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label htmlFor="unit" className="text-sm mb-2 block">Unit</label>
                <Select value={newHabit.unit} onValueChange={(value) => setNewHabit({ ...newHabit, unit: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="times">Times</SelectItem>
                    <SelectItem value="pages">Pages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm mb-2 block">Frequency</label>
              <Select value={newHabit.frequency} onValueChange={(value) => setNewHabit({ ...newHabit, frequency: value as FrequencyType })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button onClick={handleSaveHabit} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                {editingHabit ? 'Update Habit' : 'Create Habit'}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
