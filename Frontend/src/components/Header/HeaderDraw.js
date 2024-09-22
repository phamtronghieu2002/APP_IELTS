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
import IonIcon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import Button from '../Button/Button';
import MainBackground from '../MainBackground/MainBackground';



const Header = ({ navigation }) => {
    return (
        <View className="">
        
            {/* <MainBackground/> */}
            <View className='h-14 flex justify-between items-center flex-row pr-4 pl-4'>
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
        </View>
    );
};

Header.propTypes = {
};
export default Header;