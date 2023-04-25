import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  //destructuring background colors
  const { black, purple, grey, green } = backgroundColors;

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
              <Pressable
                accessible={true}
                accessibilityLabel="black color"
                accessibilityHint="Select to change your background color to black."
                accessibilityRole="button"
                style={[styles.color, black]}
                onPress={() => {
                  setColor(black.backgroundColor);
                }}
              >
                {/* apply different style based on whether the color was selected or not using conditional logic*/}
                <View
                  style={
                    color === black.backgroundColor
                      ? styles.colorSelected
                      : styles.color
                  }
                />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="purple color"
                accessibilityHint="Select to change your background color to purple."
                accessibilityRole="button"
                style={[styles.color, purple]}
                onPress={() => {
                  setColor(purple.backgroundColor);
                }}
              >
                <View
                  style={
                    color === purple.backgroundColor
                      ? styles.colorSelected
                      : styles.color
                  }
                />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="grey color"
                accessibilityHint="Select to change your background color to grey."
                accessibilityRole="button"
                style={[styles.color, grey]}
                onPress={() => {
                  setColor(grey.backgroundColor);
                }}
              >
                <View
                  style={
                    color === grey.backgroundColor
                      ? styles.colorSelected
                      : styles.color
                  }
                />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="green color"
                accessibilityHint="Select to change your background color to green."
                accessibilityRole="button"
                style={[styles.color, green]}
                onPress={() => {
                  setColor(green.backgroundColor);
                }}
              >
                <View
                  style={
                    color === green.backgroundColor
                      ? styles.colorSelected
                      : styles.color
                  }
                />
              </Pressable>
            </View>
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Start chat"
            accessibilityHint="Press to enter the chat screen."
            accessibilityRole="button"
            style={styles.chatButton}
            onPress={() =>
              navigation.navigate("Chat", { name: name, color: color })
            }
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
