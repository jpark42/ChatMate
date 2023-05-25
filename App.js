import { LogBox, Alert } from "react-native";
import { useEffect } from "react";

import { StyleSheet } from "react-native";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

// import function for initialisation of Firebase Storage (images)
import { getStorage } from "firebase/storage";

// useNetInfo() keeps track of the network’s connectivity and updates in real time.
import { useNetInfo } from "@react-native-community/netinfo";

// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

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

  // Initialize Firestore Storage and get a reference to the service
  const storage = getStorage(app);

  //defining new state that represents online connectivity status
  const connectionStatus = useNetInfo();

  // connectionStatus.isConnected used as a dependency value of useEffect()
  // If this value changes, the useEffect code will be re-executed
  // Disable attempts to keep trying to reconnect to firebase if there is no connection
  // Enable access to database on firebase if user is connected to internet
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    /*Reponsible for managing your app state and linking your top-level navigator to the app*/
    <NavigationContainer>
      {/* initalRouteName is the first screen to load when you start your app*/}
      <Stack.Navigator initialRouteName="Start">
        {/* Stack.Screen needs at least two this.props. 
        component: The component you want to display as the screen; 
        name: The handler that you’ll use to open or navigate to the screen */}
        {/** Passing additional props to the ShoppingLists component. Can now access the db prop variable in Chat.js. */}
        {/** Also passing boolean value of connectionStatus.isConnected as a prop so you can access isConnected in Chat.js */}
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
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
