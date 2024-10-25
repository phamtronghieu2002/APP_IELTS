import React, { useEffect } from 'react';
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
import IonIcon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import Button from '../Button/Button';
import MainBackground from '../MainBackground/MainBackground';

import { useSelector, useDispatch } from 'react-redux'
import Gradient from '../Gradient/Gradient';
import { useNavigation } from '@react-navigation/native';

const Content = ({navigation,height="h-14"}) => {
    return (
        <View className={`${height}  flex justify-between items-center flex-row pr-4 pl-4`}>
            <Button
                onClick={() => navigation.openDrawer()}
                Icon={<IonIcon name="bars-staggered" color="red" size={19} />}
            />
            <View className="flex flex-row">
                <Button
                    style={{ marginRight: 10 }}
                    onClick={() => { }}
                    Icon={<FontAwesome name="crown" color="#d9c109" size={18} />}
                />
                <Button
                    onClick={() => { }}
                    Icon={<IonIcon name="calendar-days" color="red" size={18} />}
                />
            </View>
        </View>
    )
}

const Header = ({ navigation }) => {

    const interfaces = useSelector((state) => state.interface.isGradient)

    const handleScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset > scrollOffset) {
          // Nếu cuộn xuống -> Ẩn drawer
          navigation.closeDrawer();
        }
        setScrollOffset(currentOffset);
      };
    return (
        <View className={!interfaces ? "pt-5" :""}>
            {
                interfaces ? <Gradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 5 }}
                    height={75}>
                    <Content height='h-24' navigation={navigation}  />
                </Gradient> : <Content  navigation={navigation}/>
            }

        </View>
    );
};

Header.propTypes = {
};
export default Header;