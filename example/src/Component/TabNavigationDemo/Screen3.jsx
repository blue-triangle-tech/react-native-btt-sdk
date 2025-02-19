import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const Screen3 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Im Screen 3
            </Text>
        </View>

    );
};

export default Screen3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ee8d9c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
});
