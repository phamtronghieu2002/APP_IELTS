import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
    SectionList,
    TextInput,
    TouchableOpacity,
    Pressable,
} from 'react-native';

const Category = ({
    thumb,
    name_category,
    onPress
}) => {
    return (
        <View className=''>
            <Pressable
                onPress={onPress}
                style={{
                    // shadown bottom

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
                className=" rounded-lg w-[47%] h-[150px] items-center flex justify-center bg-white 
          shadow-2xl mb-5">
                <Image
                    width={50}
                    height={50}
                    source={require('../../../assets/home/listening.png')} />
                <Text className="mt-2">
                    Reading
                </Text>
            </Pressable>
        </View>
    );
};

Category.propTypes = {
};
export default Category;