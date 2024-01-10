import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FFQFormScreen from '../screens/FFQFormScreen';

const Stack = createNativeStackNavigator();

const PreappStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FFQ" component={FFQFormScreen} />
    </Stack.Navigator>
  );
};

export default PreappStack;