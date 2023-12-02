import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext.js';
import { AppNav } from './src/navigation/AppNav.js';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
