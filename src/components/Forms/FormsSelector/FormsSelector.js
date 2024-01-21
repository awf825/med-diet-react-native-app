import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
// https://www.npmjs.com/package/react-native-modal-selector great package
import ModalSelector from 'react-native-modal-selector'

export const FormsSelector = ({
    formik,
    label,
    options,
    fieldCode
}) => {
    const [textInputValue, setTextInputValue] = useState("Click to select")

    return (
        <>
            <View>
                <View
                    style={{ 
                        padding: 13,
                        margin: 'auto',
                        justifyContent:'center',
                        alignContent:'center'
                    }} 
                >
                    <Text>{label}</Text>
                </View>
            </View>
            <View
                style={{ 
                    padding: 13,
                    margin: 'auto',
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start'
                }} 
            >
                <ModalSelector
                    data={options.map((opt, i) => {
                        return {
                            key: i+1,
                            label: opt.option_text
                        }
                    })}
                    initValue="Select a country"
                    onChange={ (option) => { 
                        setTextInputValue(option.label)
                        formik.setFieldValue(fieldCode, option.label)
                    }} 
                >
                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                        editable={false}
                        value={textInputValue} 
                    />
                </ModalSelector>
            </View>
            {
                formik.errors[fieldCode] && 
                <Text style={{color: "red"}}>{formik.errors[fieldCode]}</Text>
            }
        </>

    )
}