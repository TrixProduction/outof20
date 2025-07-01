# OutOf20 - Student Portal Project Explanation

## Overview

**OutOf20** is a modern student portal application designed for students at the University of Lille (IUT). It provides a clean, user-friendly interface to view academic grades, course evaluations, and GPA tracking with real-time notifications for new grades.

## Project Architecture

The project follows a modern serverless architecture with the following components:

### 1. Frontend (`frontend/`)
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite (fast bundler and dev server)
- **Styling**: Tailwind CSS 3.4.1 for utility-first styling
- **UI Components**: Custom components with Lucide React icons
- **Code Quality**: ESLint with TypeScript configurations

### 2. Backend (`bulletins/`)
- **Platform**: Google Cloud Functions Gen 2 (Node.js 20)
- **Architecture**: Serverless functions with Firebase integration
- **Database**: Google Firestore for data persistence
- **Notifications**: ntfy.sh integration for push notifications

## Key Features

### Frontend Features
1. **Dashboard View**: Overview of academic performance with key metrics
2. **UE (Teaching Units) Cards**: Interactive cards showing course averages
3. **Detailed Evaluations**: Modal views with complete evaluation details
4. **Recent Notes**: Quick access to recently added grades
5. **All Notes View**: Comprehensive view with search and filtering
6. **Notification Setup**: Easy configuration for mobile push notifications
7. **Responsive Design**: Mobile-first approach with modern UI/UX
8. **Demo Mode**: Allows users to explore the interface without real data

### Backend Features
1. **CAS Authentication**: Secure login integration with University of Lille's CAS system
2. **Grade Synchronization**: Automated fetching and processing of academic data
3. **Change Detection**: Intelligent monitoring for new grades or GPA changes
4. **Push Notifications**: Real-time alerts via ntfy.sh when new grades are detected
5. **Data Transformation**: Conversion of raw university API data into clean JSON format

## Technical Implementation

### Frontend Structure
```
frontend/src/
├── components/           # React components
│   ├── Header.tsx       # Main header with GPA and semester info
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── UECard.tsx       # Course unit cards
│   ├── EvaluationModal.tsx  # Detailed evaluation viewer
│   ├── AllNotes.tsx     # Comprehensive notes view
│   ├── RecentNotes.tsx  # Recent grades display
│   └── NotificationSetup.tsx # Push notification setup
├── lib/
│   └── supabase.ts      # API integration and data fetching
├── types/
│   └── grades.ts        # TypeScript type definitions
└── App.tsx              # Main application component
```

### Backend Functions
1. **`getNotesSummary`**: 
   - Authenticates with University of Lille CAS system
   - Fetches raw grade data from university bulletin API
   - Transforms and cleans data into structured JSON format
   - Returns academic summary with courses, evaluations, and GPA

2. **`syncNotesSummary`**:
   - Calls `getNotesSummary` to get latest data
   - Compares with stored data in Firestore
   - Detects changes in number of grades or GPA
   - Sends push notifications for new grades
   - Updates Firestore with latest information

### Data Flow
1. **Scheduled Sync**: Cloud Scheduler triggers `syncNotesSummary` every 10 minutes
2. **Change Detection**: Function compares current data with Firestore snapshot
3. **Notification**: If changes detected, sends formatted notification via ntfy.sh
4. **Frontend Fetch**: User interface calls `getNotesSummary` to display data
5. **Real-time Updates**: Users receive push notifications on mobile devices

## Key Technologies

### Frontend Stack
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript**: Type safety and better development experience
- **Vite**: Fast bundling and hot module replacement
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Modern icon library

### Backend Stack
- **Google Cloud Functions**: Serverless compute platform
- **Firebase Admin SDK**: Server-side Firebase integration
- **Firestore**: NoSQL document database
- **Node.js 20**: Runtime environment with ES modules
- **Cheerio**: Server-side HTML parsing for web scraping
- **node-fetch**: HTTP client for API requests

### External Integrations
- **University of Lille CAS**: Single sign-on authentication
- **University Bulletin API**: Official grade data source
- **ntfy.sh**: Push notification service
- **Google Cloud Scheduler**: Automated task scheduling

## Security Features

1. **Environment Variables**: All credentials stored securely as environment variables
2. **CAS Authentication**: Official university authentication system
3. **CORS Configuration**: Proper cross-origin resource sharing setup
4. **No Hardcoded Secrets**: All sensitive data externalized
5. **Serverless Security**: Leverages Google Cloud's security infrastructure

## Deployment Architecture

### Frontend Deployment
- Built with `npm run build` creating optimized static files
- Deployed to Google Cloud Hosting or similar static hosting service
- CDN distribution for fast global access

### Backend Deployment
- Functions deployed to Google Cloud with specific runtime configurations
- Environment variables set during deployment for security
- Automated scaling based on demand
- Regional deployment for low latency

### Monitoring & Scheduling
- Cloud Scheduler runs sync function every 10 minutes
- Firestore tracks grade changes and timestamps
- Comprehensive error handling and logging

## Data Model

### Firestore Structure
```
subinfos/
└── current/
    ├── notesCount: number     # Total number of evaluations
    ├── moyenne: number        # Current GPA
    └── updatedAt: timestamp   # Last update time
```

### Grade Data Structure
```typescript
{
  semestre: number,
  annee_universitaire: string,
  moyenne_generale: number,
  rang: { position: number, total: number },
  UE: {
    [ueCode]: {
      titre: string,
      moyenne: number
    }
  },
  evaluations: {
    [ueCode]: Array<{
      evaluation: string,
      note: number,
      coef: number,
      date: string,
      parent: string
    }>
  }
}
```

## Development Workflow

### Local Development
```bash
# Frontend
cd frontend
npm install
npm run dev          # Runs on http://localhost:5173

# Backend
cd bulletins
npm install
npx google-cloud-functions-framework --target=getNotesSummary
```

### Quality Assurance
- ESLint for code quality and consistency
- TypeScript for type safety
- Proper error handling throughout the application
- Responsive design testing across devices

## Innovation & UX

1. **Modern UI/UX**: Clean, intuitive interface with smooth animations
2. **Mobile-First**: Optimized for mobile usage with responsive design
3. **Real-Time Notifications**: Instant alerts for new grades
4. **Performance**: Fast loading with optimized bundle sizes
5. **Accessibility**: Proper semantic HTML and keyboard navigation
6. **Demo Mode**: Allows exploration without university credentials

## Future Extensibility

The architecture supports easy extension for:
- Additional notification channels (email, SMS)
- More detailed analytics and grade tracking
- Integration with other university systems
- Multi-university support
- Advanced filtering and search capabilities
- Grade prediction and trend analysis

This project demonstrates modern web development practices, serverless architecture, and thoughtful user experience design specifically tailored for the academic environment.