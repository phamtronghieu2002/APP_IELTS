import React, { useEffect, useState } from 'react';
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

import { getCategories } from '../../services/categoryServices';
import HeaderScreen from '../../components/Header/HeaderScreen';

const Tip = ({ navigation }) => {

  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await getCategories("skills")
      const data = await response.data;

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);



  return (

    <MainLayout>
      <HeaderScreen
        label={"Tip"}
        navigation={navigation}
      />
      <View className="content pl-3 mt-5">
        {
          categories.map((category, index) => {
            return (
              <AboutChosen
                onPress={() => navigation.navigate('TipDetail', { cate_id: category?._id })}
                classNames='h-[80px]'
                key={index}
                NameChosen={`Tips ${category.name_category}`}
                icon={category?.thumb} />
            )
          })
        }

      </View>
    </MainLayout>


  );
};

Tip.propTypes = {
};
export default Tip;