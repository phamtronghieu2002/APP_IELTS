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
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { screensDrawer } from '../../navigators/config';

const DrawCustom = (props) => {

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ padding: 20 }} className="flex flex-row  items-center gap-4">
                <View className="rounded-full bg-red-50 w-[55px] h-[55px] flex justify-center items-center">
                    <Image
                        className="w-[100%] h-[100%]"
                        source={{
                            uri:
                                'data:image/png;base64,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',
                        }}
                    />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Hieu Pham

                </Text>
            </View>

            {props.state.routes.map((route, index) => {
                const screen = screensDrawer.find((item) => item.name === route.name);
                return (
                    <TouchableOpacity
                        className="border-b-2 border-gray-100 font-light"
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: route.name === props.state.routeNames[props.state.index] ? '#e0e0e0' : '#fff',
                        }}
                        onPress={() => { props.navigation.navigate(route.name) }}
                    >
                        {screen?.options?.drawerIcon && screen.options.drawerIcon({ focused: true, color: '#000', size: 20 })}
                        <Text className="font-light" style={{ marginLeft: 10, fontSize: 16 }}>{route.name}</Text>
                    </TouchableOpacity>
                )



            })}
        </DrawerContentScrollView>
    );

};

DrawCustom.propTypes = {
};
export default DrawCustom;