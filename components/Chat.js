import { StyleSheet, Platform, View } from "react-native";
import { useState, useEffect } from "react";

import { GiftedChat, Bubble } from "react-native-gifted-chat";

//route is a prop that is sent through navigation
//This prop was set to all screen components listed under Stack.Navigator in App.js
const Chat = ({ route, navigation, db }) => {
  //initializing messages state so you can send, receive and display messages
  const [messages, setMessages] = useState([]);

  // Accessing user’s name (from Screen 1 input) and color chosen via route.params
  const { name, color } = route.params;

  /* Setting the message state with useEffect()
  useEffect gets called right after chat component mounts
  set the state with a static message 
  so that you’ll be able to see each element of the UI displayed on the screen right away.*/
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello Developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: `${name} has entered the chat.`,
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    // setOptions function of the navigation prop to set the navigation header’s title
    // [] - means it doesn't rely on any state changes of this component
    // code inside useEffect will be called only once, right after the component is mounted
    navigation.setOptions({ title: name });
  }, []);

  /** onSend is called when a user sends a message
   * setMessage() is called with a callback function passed into it
   * previousMessages - parameter represents a variable that refers to the latest value of the state
   * append() function provided by GiftedChat, appends the new message to the original list of messages from previousMessages
   */
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const rightBubbleColor = (backgroundColor) => {
    if (backgroundColor === "#090c08") {
      return "#526675";
    }
    if (backgroundColor === "#474056") {
      return "#ba8bba";
    }
    if (backgroundColor === "#8a95a5") {
      return "#223C50";
    }
    if (backgroundColor === "#b9c6ae") {
      return "#2C4937";
    }
  };

  /**Customizing Bubbles
   * ...props - inherits props via the spread operator
   * wrapperStyle - name of the style
   * right and left - targets right and left bubbles respectively
   */
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: `${rightBubbleColor(color)}`,
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderBubble={renderBubble}
        user={{
          _id: 1,
        }}
      />
      {/* if user platform is Andriod, then add component KeyboardAvodingView, otherwise input nothing*/}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
