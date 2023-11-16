import React, { useContext } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SurveyScreen from '../screens/SurveyScreen';
import DashboardScreen from '../screens/DashboardScreen';

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Survey" component={SurveyScreen} />
        </Stack.Navigator>
    );
}

export default AppStack;