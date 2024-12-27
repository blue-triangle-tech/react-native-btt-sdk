import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { BTTConfiguration } from '@bluetriangle/react-native-btt-sdk';

function App() {
  return (
    <SafeAreaView>
      <Text>Session ID: {BTTConfiguration.getSessionId()}</Text>
    </SafeAreaView>
  );
}

export default App;
