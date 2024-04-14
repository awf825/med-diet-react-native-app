import React, { memo } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonGroup = ({
    formik,
    label,
    options,
    fieldCode,
    isStringValue // is the form value a string (for id'ing) or a number (for scoring)?
}) => {
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
                onValueChange={() => {
                    console.log('formik: ', formik)
                    formik.handleChange(fieldCode)
                }}
                value={formik.values[fieldCode]}
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
                    <View
                        style={{ 
                            width: '50%'
                        }}
                    >
                        {
                            options.slice(0,5).map((qao, i) => {
                                return <View key={i+1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton.Android
                                        value={isStringValue ? qao.option_text : String(qao.ordering)} // using ordering here as it makes logical sense for 'score' at the moment
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
                    <View
                        style={{ 
                            width: '50%',
                        }}
                    >
                        {
                            options.slice(5).map((qao, i) => {
                                return <View key={i+1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton.Android
                                        value={String(qao.ordering)} // using ordering here as it makes logical sense for 'score' at the moment
                                        color="blue"
                                    />
                                    <Text
                                        style={{ 
                                            width: '80%',
                                            padding: 5
                                        }}
                                    >
                                        {qao.option_text}
                                    </Text>
                                </View>
                            })
                        }
                    </View>
                {
                    formik.errors[fieldCode] && 
                    <Text style={{color: "red"}}>{formik.errors[fieldCode]}</Text>
                }
            </View>
            </RadioButton.Group>
        </View>
    )
};

export default memo(RadioButtonGroup)