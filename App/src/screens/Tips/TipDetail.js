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
import HeaderScreen from '../../components/Header/HeaderScreen';
import { getTip } from '../../services/tipServices';
import Icon from 'react-native-vector-icons/Entypo';
import configs from '../../configs';
const TipDetail = ({ navigation, route }) => {

    const [tips, setTips] = React.useState([]);
    const { cate_id } = route.params;

    const fetchTip = async () => {
        try {
            const response = await getTip(cate_id);
            const data = response.data;
            setTips(data?.contents);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        fetchTip();
    }, []);

    return (
        <MainLayout>
            <HeaderScreen
                navigation={navigation}
                label={"Tip Detail"}
            />
            <View className="content pl-3 mt-5">
                {
                    tips?.map((tip, index) => {
                        return (
                            <Pressable
                                onPress={() => navigation.navigate(configs?.screenName?.tipContent, { content: tip.content })}
                                className="
                                rounded-xl
                                mb-2
                                bg-white border-b-2 border-gray-100 py-2 h-[70px] flex items-center flex-row pl-5"
                                key={index}>
                                <Icon name="light-bulb" size={20} />
                                <Text
                                    className="text-lg font-bold ml-3"
                                >{tip.name_tip}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>

        </MainLayout>
    );
};

TipDetail.propTypes = {
};
export default TipDetail;