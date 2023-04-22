import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import the screens
import Start from "/components/Start";
import Chat from "/components/Chat";

// Creates Navigator and Screen, which are used to to create the Navigation Stack
const Stack = createNativeStackNavigator();

// App's main component that renders the UI
const App = () => {
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
