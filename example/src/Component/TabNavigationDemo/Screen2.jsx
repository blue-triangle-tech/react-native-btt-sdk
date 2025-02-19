import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

const Screen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Im Screen 2</Text>
    </View>
  );
};

export default Screen2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bf8dee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
