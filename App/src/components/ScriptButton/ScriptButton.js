import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const ScriptButton = ({ text }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row justify-end">
      <Pressable
        onPress={() => setModalVisible(true)}
      >
        <Text className="font-bold text-blue-700">Script</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-4/5 p-5 rounded-lg items-center">
            <RenderHtml contentWidth={width} source={{ html: text }} />
            <TouchableOpacity
              className="bg-red-500 px-4 py-2 rounded-md mt-4"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-lg">X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScriptButton;
