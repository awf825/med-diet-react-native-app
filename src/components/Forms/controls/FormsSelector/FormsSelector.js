import React, { useState, memo } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
// https://www.npmjs.com/package/react-native-modal-selector great package
import ModalSelector from 'react-native-modal-selector'
import { useFormikContext } from 'formik';


const FormsSelector = ({
    label,
    options,
    fieldCode
}) => {
    const { errors, setFieldValue } = useFormikContext();
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
                            label: opt.label.option_text
                        }
                    })}
                    initValue="Select a country"
                    onChange={ (option) => { 
                        setTextInputValue(option.label)
                        setFieldValue(fieldCode, option.label)
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
                errors[fieldCode] && 
                <Text style={{color: "red"}}>{errors[fieldCode]}</Text>
            }
        </>

    )
}

export default memo(FormsSelector)