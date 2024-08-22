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

const Home = ({navigation}) => {
  return (
    <MainLayout>
      <View className=''>
        <Text className="">
          Xin chao
        </Text>
        <Pressable className="" onPress={()=>{
               navigation.navigate('profile', {name: 'Jane'})
        }}>
            <Text className="">
              Click here
            </Text>
        </Pressable>
      </View>
    </MainLayout>
  );
};

Home.propTypes = {
};
export default Home;