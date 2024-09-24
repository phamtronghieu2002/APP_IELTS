import React from 'react';
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';


const Gradient = ({ children, height = 500, start = { x: 0, y: 0 }, end = { x: 0, y: 2 } }) => {

    const styles = StyleSheet.create({
        background: {
            left: 0,
            right: 0,
            top: 0,
            height: height,
            width: '100%',
        },
        shadowContainer: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5, // For Android shadow effect
        },
    });

    return (
        <LinearGradient
            colors={['#FAC6C6', '#F42525']} // Define your colors
            start={start} // Top
            end={end} // Bottom
            style={styles.background}
        >

            {children}
        </LinearGradient>
    );
};

Gradient.propTypes = {
};



export default Gradient;