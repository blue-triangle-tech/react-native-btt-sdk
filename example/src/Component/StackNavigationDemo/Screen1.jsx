import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Screen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>I'm Screen 1</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('Screen2');
        }}
      >
        <Text style={styles.btnText}>Go to Screen 2</Text>
      </Pressable>
    </View>
  );
};

export default Screen1;
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#8d90ee',
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
};
