# React Native Property Booking App

This is a **React Native Expo** app designed to list properties and allow users to book them. The app allows users to browse through various properties, view their details, and make bookings directly from the app.

---

## Features

- **Property Listing**: View a list of available properties.
- **Property Details**: Tap on a property to view its details such as price, location, and amenities.
- **Booking**: Users can select dates and book a property.
- **Real-time Data**: Available properties and pricing are updated in real-time.

---

## Tech Stack

- **React Native** (via **Expo**)
- **expo-router** for app navigation
- **Expo SDK** for app development
- **Jotai** for state management

---

## Prerequisites

- [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

---

## How to Run the App
### 1. Clone the Repository

```bash
git clone https://github.com/ran-ji-t/rn-expo-property-booking-app.git
```
### 2. Checkout to master

```bash
git checkout master
```
### 3. Install dependencies

```bash
npm install
```
### 4. Start server
- spin up a local server with the API using [JSON-server](https://github.com/typicode/json-server) (install json-server -v 0.17.4).
- find the db.json file at [link](https://pastebin.com/raw/Sa0LzR3T) and save it as db.json.
- If you encounter any issues with CORS while developing, follow these steps:

1. **Check the CORS Middleware**: Ensure that the middleware for CORS is correctly configured in the server code. The headers should allow the specific origin of your frontend application (e.g., `http://localhost:3001`).
   
   Here's the relevant middleware:
   ```javascript
   server.use(function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "http://localhost:3001");
     res.header(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept"
     );
     next();
   });
   ```
### 5. Setting Up Environment Variables
To run the app successfully, you need to configure environment variables for the API base URL (server URL) and the API key (Google API key). The API key is not required when running the app in Expo Go, but it is necessary for development builds or when generating an app binaries.

### 6. Run the app
```bash
npm start
```
To run a developemnt build run these commands 
```bash
# Prebuild the project (prepare the build environment)
npm run prebuild

# This script ensures that the `android.enableJetifier=true` setting is correctly configured in the `gradle.properties` file for Android projects. No need for iOS.
npm run postinstall

# Build and run the Android app
npm run android 
```

---

### Acknowledgements
- [React Native](https://reactnative.dev/) for building the app's framework.
- [Expo](https://expo.dev/) for providing a great development environment.
- [Jotai](https://github.com/pmndrs/jotai) for state management.
- [JSON-server](https://github.com/typicode/json-server) for quick mock API data.
