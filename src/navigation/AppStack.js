import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

import SurveyScreen from '../screens/SurveyScreen';
import DashboardScreen from '../screens/DashboardScreen';
import FFQFormScreen from '../screens/FFQFormScreen';
import StatsScreen from '../screens/StatsScreen';

const AppStack = () => {
    const { logout, userInfo } = useContext(AuthContext)
      
    const CustomDrawerContent = (props) => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={logout} />
        </DrawerContentScrollView>
      );
    }

    const _Drawer = () => {
      return (
        <Drawer.Navigator
          screenOptions={{
            drawerActiveTintColor: "red"
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Survey" component={SurveyScreen} />
          <Drawer.Screen name="My Stats" component={StatsScreen} />
        </Drawer.Navigator>
      );
    }

    return (
        // screenOptions props: https://reactnavigation.org/docs/drawer-navigator/#title
        <Stack.Navigator initialRouteName={userInfo?.ffq_complete>0 ? "Drawer" : "FFQ"}>
          <Stack.Screen
            name="Drawer"
            component={_Drawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="FFQ" 
            component={FFQFormScreen} 
            options={{
              headerTitle: "Before we get started..."
            }}
          />
        </Stack.Navigator>
    );
}

export default AppStack;