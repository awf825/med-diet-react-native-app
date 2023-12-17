import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthAxios from '../services/AuthAxios';
import React, { createContext, useEffect, useState } from 'react';
import Snackbar from "react-native-snackbar"
import { appleAuth } from '@invertase/react-native-apple-authentication';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [snackbar, setSnackbar] = useState(null);
    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
    const [appleUser, setAppleUser] = useState(null);

    /* LOCAL */
    const login = (user) => {
        setIsLoading(true);
        setTimeout(() => {
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
                    setIsLoading(false);
                })
        }, 2000)
    }

    const register = (user) => {
        setIsLoading(true);
        setTimeout(() => {
            AuthAxios().post("/api/auth/register", user)
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
                    setIsLoading(false);
                })
        }, 2000)
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

    /* GOOGLE */
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

    /* APPLE */
    const onAppleButtonPress = async (updateCredentialStateForUser) => {
        console.log('Beginning Apple Authentication');

        // start a login request
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            // console.log('appleAuthRequestResponse', appleAuthRequestResponse);

            const {
                user,
                email,
                identityToken
            } = appleAuthRequestResponse;

            fetchAndUpdateAppleCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );

            console.log('appleAuthRequestResponse: ', appleAuthRequestResponse)
            if (identityToken) {
                if (email) {
                    console.log('payload user, email: ', user, email)
                    AuthAxios().post("/api/auth/appleRegister", {
                        apple_user_id: user,
                        email: email
                    })
                    .then(resp => {
                        console.log(resp.data)
                        // let userInfo = resp.data.user
                        setUserToken(resp.data.token)
                        setAppleUser(user);
                        AsyncStorage.setItem('userToken', JSON.stringify(resp.data.token))
                    })
                    .catch(e => {
                        console.log(e)
                    })
                } else {      
                    AuthAxios().post("/api/auth/appleLogin", {
                        apple_user_id: user,
                    })
                    .then(resp => {
                        console.log(resp.data)
                        // let userInfo = resp.data.user
                        setUserToken(resp.data.token)
                        setAppleUser(user);
                        // AsyncStorage.setItem('userInfo', resp.data.user)
                        AsyncStorage.setItem('userToken', JSON.stringify(resp.data.token))
                    })
                    .catch(e => {
                        console.log(e)
                    })         
                }
            } else {
                setSnackbar(
                    Snackbar.show({
                        text: "Could not authenticate with Apple ID.",
                        duration: Snackbar.LENGTH_LONG,
                    })
                )
                setIsLoading(false);
            }

            console.log(`Apple Authentication Completed, ${user}, ${email}`);
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
                console.warn('User canceled Apple Sign in.');
            } else {
                console.error(error);
            }
        }
    }

    const fetchAndUpdateAppleCredentialState = async (updateCredentialStateForUser) => {
        if (appleUser === null) {
            updateCredentialStateForUser('N/A');
        } else {
            const credentialState = await appleAuth.getCredentialStateForUser(appleUser);
            console.log('credentialState: ', credentialState)
            if (credentialState === appleAuth.State.AUTHORIZED) {
                updateCredentialStateForUser('AUTHORIZED');
            } else {
                updateCredentialStateForUser(credentialState);
            }
        }
    }

    useEffect(() => {
        if (credentialStateForUser !== -1 && !appleAuth.isSupported) return;

        fetchAndUpdateAppleCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );
    }, []);

    useEffect(() => {
        if (credentialStateForUser !== -1 && !appleAuth.isSupported) return;

        return appleAuth.onCredentialRevoked(async () => {
            console.warn('Credential Revoked');
            fetchAndUpdateAppleCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );
        });
    }, []);

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
                snackbar,
                onAppleButtonPress,
                credentialStateForUser,
                updateCredentialStateForUser
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}