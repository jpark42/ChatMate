# ChatMate

A chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

## Built With

- JavaScript
- React Native
- Expo
- Google Firestore Database

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
  friends and family

- As a user, I want to be able to send messages to my friends and family members to exchange
  the latest news.

- As a user, I want to send images to my friends to show them what I’m currently doing.

- As a user, I want to share my location with my friends to show them where I am.

- As a user, I want to be able
  to read my messages offline so I can reread conversations at any
  time.

- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
  reader so that I can engage with a chat interface.

## Features

- A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.

- A page displaying the conversation, as well as an input field and submit button.

- The chat must provide users with two additional communication features: sending images
  and location data.

- Data gets stored online and offline.

## Getting Started

To get started with the application, follow these steps:

- install suitable version of Node. Expo only supports Node 16.xx.xx at max. Run folowing command in your terminal `nvm install 16.19.0`
  `nvm use 19.19.0` (or change for later vercion on your choise) `nvm alias default 16.19.0` (only for Mac users)
- Install Expo CLI as a global npm package: `npm install expo-cli -g`
- Create an account and log in at https://expo.dev/.
- Login with your Expo account using `expo login`
- Install the Expo Go App from [Apple Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&gl=DE) to test the project on your mobile device
- For better testing experience install [Android Studio](https://developer.android.com/studio) for Android Emulator or [Xcode](https://apps.apple.com/de/app/xcode/id497799835?mt=12) for ios Simulator to test the app
- Clone this repo and save on your local divise
- Navigate to the project folder in the Terminal/PowerShell, then run `npm install` from within the project folder to install dependencies.
- Start the project: `npx expo start`
- Scan the QR code provided in your terminal with your mobile devices
- In terminal type `i` to run the project on iOS, type `a` to run the project on Android Emulator

## Dependencies

#### package.json

{
"@react-navigation/native": "^6.1.6",
"@react-navigation/native-stack": "^6.9.12",
"expo": "~48.0.11",
"expo-status-bar": "~1.4.4",
"firebase": "^9.13.0",
"react": "18.2.0",
"react-dom": "^18.2.0",
"react-native": "0.71.6",
"react-native-gifted-chat": "^2.0.1",
"react-native-safe-area-context": "4.5.0",
"react-native-screens": "~3.20.0",
"react-native-web": "~0.18.11",
"@react-native-async-storage/async-storage": "1.17.11",
"@react-native-community/netinfo": "9.3.7",
"expo-location": "~15.1.1",
"react-native-maps": "1.3.2",
"expo-image-picker": "~14.1.1"
},
"devDependencies": {
"@babel/core": "^7.20.0"
}
