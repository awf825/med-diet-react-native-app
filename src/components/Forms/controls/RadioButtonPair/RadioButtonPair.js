import React, { memo } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useFormikContext } from 'formik';

const RadioButtonPair = ({
    label,
    options,
    fieldCode,
    isStringValue, // is the form value a string (for id'ing) or a number (for scoring)?
}) => {
    const { values, errors, setFieldValue } = useFormikContext();
    return (
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
            <RadioButton.Group
                onValueChange={(value) => {             
                    setFieldValue(fieldCode, value)
                }}
                value={values[fieldCode]}
            >
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
                    <View>
                        {
                            options.map((qao, i) => {
                                return <View key={i+1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton.Android
                                        value={String(qao.answer_value)}
                                        color="blue"
                                    />
                                    <Text
                                        style={{ 
                                            width: '80%',
                                            padding: 5
                                        }}
                                    >{qao.option_text}</Text>
                                </View>
                            })
                        }
                    </View>
                {
                    errors[fieldCode] && 
                    <Text style={{color: "red"}}>{errors[fieldCode]}</Text>
                }
            </View>
            </RadioButton.Group>
        </View>
    )
};

export default memo(RadioButtonPair)