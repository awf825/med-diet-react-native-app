import React, { useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import SurveyScreen from '../screens/SurveyScreen';
import DashboardScreen from '../screens/DashboardScreen';


const AppStack = () => {
    const { logout } = useContext(AuthContext)

    const CustomDrawerContent = (props) => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={logout} />
        </DrawerContentScrollView>
      );
    }

    return (
        // screenOptions props: https://reactnavigation.org/docs/drawer-navigator/#title
        <Drawer.Navigator
          screenOptions={{
            drawerActiveTintColor: "red"
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Survey" component={SurveyScreen} />
        </Drawer.Navigator>
    );
}

export default AppStack;