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
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import HeaderScreen from '../../components/Header/HeaderScreen';
import RenderHtml from "react-native-render-html";
import { getAbout } from '../../services/aboutService';

const AboutDetail = ({ navigation, route }) => {

    const { width } = useWindowDimensions();
    const [contents, setContents] = React.useState('');
    const { cate_id } = route.params;
    const [loading, setLoading] = React.useState(false);

    const fetchAbout = async () => {
        try {
            setLoading(true);
            const response = await getAbout(cate_id);
            const data = response.data;
            setLoading(false);
            setContents(data?.contents);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        fetchAbout();
    }, []);

    return (
        <MainLayout>
            <HeaderScreen
                label={"Document"}
                navigation={navigation}
            />
            {
                loading ? <View className="fixed w-[100%] h-full inset-0">
                    <ActivityIndicator size={'large'} color={"pink"} />
                </View> : <View className="content pl-6">
                    <RenderHtml
                        contentWidth={width}
                        source={{
                            html: contents || "",
                        }}
                    />
                </View>
            }



        </MainLayout>
    );
};

AboutDetail.propTypes = {
};
export default AboutDetail;