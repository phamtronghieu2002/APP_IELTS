import React from 'react';
import PropTypes from 'prop-types'
import {
    View,

    useWindowDimensions,

} from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import HeaderScreen from '../../components/Header/HeaderScreen';
import RenderHtml from "react-native-render-html";


const TipContent = ({ navigation, route }) => {

    const { width } = useWindowDimensions();

    const { content } = route.params;




    return (
        <MainLayout>
            <HeaderScreen
                label={"Document"}
                navigation={navigation}
            />
            <View className="content pl-6">
                <RenderHtml
                    contentWidth={width}
                    source={{
                        html: content || "",
                    }}
                />
            </View>




        </MainLayout>
    );
};

TipContent.propTypes = {
};
export default TipContent;