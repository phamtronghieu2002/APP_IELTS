import { View, TextInput } from "react-native";

export default function InputCustom({ name, onChange, value, Icon, placeholder, isPassword }) {

    return (
        <View className=" mb-4 w-[303px] h-[48px]  flex flex-row items-center p-3 justify-between  border border-gray-400">
            <TextInput
                secureTextEntry={isPassword}
                placeholder={placeholder}
                className='flex-1 h-[30px]'
                name={name}
                value={value}
                onChangeText={(e) => {
                    onChange(name, e)
                }}
            />
            {Icon}
        </View>
    )

}