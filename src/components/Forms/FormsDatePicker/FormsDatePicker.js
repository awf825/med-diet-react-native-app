import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const FormsDatePicker = ({
    formik,
    label,
    fieldCode
}) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState('Push to select.');

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
                    flexDirection: 'row',
                    borderBottomColor: '#ccc',
                }}
            >
                <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                />
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
                        {dobLabel}
                    </Text>
                </TouchableOpacity>
            </View>
            <DatePicker
                modal
                open={open}
                date={date}
                mode={'date'}
                maximumDate={new Date('2005-01-01')}
                minimumDate={new Date('1960-01-01')}
                onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setDobLabel(date.toDateString());
                    formik.setFieldValue(fieldCode, date.toDateString())
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>

    )
}