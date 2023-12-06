import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthAxios from '../services/AuthAxios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = (username, password) => {
        setIsLoading(true);
        AuthAxios().post("/api/auth/login", {
            username,
            password
        })
        .then(resp => {
            console.log(resp.data)
            // let userInfo = resp.data.user
            setUserToken(resp.data.token)
            // AsyncStorage.setItem('userInfo', resp.data.user)
            AsyncStorage.setItem('userToken', JSON.stringify(resp.data.token))
        })
        .catch(e => {
            console.log(e)
        })
        setIsLoading(false);
    }

    const register = (username, password) => {
        setIsLoading(true);
        AuthAxios().post("/api/auth/register", {
            username,
            password
        })
        .then(resp => {
            console.log(resp.data)
            // let userInfo = resp.data.user
            setUserToken(resp.data.token)
            // AsyncStorage.setItem('userInfo', resp.data.user)
            AsyncStorage.setItem('userToken', JSON.stringify(resp.data.token))
        })
        .catch(e => {
            console.log(e)
        })
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        // AsyncStorage.removeItem('userInfo', resp.data.user)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            // AsyncStorage.getItem('userInfo', resp.data.user)
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken)
            setIsLoading(false);
        } catch (e) {
            console.log(`isLogged in error ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={
            {
                login, 
                logout, 
                userToken, 
                isLoading,
                register
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}