import * as React from "react";
import {Pressable, View, Image} from "react-native";

export default function DeleteButton({handleDelete, onDone}) {

  return (
    <View>
        <Pressable
            onPress={handleDelete}
        >
        <View className="bg-red-100 w-[25] h-[25] flex items-center justify-center rounded-full">
          <Image
            source={require('../../../assets/delete.png')}
            style={{ width: 15, height: 15 }}
          />
        </View>
        </Pressable>
    </View>
  );
}