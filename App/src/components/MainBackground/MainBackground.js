import { SafeAreaView, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

    backgroundHead: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        top: '-20%',
        height: 300,
        zIndex: -99,
    },
    backgroundBottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -100,
        height: 300,
        zIndex: -1,
    },


});
export default function MainBackground() {
    return (
        <SafeAreaView className="">
            <View style={styles.backgroundHead} >
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#ffffff', '#fae6e6', '#fae6e6', 'transparent']}
                    style={styles.backgroundHead}
                    start={{ x: 0, y: 0 }}  // Điểm bắt đầu (góc trên bên trái)
                    end={{ x: 0, y: 1 }}    // Điểm kết thúc (góc dưới bên phải)
                />

            </View>
            {/* <LinearGradient
                // Background Linear Gradient
                colors={['#ffffff', '#fae6e6', '#fae6e6', 'transparent']}
                style={styles.backgroundBottom}
                start={{ x: 0, y: 0 }}  // Điểm bắt đầu (góc trên bên trái)
                end={{ x: 1, y: 1 }}    // Điểm kết thúc (góc dưới bên phải)
            /> */}
        </SafeAreaView>
    )

}