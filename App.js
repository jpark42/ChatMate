import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Creates Navigator and Screen, which are used to to create the Navigation Stack
const Stack = createNativeStackNavigator();

// App's main component that renders the UI
const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPqVWyNKHmnKAAfVKURr3yDlhd4kE5_SU",
    authDomain: "chatmate-a350b.firebaseapp.com",
    projectId: "chatmate-a350b",
    storageBucket: "chatmate-a350b.appspot.com",
    messagingSenderId: "591583362220",
    appId: "1:591583362220:web:12c74d2b444ce470aa7309",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  // When using this in other components, you can read from, and write into, your database via your app
  const db = getFirestore(app);

  return (
    /*Reponsible for managing your app state and linking your top-level navigator to the app*/
    <NavigationContainer>
      {/* initalRouteName is the first screen to load when you start your app*/}
      <Stack.Navigator initialRouteName="Start">
        {/* Stack.Screen needs at least two this.props. 
        component: The component you want to display as the screen; 
        name: The handler that you’ll use to open or navigate to the screen */}
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
