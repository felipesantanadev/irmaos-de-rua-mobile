// https://github.com/react-native-community/datetimepicker

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Platform, View, Text, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useField } from '@unform/core';

const InputDate = ({label, name, top, bottom, placeholder, ...rest}) => {
    const [show, setShow] = useState(false);

    const getDateString = (dateToConvert) => {
        return `${String(dateToConvert.getDate()).padStart(2, '0')}/${dateToConvert.getMonth() + 1}/${dateToConvert.getFullYear()}`;
    }

    const stringToDate = () => {
        let splittedDate = date.split('/');
        return new Date(parseInt(splittedDate[2]), parseInt(splittedDate[1]) - 1, parseInt(splittedDate[0]));
    }

    const [date, setDate] = useState(getDateString(new Date()));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(getDateString(currentDate));
    };
    
    const [style, setStyle] = useState(styles);

    function onFocus() {
        let isIOS = Platform.OS === 'ios';

        if(!isIOS){
            setShow(true);
        }
        setStyle(blurStyles);
    }

    function onBlur(){
        if(inputRef.current._lastNativeText === "" || inputRef.current._lastNativeText == undefined){
            setStyle(styles);
        } else {
            setStyle(blurStyles);
        }
    }

    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue = '', error } = useField(name);

    useEffect(() => {
        setShow(Platform.OS === 'ios');
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

        if(rest.defaultValue != undefined && rest.defaultValue != ""){
            setStyle(blurStyles);
        }
      }, [fieldName, registerField]);

    return (
        <View>
            <>
                {(label) && <Text style={[style.text, {
                                        marginBottom: bottom ? bottom : 0,
                                        marginTop: top ? top : 0
                                    }]}>{label}</Text>}

                <TextInput onFocus={onFocus} 
                            onBlur={onBlur} 
                            style={[style.input,
                                    {
                                        marginBottom: bottom ? bottom : 0,
                                        marginTop: top ? top : 0
                                    }]} 
                            ref={inputRef} 
                            defaultValue={date} 
                            placeholder={placeholder}
                            editable={!show}
                            {...rest} />
            </>
            {show && (
            <DateTimePicker
                    value={stringToDate()}
                    onChange={onChange}
                    />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 25,
        borderBottomColor: '#D1D1D6',
        borderBottomWidth: 2,
        color: '#2C2C2C',
        fontSize: 16,
        fontFamily: 'roboto-regular'
    },
    text: {
        color: '#D1D1D6',
        fontSize: 14
    }
});

const blurStyles = StyleSheet.create({
    input: {
        width: '100%',
        height: 25,
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
        color: '#2C2C2C',
        fontSize: 16,
        fontFamily: 'roboto-regular'
    },
    text: {
        color: '#007AFF',
        fontSize: 12
    }
})

export { InputDate };