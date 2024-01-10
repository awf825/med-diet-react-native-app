import React, { useContext } from 'react';
import { View, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { AuthContext } from '../context/AuthContext.js';

import AuthStack from './AuthStack.js';
import AppStack from './AppStack.js';
import PreappStack from './PreappStack.js'
import linking from '../../linking.js';

export const AppNav = () => {
    const {
        isLoading, 
        userToken,
        userInfo
    } = useContext(AuthContext)

    return (
        <>
            {
                isLoading ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size={'large'}/>
                </View> :
                <NavigationContainer linking={linking}>
                { 
                    userToken !== null ? 
                    userToken && userInfo?.ffq_complete > 0 ?
                    <AppStack /> :
                    <PreappStack /> :
                    <AuthStack />
                }
                </NavigationContainer>
            }
        </>
    )

}