# CalcQuest

CalcQuest is a gamified calculus learning app for people who need a math refresher or are just learning calculus and want something more interactive than a static textbook platform. The current MVP focuses on basic calculus concepts, short lessons, developer-friendly analogies, world-based progression, and interactive math tools so learners can refresh fundamentals and test the app experience.

## Stack

- Next.js App Router
- TypeScript
- Material UI
- Firebase Authentication
- Cloud Firestore
- Vitest

## MVP Features

- Dark-mode landing page
- Email/password and Google auth flow with demo fallback
- Protected dashboard
- World map with unlock logic
- Dynamic world and lesson routes
- XP, mastery, and progress tracking
- Composition Pipeline Builder interactive lesson
- Firebase-ready client, auth, and Firestore helpers

## Included Worlds

1. Function Foundations
2. Composition of Functions
3. Limits
4. Derivatives
5. Integrals

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## Environment Variables

Create a `.env.local` file using `.env.example` and provide your Firebase values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
OPENAI_API_KEY=
```

If Firebase variables are not configured, the app falls back to a local demo mode so the MVP can still be explored end to end.

## Project Structure

```txt
src/
  app/
  components/
  data/
  firebase/
  hooks/
  lib/
  theme/
  types/
```

## Status

This repository currently contains the initial MVP scaffold and first playable learning flow for CalcQuest. Right now it is centered on basic calculus for learners who want a refresher or a starting point, with a longer-term plan to expand the platform into more advanced mathematics.
