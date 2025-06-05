import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CrashScreen = () => {
  const throwError = () => {
    throw new Error('Manual JS Crash!');
  };

  const anotherFunction = ()=>{
    throwError();
  }
  const handleTestErrorAction = ()=>{
    anotherFunction();
  }
  const triggerUnhandledRejection = () => {
    Promise.reject('Unhandled promise rejection!');
  };

  const callUndefinedFunction = () => {
    undefinedFunction(); // will crash
  };

  const handleUndefinedOjbectError = () => {
    const newObj = {
      name: 'John Doe',
    };
    console.log(newObj.unknownProperty);
  };

  const handleTypeError = () => {
    const name = 'jane';
    console.log(name());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crash Simulation</Text>

      <TouchableOpacity style={styles.button} onPress={handleTestErrorAction}>
        <Text style={styles.buttonText}>Throw JS Error</Text>
      </TouchableOpacity>

      {/* unhanlded rejection , not causing any fatal error. */}
      <TouchableOpacity
        style={styles.button}
        onPress={triggerUnhandledRejection}
      >
        <Text style={styles.buttonText}>Unhandled Rejection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={callUndefinedFunction}>
        <Text style={styles.buttonText}>Call Undefined Function</Text>
      </TouchableOpacity>

      {/* Error Json parse */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => JSON.parse('bad json')}
      >
        <Text style={styles.buttonText}> Json Parse Error</Text>
      </TouchableOpacity>

      {/* Error - Undefined object-property access */}
      {/* Show only Warning - not Fatal Error */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleUndefinedOjbectError()}
      >
        <Text style={styles.buttonText}> Undefined Property Access</Text>
      </TouchableOpacity>

      {/* Error Type Error */}
      <TouchableOpacity style={styles.button} onPress={() => handleTypeError()}>
        <Text style={styles.buttonText}> Type Error</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CrashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#444',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
