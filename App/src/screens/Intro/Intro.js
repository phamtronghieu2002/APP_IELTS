import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import configs from '../../configs';
import Gradient from '../../components/Gradient/Gradient';
import AuthHoc from '../../hocs/AuthHoc';
const Intro = ({ navigation }) => {


    useEffect(() => {
    }, [])
    return (
        <AuthHoc
            navigation={navigation}
        >
            <View className='flex-1'>


                <Onboarding
                    // replace name next
                    onDone={() => navigation.navigate(configs?.screenName?.login, { isIntro: true })}
                    onSkip={() => navigation.navigate(configs?.screenName?.login, { isIntro: true })}
                    pages={[
                        {
                            backgroundColor: '#fff',
                            image: <Image
                                className='w-[300px] h-[300px]'
                                source={require('../../../assets/intro/1.gif')} />,
                            title: 'Achieve your dream score',
                            subtitle: 'Start your IELTS journey with us',
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image
                                className='w-[300px] h-[300px]'
                                source={require('../../../assets/intro/2.gif')} />,
                            title: 'Covering Listening, Reading, Writing, and Speaking',
                            subtitle: 'Personalized exercises just for you',
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image
                                className='w-[300px] h-[300px]'
                                source={require('../../../assets/intro/3.gif')} />,
                            title: 'Monitor your improvements',
                            subtitle: 'Set goals and achieve them step by step',
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image
                                className='w-[300px] h-[300px]'
                                source={require('../../../assets/intro/4.gif')} />,
                            title: 'Receive daily study reminders',
                            subtitle: 'Stay focused and disciplined',
                        },


                    ]}
                />


            </View>
        </AuthHoc>
    );
};

Intro.propTypes = {
};
export default Intro;