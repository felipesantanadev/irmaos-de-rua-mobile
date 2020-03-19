// RNPickeSelect: https://github.com/lawnstarter/react-native-picker-select
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';;

const DefaultPicker = (props) => {
    const [value, setValue] = useState(null);

    const updateValue = (value) => {
        setValue(value);
        if(props.setState){
            props.setState(value);
        }
    }

    return (
        <RNPickerSelect items={props.options} doneText="Selecionar"
                    placeholder={{ label: props.placeholder, value: null, color: '#D1D1D6', }}
                    onValueChange={(value, index) => updateValue(value)}
                     style={{
                         viewContainer: {
                            width: '100%',
                            height: 40,
                            borderBottomWidth: 2,
                            borderBottomColor: '#D1D1D6',
                            marginBottom: props.bottom ? props.bottom : 0,
                            marginTop: props.top ? props.top : 0
                         },
                         modalViewMiddle: {
                            height: 40
                        },
                        placeholder: {
                            color: '#D1D1D6',
                        }
                     }} />
    )
}

export default DefaultPicker;