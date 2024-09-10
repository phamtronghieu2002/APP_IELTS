import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import Loading from '../../components/Loading/Loading';
import RadarChart from '../../components/RadarChar/RadarChar';
// import { registerForPushNotificationsAsync, schedulePushNotification   } from '../../services/notifycationService';
const Statistic = () => {
  const data = [
    {
      data: {
        battery: 0.7,
        design: 0.8,
        useful: 0.9,
        speed: 0.67,
        weight: 0.8,
      },
    },
    {
      data: {
        battery: 0.6,
        design: 0.85,
        useful: 0.5,
        speed: 0.6,
        weight: 0.7,
      },
    },
  ];

  const captions = {
    battery: 'Battery Capacity',
    design: 'Design',
    useful: 'Usefulness',
    speed: 'Speed',
    weight: 'Weight',
  };

  useEffect(() => {
    // egisterForPushNotificationsAsync();
  }, []);

  return (
    <MainLayout>
      <View className='flex-1'>
        <Loading />
        <Text>Statistic</Text>
        <RadarChart captions={captions} data={data} size={450} />
      </View>
    </MainLayout>
  );
};

export default Statistic;
