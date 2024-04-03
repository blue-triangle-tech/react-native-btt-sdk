import React from 'react';
import { Text } from 'react-native';
import { BTTConfiguration } from 'react-native-btt-sdk';

function App() {
  return <Text>{BTTConfiguration.getSessionId()}</Text>;
}

export default App;
