import React, { useContext } from 'react';
import { View, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { AuthContext } from '../context/AuthContext.js';

import AuthStack from './AuthStack.js';
import AppStack from './AppStack.js';
import linking from '../../linking.js';

export const AppNav = () => {
    const {
        isLoading, 
        userToken
    } = useContext(AuthContext)

    console.log('userToken: ', userToken)

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
                    <AppStack /> :
                    <AuthStack />
                }
                </NavigationContainer>
            }
        </>
    )

}