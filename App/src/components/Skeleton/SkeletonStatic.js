import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { AnimatePresence } from 'moti'
const SkeletonStatic = () => (
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
                    height: 4000,
                    backgroundColor: 'black',
                    borderRadius: 4,
                    marginBottom: 20,
                }}
            />
        
 


        </View>


    </AnimatePresence>

);

export default SkeletonStatic;
