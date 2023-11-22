import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import InputField from '../InputField/InputField';
import AppPicker from "../AppPicker/AppPicker"
import {
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native';

const FormBlock = ({ item, index }) => {
    // will be formik values in the future
    const [value, setValue] = useState(0);

    let options = [];
    for (let i = 0; i <= 30; i++) {
        options.push({
            label: String(i),
            value: i
        })
    }
    
    return (
        <View style={styles.item} testId={`app-picker-${index}`}>
            <Text>{item.question_text}</Text>
            {
                <AppPicker 
                    options={options} 
                    value={value} 
                    setValue={setValue}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        // backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default FormBlock;