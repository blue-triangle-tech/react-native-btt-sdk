import React from 'react';

import { Text, View } from 'react-native';

const DrawerScreen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Im Drawer Screen 2</Text>
    </View>
  );
};

export default DrawerScreen2;
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#367FBF',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
};
