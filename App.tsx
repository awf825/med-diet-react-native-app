import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './src/navigation/AuthStack.js';
// import AppStack from './src/navigation/AppStack';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      {/* <AppStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;
