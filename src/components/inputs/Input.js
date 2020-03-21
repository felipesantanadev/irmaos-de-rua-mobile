import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { useField } from '@unform/core';

function Input({ name, label, ...rest }) {
    const [style, setStyle] = useState(styles);

    function onFocus() {
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
        <>
          {(error) && <Text style={[{
                                 color: 'red',
                                 marginBottom: rest.bottom ? rest.bottom : 0,
                                 marginTop: rest.top ? rest.top : 0
                             }]}>{error}</Text>}
          {(label && !error) && <Text style={[style.text, {
                                 marginBottom: rest.bottom ? rest.bottom : 0,
                                 marginTop: rest.top ? rest.top : 0
                             }]}>{label}</Text>}

          <TextInput onFocus={onFocus} 
                     onBlur={onBlur} 
                     style={[style.input,
                             {
                                 marginBottom: rest.bottom ? rest.bottom : 0,
                                 marginTop: rest.top ? rest.top : 0
                             }]} 
                     ref={inputRef} 
                     defaultValue={defaultValue} 
                     keyboardType={rest.type ? rest.type : "default"}
                     {...rest} />
        </>
      );
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

export { Input };