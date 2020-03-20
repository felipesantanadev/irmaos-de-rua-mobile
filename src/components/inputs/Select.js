import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Platform, Picker, Text } from 'react-native';
import { useField } from '@unform/core';

const Select = ({label, name, options, top, bottom, placeholder, ...rest}) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue = '', error } = useField(name);
    const [value, setValue] = useState(options[0].value);
    const [pickerOptions, setPickerOptions] = useState(options);

    useEffect(() => {
        registerField({
          name: fieldName,
          ref: inputRef.current,
          path: '_lastNativeText',
          getValue(ref) {
            return ref._lastNativeText || '';
          },
          setValue(ref, value) {
            ref.setNativeProps({ text: value });
            ref._lastNativeText = value;
          },
          clearValue(ref) {
            ref.setNativeProps({ text: '' });
            ref._lastNativeText = '';
          },
        });
      }, [fieldName, registerField]);

    return (
        <>
            {(label) && <Text style={{color: '#D1D1D6', fontSize: 14}}>{label}</Text>}

            <Picker ref={inputRef} onValueChange={(itemValue) => setValue(itemValue)} 
                    selectedValue={value} style={[
                Platform.OS === "ios" ? iOSStyle.input : androidStyle.input
            , {
                marginBottom: bottom ? bottom : 0,               marginTop: top ? top : 0
            }]} itemStyle={{ height: 120, padding: 0, borderTopColor: '#00000000', borderBottomColor: '#00000000' }}>
                {
                    pickerOptions.map((item, key) => (
                        <Picker.Item key={key} label={item.label} value={item.value} />
                    ))
                }
            </Picker>
        </>
    );
}

const iOSStyle = StyleSheet.create({
    input: {
        width: '100%',
        height: 120,
        borderBottomColor: '#D1D1D6',
        borderBottomWidth: 0,
        color: '#2C2C2C',
        fontSize: 16,
        fontFamily: 'roboto-regular',
        padding: 0
    }
});

const androidStyle = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
        color: '#2C2C2C',
        fontSize: 16,
        fontFamily: 'roboto-regular'
    }
})

export { Select };