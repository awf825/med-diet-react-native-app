import React, { useEffect, useState, useContext } from 'react';
import {
    Text,
    View,
    ActivityIndicator
} from 'react-native';

import FFQForm from '../components/Forms/FFQForm';
import CustomButton from '../components/CustomButton/CustomButton';
import { AuthContext } from '../context/AuthContext';
import AuthAxios from '../services/AuthAxios';

const FFQFormScreen = (props) => {
    const { userToken, logout } = useContext(AuthContext)
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        AuthAxios(userToken).get("/api/questions/")
        .then(resp => {
            console.log('resp.data: ', resp.data)
            setQuestions(resp.data)
        })
        .catch(err => console.log(err))
        setIsLoading(false);

        return () => {
            setIsLoading(false);
        }
    }, [])

    const _handleSubmit = (values) => {
        console.log('values: ', values)
    }

    return (
        <>
            {
                questions.length
                ?
                <FFQForm questions={questions} _handleSubmit={_handleSubmit} />
                :
                <CustomButton label={"Logout"} onPress={logout} />
            }
        </>
        // isLoading 
        // ?
        // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        //     <ActivityIndicator size={'large'}/>
        // </View>
        // :
    );
};

export default FFQFormScreen;