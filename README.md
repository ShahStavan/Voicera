# Voicera - Face Detection Made Easy

Voicera helps you detect and analyze faces in real-time using your computer's camera. It's fast, easy to use, and works right in your web browser.

## What Can It Do?

- Performs advanced real-time face detection and analysis
- Provides instant gender and age recognition
- Analyzes facial expressions and emotions
- Tracks facial features and head position
- Shows you where faces are on the screen
- Works smoothly on any device
- Uses the latest web technology

## Features in Detail

### Real-time Face Analysis

- **Gender Recognition**: Automatically detects and displays gender for each face
- **Age Estimation**: Provides accurate age estimates in real-time
- **Emotion Analysis**: Recognizes 7 different emotions:
  - Neutral
  - Happy
  - Sad
  - Angry
  - Fearful
  - Disgusted
  - Surprised
- **Face Recognition**: Tracks facial landmarks and head angles for precise face detection

### Advanced Capabilities

- Real-time processing at 1 frame per second
- Multi-face detection and analysis
- Smooth UI with intuitive visualization
- Privacy-focused (all processing happens locally)
- Works in various lighting conditions
- Easy-to-understand emotion confidence scores

## What We Use

- **Website Builder**: Next.js
- **Look and Feel**: Tailwind CSS for clean design
- **Face Detection**: face-api.js for finding faces
- **Screen Updates**: Redux for smooth changes
- **Camera Access**: WebcamJS for using your camera

## Before You Start

Make sure you have:

- Node.js installed on your computer
- npm or yarn to install the needed files

## How to Set It Up

1. Get the project files:

```bash
git clone https://github.com/ShahStavan/Voicera.git
cd voicera
```

2. Install what you need:

```bash
npm install
# or
yarn install
```

3. Start the website:

```bash
npm run dev
# or
yarn dev
```

4. Open your web browser and go to [http://localhost:3000](http://localhost:3000)

## How Our Files Are Organized

```
src/
├── app/                   # Main website files
├── components/            # Building blocks of the site
│   ├── ControlPanel/     # Camera controls
│   ├── FaceResults/      # Shows what faces were found
│   ├── ModelLoader/      # Gets everything ready
│   ├── WebcamCapture/    # Handles your camera
│   └── ui/              # Basic design pieces
├── config/               # Settings
├── lib/                  # Helper tools
├── redux/               # Keeps track of changes
└── types/               # Code organization help
```

## How It Works

1. When you open the website, it loads what it needs to find faces
2. You'll see a progress bar while it gets ready
3. Your camera turns on when everything is set
4. It starts looking for faces right away
5. You can see the results next to your camera view

## Want to Help?

We welcome your ideas and improvements! Feel free to share your changes with us.

## Rules for Use

This project is free to use under the MIT License - check the LICENSE file to learn more
