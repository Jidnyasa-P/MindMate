# MindCare - University Student Mental Health Support Platform

A comprehensive, responsive mental health support web application designed specifically for university students.

## Features

### 🔐 Authentication & User Management
- Role-based access (Student, Counselor, Admin)
- Secure login/signup with form validation
- User profiles with institution and branch information

### 🏠 Dashboard & Landing
- Welcome carousel with soothing visuals
- Statistics with animated counters
- Pros/cons of mental health platforms
- Real-life success stories
- Mission & vision statements
- Team member profiles (3 members)
- Testimonials carousel
- Daily motivational quotes (including Bhagavad Gita)

### 📚 Resource Hub
- Categorized resources:
  - Meditation & Yoga videos
  - Podcasts & Relaxation Audio
  - Articles & Guides
  - Educational Videos
  - Screen Time Management Tools
  - Self-Care Tips
- Search and filter functionality
- Resource preview modal

### 📝 Journaling & Mood Tracker
- Daily journal entries with title, content, tags
- Mood tracking (happy, neutral, sad, anxious, calm)
- Calendar view with mood indicators
- Weekly mood trend visualization
- Timeline/list view of entries

### 🎯 Habit Tracker
- Create custom habits with icons and colors
- Progress rings and bars
- Streak counters
- Target setting (duration/frequency)
- Weekly progress summaries
- Motivational messages on completion

### 🗓️ Appointment Booking System
- Browse counselor profiles with specializations
- View availability and book time slots
- Video call and in-person options
- Appointment reason notes
- Booking confirmation workflow
- Manage appointments (view, cancel)
- Email notifications

### 📊 Self-Assessments
- PHQ-9 (Depression screening)
- GAD-7 (Anxiety screening)
- Stress evaluation
- Sleep quality assessment
- Burnout test
- Progress indicator
- AI-generated recommendations based on severity:
  - Minimal: Resource suggestions
  - Mild: Relaxation techniques
  - Moderate: Counselor booking recommendation
  - Severe: Crisis resources and immediate support

### 👥 Community Hub
- Peer forum with posts, comments, likes
- Image support and tags
- Moderation flags
- Webinars listing with registration
- Workshops with event details
- Search and filter functionality

### 📈 Admin Analytics (Admin Only)
- Total users and active user metrics
- Institution and branch statistics
- Assessment outcome aggregates
- Engagement metrics by feature
- Appointment statistics
- Trend visualizations (bar, line, pie charts)
- AI-generated insights and recommendations
- Exportable reports (PDF/CSV)

### 💬 AI Chatbot Assistant
- Floating chat widget
- Context-aware responses
- Feature navigation help
- Resource recommendations
- Crisis support guidance
- FAQ assistance

### 🎨 Design System
- Calm gradient theme (light blue, lavender, mint)
- Rounded cards with soft shadows
- Clean sans-serif typography
- Smooth micro-interactions
- Motion animations
- Dark/light mode support
- Fully responsive (mobile/tablet/desktop)

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Shadcn/ui** - Component library
- **Sonner** - Toast notifications

## Project Structure

```
├── App.tsx                          # Main app with routing & auth context
├── components/
│   ├── pages/
│   │   ├── LoginPage.tsx            # Login/signup with role selection
│   │   ├── Dashboard.tsx            # Main dashboard with all sections
│   │   ├── ResourceHub.tsx          # Categorized resources
│   │   ├── JournalPage.tsx          # Journal & mood tracker
│   │   ├── HabitsPage.tsx           # Habit tracking
│   │   ├── AppointmentsPage.tsx     # Counselor booking system
│   │   ├── AssessmentsPage.tsx      # Self-assessment quizzes
│   │   ├── CommunityHub.tsx         # Forum, webinars, workshops
│   │   └── AdminAnalytics.tsx       # Admin dashboard
│   ├── shared/
│   │   ├── Navbar.tsx               # Navigation with role-based menu
│   │   ├── Footer.tsx               # Persistent footer
│   │   ├── ChatBot.tsx              # AI assistant
│   │   ├── DailyQuote.tsx           # Rotating motivational quotes
│   │   └── ProgressRing.tsx         # Circular progress component
│   ├── ui/                          # Reusable UI components
│   └── figma/
│       └── ImageWithFallback.tsx    # Image component with fallback
└── styles/
    └── globals.css                  # Global styles & theme tokens
```

## Key Features

### Accessibility
- Keyboard navigation
- ARIA labels
- High contrast support
- Screen reader friendly

### Privacy & Security
- Confidential assessments
- Private journal entries
- Secure appointment booking
- Crisis resources readily available

### User Experience
- Smooth page transitions
- Loading states
- Error handling
- Toast notifications
- Responsive design
- Dark/light mode

## Getting Started

1. The application uses a demo authentication system - any email/password combination will work
2. Select your role (Student/Counselor/Admin) during signup/login
3. Navigate through features using the top navigation bar
4. Access the AI chatbot from the floating button in bottom-right
5. Toggle dark/light mode from the navbar

## Crisis Resources

- **988** - Suicide & Crisis Lifeline (24/7)
- **741741** - Crisis Text Line (Text "HELLO")
- **911** - Emergency Services

---

Built with care for university student mental wellness 💙
