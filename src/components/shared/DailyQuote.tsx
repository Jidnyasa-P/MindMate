import { useState, useEffect } from 'react';
import { Quote, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';

const quotes = [
  {
    text: "You are not your thoughts. You are the observer of your thoughts.",
    source: "Mindfulness Practice"
  },
  {
    text: "The mind is everything. What you think, you become.",
    source: "Buddha"
  },
  {
    text: "You have been assigned this mountain to show others it can be moved.",
    source: "Anonymous"
  },
  {
    text: "Yoga is the journey of the self, through the self, to the self.",
    source: "Bhagavad Gita"
  },
  {
    text: "Set peace of mind as your highest goal and organize your life around it.",
    source: "Brian Tracy"
  },
  {
    text: "One small crack does not mean you are broken, it means you were put to the test and didn't fall apart.",
    source: "Linda Poindexter"
  },
  {
    text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    source: "Nido Qubein"
  },
  {
    text: "When the mind is pure, joy follows like a shadow that never leaves.",
    source: "Bhagavad Gita"
  },
  {
    text: "Taking care of yourself doesn't mean me first, it means me too.",
    source: "L.R. Knost"
  },
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    source: "Dan Millman"
  }
];

export default function DailyQuote() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show quote only once per session after a delay
    if (!hasShown) {
      const timer = setTimeout(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setCurrentQuote(randomQuote);
        setIsVisible(true);
        setHasShown(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  // Auto-hide after 10 seconds
  useEffect(() => {
    if (isVisible && hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasShown]);

  return (
    <AnimatePresence>
      {isVisible && hasShown && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-40 max-w-md"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/30 rounded-2xl shadow-lg p-6 border border-indigo-200/50 dark:border-purple-500/30">
            <div className="flex items-start justify-between mb-3">
              <Quote className="w-8 h-8 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 -mt-1 -mr-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-foreground mb-3 italic">"{currentQuote.text}"</p>
            <p className="text-sm text-muted-foreground">— {currentQuote.source}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
