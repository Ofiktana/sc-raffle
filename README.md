# Seplat Cares 2025 Raffle Draw

A React.js application for conducting raffle draws with real-time winner selection and celebration animations.

## Features

- 🎲 **Real Raffle Draw System**: Generates raffle numbers using specific logic and matches them against a database of tickets
- 🎉 **Confetti Animation**: Celebratory confetti animation when a winner is selected
- ❄️ **Snowfall Effect**: Animated snowfall background for festive atmosphere
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📊 **Winner History**: Tracks and displays previous winners with ticket details
- 🌓 **Dark Mode**: Built-in theme support with dark mode

## Technology Stack

- **React 19.2.0**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **next-themes**: Theme management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sc-raffle
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
sc-raffle/
├── src/
│   ├── components/
│   │   ├── confetti.jsx       # Confetti animation component
│   │   ├── raffle-drawer.jsx  # Main raffle draw component
│   │   ├── snowfall.jsx        # Snowfall animation
│   │   ├── theme-provider.jsx  # Theme context provider
│   │   └── ui/                 # UI component library
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── raffle.js          # Raffle logic and ticket matching
│   │   ├── tickets.txt        # Ticket database (JSON)
│   │   └── utils.js           # Utility functions
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # App entry point
│   └── globals.css            # Global styles
├── public/                     # Static assets
└── package.json
```

## Raffle Logic

The raffle number generation follows a specific pattern:
- **1st digit**: 0 or 1 (random)
- **2nd digit**: 9 or 0 (random)
- **3rd digit**: 0, 1, or 9 (random)
- **4th-7th digits**: 0-9 (random)

The system generates numbers and matches them against the ticket database to find winners.

## Building for Production

```bash
npm run build
# or
pnpm build
# or
yarn build
```

The production build will be in the `dist/` directory.

## Firebase Deployment

This application is deployed to Firebase Hosting.

### Prerequisites

- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project configured
- Logged in to Firebase (`firebase login`)

### Deploying

```bash
npm run deploy
# or
npm run build && firebase deploy --only hosting
```

### Live URLs

- **Hosting URL**: https://seplatcaresraffle.web.app
- **Project Console**: https://console.firebase.google.com/project/seplatcaresraffle/overview

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## License

This project is private and proprietary.

