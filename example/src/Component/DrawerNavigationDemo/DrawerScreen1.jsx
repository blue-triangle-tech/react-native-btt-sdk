import React from 'react';

import { Text, View } from 'react-native';

const DrawerScreen1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Im Drawer Screen 1</Text>
    </View>
  );
};

export default DrawerScreen1;
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B438C',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
};
