import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { BTTTestsEmulator } from '@bluetriangle/react-native-btt-sdk'

const handleCrash = () => {
  throw new Error('This is a simulated crash');
};
const bttTestsEmulator = new BTTTestsEmulator()

const Home = ({ navigation }) => {
  const emulateCrash = ()=> {
    bttTestsEmulator.emulateCrash()
  }
  const emulateANR = ()=> {
    bttTestsEmulator.emulateANR()
  }
  const emulateMemoryWarning = ()=> {
    bttTestsEmulator.emulateMemoryWarning()
  }

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

      <TouchableOpacity style={styles.button} onPress={emulateANR}>
        <Text style={styles.buttonText}>Emulate ANR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={emulateCrash}>
        <Text style={styles.buttonText}>Emulate Crash</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={emulateMemoryWarning}>
        <Text style={styles.buttonText}>Emulate Memory Warning</Text>
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
