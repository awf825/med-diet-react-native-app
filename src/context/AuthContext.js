import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthAxios from '../services/AuthAxios';
import React, { createContext, useEffect, useState } from 'react';
import Snackbar from "react-native-snackbar"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [snackbar, setSnackbar] = useState(null);

    const login = (user) => {
        setIsLoading(true);
        AuthAxios().post("/api/auth/login", user)
        .then(resp => {
            console.log(resp.data)
            // let userInfo = resp.data.user
            setUserToken(resp.data.token)
            // AsyncStorage.setItem('userInfo', resp.data.user)
            AsyncStorage.setItem('userToken', JSON.stringify(resp.data.token))
            setIsLoading(false);
        })
        .catch(e => {
            console.log(e)
            setSnackbar(
                Snackbar.show({
                    text: e.response.data.message,
                    duration: Snackbar.LENGTH_LONG,
                })
            )
            // TODO ALERT WITH SNACK BAR THAT SAYS USER DOESN'T EXIST
            //setIsLoading(false);
        })
        setIsLoading(false);
    }

    const googleLogin = (user) => {
        setIsLoading(true);
        AuthAxios().post("/api/auth/googleLogin", user)
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

        return () => {
            setSnackbar(null)
        }
    }, []);

    return (
        <AuthContext.Provider value={
            {
                login, 
                logout, 
                userToken, 
                isLoading,
                register,
                googleLogin,
                snackbar
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}