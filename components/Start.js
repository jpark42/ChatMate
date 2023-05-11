import {
  Alert,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";

// importing anonymous auth firebase functions
import { getAuth, signInAnonymously } from "firebase/auth";

import { SimpleLineIcons } from "@expo/vector-icons";

// defining background colors
const backgroundColors = {
  black: { backgroundColor: "#090c08" },
  purple: { backgroundColor: "#474056" },
  grey: { backgroundColor: "#8a95a5" },
  green: { backgroundColor: "#b9c6ae" },
};

// navigation prop is passed to every component included in Stack.Navigator from App.js
const Start = ({ navigation }) => {
  //initializing Firebase authentication handler (needed for signInAnonymously())
  const auth = getAuth();

  const signInUser = () => {
    /* signInAnonymously() returns a promise
    we get an information object (represented by result) 
    as the user is signed in, the app navigates to Chat.js
    we also pass result.user.uid (which is assigned to the route parameter userID) */
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  useEffect(() => {
    // setOptions function of the navigation prop to hide the navigation header
    // [] - means it doesn't rely on any state changes of this component
    // code inside useEffect will be called only once, right after the component is mounted
    navigation.setOptions({ headerShown: false });
  }, []);

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-img.png")}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>ChatMate</Text>

        <View style={styles.userContainer}>
          <View style={styles.inputContainer}>
            <SimpleLineIcons
              style={styles.icon}
              name="user"
              size={18}
              color="#757083"
            />
            <TextInput
              accessible={true}
              accessibilityLabel="Name input"
              accessibilityHint="Let's you enter your name that is going to be displayed in chat."
              accessibilityRole="input"
              style={styles.nameInput}
              onChangeText={setName}
              value={name}
              placeholder="Your Username"
            />
          </View>

          <View style={styles.colorContainer}>
            <Text style={styles.bgColorText}>Choose Background Color:</Text>

            <View style={styles.bgColorWrapper}>
              {/* Object.entries() method used to convert backgroundColors object into an array, with a sub-array of key-value pairs.*/}
              {/* .map() method used to create a new array where we looped over each sub-array and returns a new object
               for each one. The new object contains the same color key-value pair, along with a click property set to
               a function that changes the background color of the body to the corresponding color..*/}
              {Object.entries(backgroundColors).map(([key, value]) => (
                <Pressable
                  accessible={true}
                  accessibilityLabel={`${key} color`}
                  accessibilityHint={`Select to change your background color to ${key}.`}
                  accessibilityRole="button"
                  key={key}
                  style={[styles.color, value]}
                  onPress={() => setColor(value.backgroundColor)}
                >
                  <View
                    style={
                      color === value.backgroundColor
                        ? styles.colorSelected
                        : styles.color
                    }
                  />
                </Pressable>
              ))}
            </View>
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Start chat"
            accessibilityHint="Press to enter the chat screen."
            accessibilityRole="button"
            style={styles.chatButton}
            onPress={signInUser}
          >
            <Text style={styles.chatText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* if user platform is Apple, then add component KeyboardAvodingView, otherwise input nothing*/}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFF",
    marginTop: 110,
  },
  userContainer: {
    height: "44%",
    minHeight: "44%",
    width: "88%",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    marginBottom: 15,
    fontSize: 16,
  },
  inputContainer: {
    width: "88%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 5,
    alignItems: "center",
  },
  icon: {
    padding: 15,
  },
  nameInput: {
    flex: 1,
    color: "#757083",
    opacity: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftColor: "#fff",
    padding: 15,
    fontSize: 16,
  },
  chatButton: {
    alignItems: "center",
    backgroundColor: "#757083",
    color: "#FFF",
    padding: 17.5,
    borderRadius: 2.5,
    width: "88%",
  },
  chatText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  colorContainer: {
    alignItems: "flex-start",
    width: "88%",
    gap: 8,
  },
  bgColorText: {
    fontSize: 16,
    fontWeight: "300",
    opacity: 100,
    color: "#757083",
  },
  bgColorWrapper: {
    flexDirection: "row",
  },
  color: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    margin: 10,
  },
  colorSelected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#FFF",
    borderWidth: 2,
  },
});

export default Start;
