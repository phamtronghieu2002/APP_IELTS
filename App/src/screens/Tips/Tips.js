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
import MainLayout from '../../layouts/MainLayout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AboutChosen from '../../components/AboutChosen/AboutChosen';

const Tips = ({ navigation }) => {
  return (
    <MainLayout>
      <View className="mt-7 mb-6 flex flex-row justify-between flex-wrap">
                        <View className="flex flex-row items-center">
                            <AntDesign
                                name="arrowleft"
                                size={20}
                                color="black"
                                style={{}}
                            />
                            <Text className="text-black-600 text-x font-bold ml-3">
                            IELTS best Tips
                            </Text>
                        </View>
                    </View>
                    <AboutChosen NameChosen="IELTS Tips" numWord="100" icon={require('../../../assets/home/reading.png')} />
                    
                    <AboutChosen NameChosen="IELTS Tips" numWord="100" icon={require('../../../assets/home/reading.png')} />
                    
                    <AboutChosen NameChosen="IELTS Tips" numWord="100" icon={require('../../../assets/home/reading.png')} />
                    
                    <AboutChosen NameChosen="IELTS Tips" numWord="100" icon={require('../../../assets/home/reading.png')} />
    </MainLayout>
  );
};

Tips.propTypes = {
};
export default Tips;