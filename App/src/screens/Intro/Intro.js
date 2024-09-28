import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import configs from '../../configs';
import Gradient from '../../components/Gradient/Gradient';
const Intro = ({ navigation }) => {
    return (
        <View className='flex-1'>


            <Onboarding
                // replace name next
                onDone={() => navigation.navigate(configs?.screenName.login)}
                onSkip={() => navigation.navigate('initStack')}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image
                             
                            source={require('../../../assets/intro/1.gif')} />,
                        title: 'Achieve your dream score',
                        subtitle: 'Start your IELTS journey with us',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image
                            width={50}
                            height={50}
                            source={require('../../../assets/home/book2.png')} />,
                        title: 'Covering Listening, Reading, Writing, and Speaking',
                        subtitle: 'Personalized exercises just for you',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image
                            width={50}
                            height={50}
                            source={require('../../../assets/home/book2.png')} />,
                        title: 'Monitor your improvements',
                        subtitle: 'Set goals and achieve them step by step',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image
                            width={50}
                            height={50}
                            source={require('../../../assets/home/book2.png')} />,
                        title: 'Receive daily study reminders',
                        subtitle: 'Stay focused and disciplined',
                    },


                ]}
            />


        </View>
    );
};

Intro.propTypes = {
};
export default Intro;