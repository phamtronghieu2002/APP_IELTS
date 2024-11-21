import React from "react";
import RenderHtml from "react-native-render-html";
import { View, Text, Pressable, StyleSheet, useWindowDimensions} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Bạn có thể chọn FontAwesome, MaterialIcons...

const RadioButton = ({
  selected,
  onPress,
  label,
  isShowAnswer,
  incorrectAnswerId,
  optionId,
  is_correct,
}) => {
    const { width } = useWindowDimensions();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View className="w-7">
        <Icon
          name={
            isShowAnswer
              ? is_correct
                ? "check-circle"
                : incorrectAnswerId == optionId
                ? "window-close"
                : "circle-thin"
              : "circle-thin"
          } // Sử dụng icon tùy ý
          size={30}
          color={
            isShowAnswer
              ? is_correct
                ? "green"
                : incorrectAnswerId == optionId
                ? "red"
                : "gray"
              : "gray"
          }
        />
      </View>
      {label && (
        <View style={{width:'90%', paddingLeft:16}}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: label,
            }}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: '100%',
  },
});

export default RadioButton;
