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
import { getPolicy, getTerm } from '../../services/policyServices';
import RenderHtml from "react-native-render-html";
const Term = ({ navigation }) => {

    const [Term, setTerm] = React.useState({});
    const { width } = useWindowDimensions();
    const fetchTerm = async () => {
        try {
            const response = await getPolicy();
            const data = response.data?.find((item) => item.type === 'term');
            setTerm(data);

        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchTerm();
    }, []);


    return (
        <SafeAreaView className="">
            <ScrollView>
                <HeaderScreen
                    label={'Term'}
                    navigation={navigation}
                />
                <View className="p-5">
                    <RenderHtml
                        contentWidth={width}
                        source={{
                            html: Term?.contents,
                        }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

Term.propTypes = {
};
export default Term;