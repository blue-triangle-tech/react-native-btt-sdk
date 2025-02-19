import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Screen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>I'm Screen 3</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.btnText}>Go to Home</Text>
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
    backgroundColor: '#A6896F',
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
};
