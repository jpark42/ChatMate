import { KeyboardAvoidingView, StyleSheet, Platform, View } from "react-native";
import { useState, useEffect } from "react";

import { GiftedChat, Bubble, SystemMessage } from "react-native-gifted-chat";

// import firebase functions for quering data
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";

// Importing storage for native apps
import AsyncStorage from "@react-native-async-storage/async-storage";

// route is a prop that is sent through navigation
// This prop was set to all screen components listed under Stack.Navigator in App.js
// Navigation prop is passed to every component included in the Stack.Navigator in App.js
const Chat = ({ route, navigation, db }) => {
  //initializing messages state so you can send, receive and display messages
  const [messages, setMessages] = useState([]);

  // Accessing user’s name (from Screen 1 input) and color chosen via route.params
  const { name, color } = route.params;

  /* Setting the message state with useEffect()
  useEffect gets called right after chat component mounts*/

  /* useEffect() attaches listener only once, when component is mounted
  [] - dependency array is empty, we don't need to call useEffect more than once
  it will be automatically run whenever there’s a change in the targeted database reference
  onSnapshot() - checks whether there were any changes in collection and its documents. Arguments:
  - collection(db, 'messages') - reference that you attach the listener to
  - The callback function that’s called whenever there’s a change detected in the reference.
  In this case in callback function we get id and key/value of the items and push them to newMessages array
  then we set newMessages as a value for messages setMessages(newMessages);.*/

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      cacheMessages(newMessages);
      setMessages(newMessages);
    });

    // code to execute when the component will be unmounted
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        "messages_stored",
        JSON.stringify(newMessages)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // setOptions function of the navigation prop to set the navigation header’s title
    // [] - means it doesn't rely on any state changes of this component
    // code inside useEffect will be called only once, right after the component is mounted
    navigation.setOptions({ title: name });
  }, []);

  /** onSend is called when a user sends a message
  * addDoc will add new document to collection and generate id
    we use db - database intialised in the App.js
    messages - name of the collection
    newMessages[0] - object created from user inputs (listName, item1, item2)
  */

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
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

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderSystemMessage={renderSystemMessage}
        renderBubble={renderBubble}
        user={{ _id: route.params.userID, username: route.params.name }}
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
  },
});

export default Chat;
