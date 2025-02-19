import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

const Screen1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Im Screen 1</Text>
      <Text style={styles.hint}>
        Hint: Navigate to others screen by below buttons
      </Text>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8d90ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  hint: {
    fontSize: 16,
    color: 'white',
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
