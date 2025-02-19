import React from 'react';

import {Text, View} from 'react-native';

const DrawerScreen3 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Im Drawer Screen 3
            </Text>
        </View>
    );
};

export default DrawerScreen3;
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#737065',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
}
