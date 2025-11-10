import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const predefinedResponses: Record<string, string> = {
  hello: "Hello! I'm here to help you navigate MindMate. How can I assist you today?",
  hi: "Hi there! Welcome to MindMate. I'm your virtual assistant. How can I help you?",
  help: "I can help you with:\n• Finding resources\n• Booking appointments with counselors\n• Taking self-assessments (PHQ-9, GAD-7, Stress tests)\n• Navigating the platform\n• Crisis support information\n• Journaling and mood tracking\n• Joining community discussions",
  appointment: "To book an appointment:\n1. Go to the Appointments page\n2. Browse counselors by specialization and area\n3. Select a counselor\n4. Choose your preferred date and time\n5. Enter your reason for the appointment\n6. Confirm booking\n\nYou'll receive a confirmation notification!",
  counselor: "Our counselors specialize in various areas including anxiety, depression, stress management, and academic pressure. You can filter counselors by area and specialization to find the best match for you.",
  assessment: "You can take confidential self-assessments:\n• PHQ-9 - Depression screening\n• GAD-7 - Anxiety assessment\n• Stress Level Test\n• Sleep Quality Assessment\n• Burnout Evaluation\n\nBased on your results, I'll recommend appropriate resources or suggest booking a counselor.",
  resources: "Visit the Resources page to find:\n• Meditation & Yoga videos\n• Relaxation podcasts\n• Mental health articles\n• Educational videos\n• Screen time management tools\n• Self-care tips\n\nAll resources are categorized for easy access!",
  crisis: "🚨 If you're in crisis:\n• Call 988 (Suicide & Crisis Lifeline) - 24/7\n• Text 'HELLO' to 741741 (Crisis Text Line)\n• Call 911 for emergencies\n• Book an immediate appointment with our counselors\n\nYou're not alone - help is available.",
  journal: "The Journal page lets you:\n• Create daily entries with titles and content\n• Track your mood (happy, sad, anxious, calm, neutral)\n• Add tags to categorize entries\n• View mood trends on a chart\n• Switch between list and calendar views\n\nIt's a great way to reflect on your mental health journey!",
  habits: "Build healthy habits with our Habit Tracker:\n• Create custom habits with icons\n• Set daily/weekly targets\n• Track progress with visual rings\n• Monitor your streaks\n• Get motivational messages\n\nSmall steps lead to big changes!",
  community: "Join our Community Hub to:\n• Post in the peer support forum\n• Comment and like posts\n• Register for webinars and workshops\n• Connect with students facing similar challenges\n• Share your experiences anonymously\n\nYou're not alone in this journey!",
  language: "MindMate supports multiple languages! Click the language selector (globe icon) in the top navigation to choose from English, Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, and Kannada.",
  area: "You can search for counselors by area! When booking an appointment, use the area filter to find counselors near you for in-person sessions.",
  anxiety: "Feeling anxious? Here's what you can do:\n1. Take the GAD-7 assessment to understand your anxiety level\n2. Try breathing exercises from Resources\n3. Practice meditation\n4. Consider booking a counselor specializing in anxiety\n5. Join peer support groups in Community",
  depression: "If you're feeling depressed:\n1. Take the PHQ-9 assessment\n2. Reach out to a counselor - you don't have to face this alone\n3. Explore mood-boosting resources\n4. Track your mood in the Journal\n5. Call 988 if you're having thoughts of self-harm",
  stress: "Managing stress:\n1. Take our Stress Assessment\n2. Try the Pomodoro technique for studying\n3. Practice regular meditation\n4. Build healthy habits (sleep, exercise)\n5. Talk to a counselor about stress management techniques",
  exam: "Exam anxiety is common! Try:\n• Breaking study sessions into chunks\n• Using our meditation resources\n• Tracking study habits\n• Talking to counselors about anxiety management\n• Joining study-related discussions in Community",
  sleep: "For better sleep:\n• Maintain a consistent sleep schedule\n• Take our Sleep Quality Assessment\n• Avoid screens before bed\n• Try our guided sleep meditations\n• Track sleep patterns in Habits",
  default: "I'm here to help! You can ask me about:\n• Booking appointments\n• Self-assessments\n• Resources\n• Journal & mood tracking\n• Habits\n• Community\n• Crisis support\n\nWhat would you like to know more about?"
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your MindMate assistant. I'm here to help you navigate the platform and answer your questions. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with better matching
    setTimeout(() => {
      const lowerInput = currentInput.toLowerCase();
      let response = predefinedResponses.default;

      // Check for multiple keywords
      const keywords = Object.keys(predefinedResponses);
      const matchedKeywords = keywords.filter(key => lowerInput.includes(key));

      if (matchedKeywords.length > 0) {
        // Use the first matched keyword
        response = predefinedResponses[matchedKeywords[0]];
      } else if (lowerInput.includes('how') || lowerInput.includes('what') || lowerInput.includes('where')) {
        response = predefinedResponses.help;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white">MindMate Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '380px' }}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
