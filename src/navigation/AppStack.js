import React, { useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';

const AppStack = () => {
    const { logout } = useContext(AuthContext)
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 25}}>

                <Text
                    style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Logout
                </Text>
                <CustomButton label={"Logout"} onPress={() => {logout()}} />

            </View>
        </SafeAreaView>
    )
}

export default AppStack;