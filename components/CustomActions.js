import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomActions = ({ wrapperStyle, iconTextStyle, color }) => {
  const onActionPress = () => {};
  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View
        style={[
          styles.wrapper,
          wrapperStyle,
          { backgroundColor: `${color}`, borderColor: `${color}` },
        ]}
      >
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    marginLeft: 12,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 50,
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  iconText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});
export default CustomActions;
