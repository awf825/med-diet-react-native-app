import React, { useState } from 'react';
import {
    Text,
    View
  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AppPicker = ({ options, label }) => {
    const [value, setValue] = useState(0);
    return (
        <View testId={"PICKER"}>
            <Text>{label}</Text>
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
        </View>
    )
}

export default AppPicker;