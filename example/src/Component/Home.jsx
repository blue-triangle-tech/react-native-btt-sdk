import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

const handleCrash = () => {
  throw new Error('This is a simulated crash');
};
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ScreenTracking')}
      >
        <Text style={styles.buttonText}>Screen Tracking</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCrash}>
        <Text style={styles.buttonText}>Track Crash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('network calls axios')}
      >
        <Text style={styles.buttonText}>Network Calls Axios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('network calls fetch')}
      >
        <Text style={styles.buttonText}>Network Calls Fetch</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
