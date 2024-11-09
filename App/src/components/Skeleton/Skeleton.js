import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { AnimatePresence } from 'moti'
const SkeletonPlaceholder = () => (
    <AnimatePresence

    >
        <View className="pl-5 pr-5 mt-3">
            <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}

                transition={{
                    type: 'spring',

                    duration: 300,
                    loop: true,
                    repeatReverse: true,

                }}
                style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#dedede',
                    borderRadius: 4,
                    marginBottom: 20,
                }}
            />
            <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                    type: 'timing',
                    duration: 300,
                    loop: true,
                    repeatReverse: true,

                }}
                style={{
                    width: '100%',
                    height: 250,
                    backgroundColor: '#dedede',
                    borderRadius: 4,
                    marginBottom: 8,
                }}
            />
            <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                    type: 'timing',
                    duration: 300,
                    loop: true,
                    repeatReverse: true,

                }}
                style={{
                    width: '100%',
                    height: 450,
                    backgroundColor: '#dedede',
                    borderRadius: 4,
                    marginBottom: 8,
                }}
            />


        </View>


    </AnimatePresence>

);

export default SkeletonPlaceholder;
