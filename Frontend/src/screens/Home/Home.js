import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import configs from '../../configs';
import { Button } from 'react-native';

const Home = ({ navigation }) => {
  const [text, onChangeText] = React.useState('Useless Text');


  return (
    <SafeAreaView className="p-10">

      <ScrollView>
        {
          [1, 2, 3, 4, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 3, 4, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map((item, index) => {
            return (
              <Text className="border-b border-red-50" key={index}>in NativeStackNavigator (created by MyStack)</Text>
            )
          })
        }

        <Button title='profile screen' className="" onPress={() => {
          navigation.navigate(configs.screenName.profile, {});
        }}>

        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Home;