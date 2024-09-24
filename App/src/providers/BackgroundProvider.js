import { SafeAreaView, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
        zIndex: -1,
    },

});
export default function BackgroundProvider({ children }) {
    return (
        <SafeAreaView className="">
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(139,85,193,100)', 'transparent']}
                style={styles.background}
            />
            {children}
        </SafeAreaView>
    )

}