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
} from 'react-native';
import HeaderScreen from '../../components/Header/HeaderScreen';
import { getPolicy } from '../../services/policyServices';
import RenderHtml from "react-native-render-html";
const Policy = ({ navigation }) => {

    const [policy, setPolicy] = React.useState({});
    const { width } = useWindowDimensions();
    const fetchPolicy = async () => {
        try {
            const response = await getPolicy();
            const data = response.data?.find((item) => item.type === 'privacy');
            setPolicy(data);

        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchPolicy();
    }, []);


    return (
        <SafeAreaView className="">
            <ScrollView>
                <HeaderScreen
                    label={'Policy'}
                    navigation={navigation}
                />
                <View className="p-5">
                    <RenderHtml
                        contentWidth={width}
                        source={{
                            html: policy?.contents,
                        }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

Policy.propTypes = {
};
export default Policy;