import React, { useState, useRef, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Switch } from 'react-native';
import { useField } from '@unform/core';

const Switcher = ({label, name, bottom, top}) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue = '', error } = useField(name);

    const [value, setValue] = useState(false);
    const [color, setColor] = useState({});

    const changeValue = (newValue) => {
        if(newValue) {
            setColor({
                true: "#007AFF",
                false: ""
            });
        } else {
            setColor({});
        }

        setValue(newValue);
        inputRef.current._lastNativeValue = newValue;
    }

    useEffect(() => {
        registerField({
          name: fieldName,
          ref: inputRef.current,
          path: '_lastNativeValue ',
          getValue(ref) {
            return ref._lastNativeValue || false;
          },
          setValue(ref, value) {
            ref.setNativeProps({ value: value });
            ref._lastNativeValue = value;
          },
          clearValue(ref) {
            ref.setNativeProps({ value: false });
            ref._lastNativeValue = false;
          },
        });
      }, [fieldName, registerField]);

    return(
        <View style={styles.view}>
            {(error) && <Text  style={[styles.label, { color: 'red' }]}>{error}</Text>}
            { (label && !error) && <Text style={styles.label}>{label}</Text> }
            
            {
                Platform.OS === "ios" ? <Switch value={value} ref={inputRef}
                                                style={[styles.switch, { marginBottom: bottom, marginTop: top}]} 
                                                trackColor={color}
                                                onValueChange={(value) => changeValue(value)} />
                                      : <Switch value={value}  ref={inputRef}
                                                style={[styles.switch, { marginBottom: bottom, marginTop: top}]} 
                                                thumbColor="#fff" 
                                                trackColor={color}
                                                onValueChange={(value) => changeValue(value)} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        color: '#007AFF'
    },
    switch: {
    }
});

export { Switcher };