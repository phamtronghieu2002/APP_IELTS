import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,

    TouchableOpacity,
    StatusBar
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { screensDrawer } from '../../navigators/config';
import Icon from 'react-native-vector-icons/Ionicons';
import useLang from '../../hooks/useLang';
import { useDispatch, useSelector } from 'react-redux';
const DrawCustom = (props) => {
    const user = useSelector((state) => state.user)
    const { t } = useLang();
    return (
        <DrawerContentScrollView
            style={{
                zIndex: 999,
                width: '100%',
                position: 'relative',
                borderBottomRightRadius: 20,
            }}
            {...props}>
            <TouchableOpacity
                className="
               flex flex-row items-center justify-center  bg-slate-100 rounded-full"
                style={{ alignSelf: 'flex-end', marginRight: 20, width: 35, height: 35 }}
                onPress={() => props?.navigation?.closeDrawer()}
            >
                <Icon name="close" size={20} color="black" />
            </TouchableOpacity>
            <View style={{ padding: 20 }} className="flex flex-row  items-center gap-4">
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

                <View className="rounded-full bg-red-50 w-[55px] h-[55px] flex justify-center items-center">
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        className="w-[100%] h-[100%]"
                        source={{
                            uri: user?.user?.avatarPicture || "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728032233/ielts/happy-face_1_r8nulh.png"

                        }}
                    />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {
                        user?.user?.displayname || "Guest"
                    }

                </Text>
            </View>
            <View className="absolute top-0 left-0 right-0 h-[30px]">

            </View>

            {props.state.routes.map((route, index) => {

                const screen = screensDrawer(t).find((item) => item.name === route.name);



                return (
                    <TouchableOpacity
                        className="border-gray-100 font-light"
                        key={index}
                        style={{
                            display: 'flex',
                            gap: 10,
                            borderWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 13,
                            paddingLeft: 15,
                            backgroundColor: route.name === props.state.routeNames[props.state.index] ? '#e0e0e0' : '#fff',
                        }}
                        onPress={() => {
                            screen?.cb?.()
                            props.navigation.navigate(route.name, {
                                isGuest: user?.user?.email ? false : true,
                                isIntro: true
                            })
                        }}
                    >
                        <View className="flex justify-end flex-row items-end w-7">
                            {screen?.options?.drawerIcon && screen.options.drawerIcon({ focused: true, color: '#6c706d', size: 20 })}
                        </View>
                        <Text className="font-light" style={{ marginLeft: 10, fontSize: 16 }}>{(user?.user?.email && screen?.lable2) ? screen?.lable2 : screen?.label || route?.name}</Text>
                    </TouchableOpacity>
                )



            })}
        </DrawerContentScrollView>
    );

};

DrawCustom.propTypes = {
};
export default DrawCustom;