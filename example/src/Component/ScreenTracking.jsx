import React from 'react';

import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
const ScreenTracking = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen Tracking</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Tab Navigation Demo')}
      >
        <Text style={styles.buttonText}>Tab Navigation</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Stack Navigation Demo')}
      >
        <Text style={styles.buttonText}>Stack Navigation</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Drawer Navigation Demo')}
      >
        <Text style={styles.buttonText}>Drawer Navigation</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          Alert.alert('Custom Alert', 'This is custom alert message', [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              tempting: true,
              style: {
                color: 'red',
              },
            },
          ])
        }
      >
        <Text style={styles.buttonText}>Show Alert</Text>
      </Pressable>
    </View>
  );
};

export default ScreenTracking;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#d8d7d7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#489fdd',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
