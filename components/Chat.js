import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";

//route is a prop that is sent through navigation
//This prop was set to all screen components listed under Stack.Navigator in App.js
const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;

  useEffect(() => {
    // setOptions function of the navigation prop to set the navigation header’s title
    // [] - means it doesn't rely on any state changes of this component
    // code inside useEffect will be called only once, right after the component is mounted
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>Start chatting now!</Text>
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
