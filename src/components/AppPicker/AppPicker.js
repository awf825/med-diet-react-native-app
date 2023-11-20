import React from 'react';
import { Picker } from '@react-native-picker/picker';

const AppPicker = ({ options, value, setValue }) => {
    return (
        <Picker
            selectedValue={value}
            // style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
                setValue(itemValue)
            }>
            {
                options.map(option => {
                   return <Picker.Item key={option.value} label={option.label} value={option.value} />
                })
            }
        </Picker>
    )
}

export default AppPicker;