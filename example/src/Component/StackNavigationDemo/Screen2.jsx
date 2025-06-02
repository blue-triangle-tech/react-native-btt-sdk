import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Screen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>I'm Screen 2</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('Screen3');
        }}
      >
        <Text style={styles.btnText}>Go to Screen 3</Text>
      </Pressable>
    </View>
  );
};

export default Screen2;
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
    backgroundColor: '#D0D991',
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
};
