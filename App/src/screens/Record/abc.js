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
    useWindowDimensions,
} from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import HeaderScreen from '../../components/Header/HeaderScreen';

import RenderHtml from "react-native-render-html";
import axios from 'axios';
import { use } from 'i18next';

const Record = ({
    navigation
}) => {


    const [content, setContent] = useState('')

    const fetch = async () => {
        try {
            const res = await axios.post("http://192.168.85.187:8080/api/v1/gpt/writing", {
                text: `
            In developing countries, achieving a balance between economic growth and environmental sustainability presents significant challenges. Governments play a crucial role in this delicate balancing act. One approach is to implement policies that encourage sustainable practices within industries, such as promoting renewable energy, enforcing regulations on pollution, and incentivizing companies to adopt eco-friendly technologies. By integrating environmental considerations into economic planning, governments can foster growth that does not come at the expense of natural resources and ecosystems.
    International cooperation is essential in enhancing the economic stability of regions facing economic challenges. Through partnerships and financial assistance, developed nations can support developing countries in building sustainable infrastructure and accessing green technologies. Additionally, global collaboration on issues such as climate change and environmental protection can lead to shared solutions that benefit all parties. These cooperative efforts can help stabilize economies by providing the necessary tools and resources to address environmental and economic challenges simultaneously.
    Innovation plays a pivotal role in promoting economic development while ensuring equitable wealth distribution. By fostering a culture of innovation, governments can stimulate the creation of new industries and job opportunities, leading to inclusive economic growth. Furthermore, innovative solutions in sectors such as education, healthcare, and finance can help bridge the gap between rich and poor, ensuring that the benefits of economic growth are shared more broadly across society. In essence, innovation not only drives economic progress but also ensures that this progress is sustainable and equitable.
    In conclusion, governments in developing countries must adopt a multifaceted approach to balance economic growth with environmental sustainability. International cooperation and innovation are key components of this strategy, helping to stabilize economies, promote sustainable practices, and ensure that the fruits of economic development are equitably distributed.
            `,
                topic: `
             In what ways can governments balance economic growth with environmental sustainability in developing countries? How can international cooperation positively impact the economic stability of regions facing economic challenges? Discuss the role of innovation in promoting economic development while ensuring equitable distribution of wealth.Tr
            `
            })

            const fb = res?.data?.data
        
            
            setContent(fb)
        } catch (error) {
            console.log(error);

        }
    }


    const { width } = useWindowDimensions();


    useEffect(() => {
        fetch()
    }, [])


    return (
        <MainLayout>

            <HeaderScreen
                label={"Record"}
                navigation={navigation}
            />
            <View className="content pl-3">
                <RenderHtml
                    contentWidth={width}
                    source={{
                        html: content,
                    }}
                />
            </View>

        </MainLayout>
    );
};

Record.propTypes = {
};
export default Record;