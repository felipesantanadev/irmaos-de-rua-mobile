import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const DefaultTextInput = (props) => {
    function focus(callback){
        if(callback){
            callback();
        }
    }

    function focusLost(callback){
        if(callback){
            callback();
        }
    }

    function setState(value){
        if(props.setState){
            props.setState(value);
        }
    }

    return (
        <TextInput style={[styles.input, { 
                                      marginTop: props.top ?  props.top : 0 ,
                                      marginBottom: props.bottom ?  props.bottom : 0 
                                  }]} 
                   onFocus={() => focus(props.onFocus)}
                   onBlur={() => focusLost(props.onFocusLost)}
                   onKeyPress={(value) => setState(value)}
                   placeholder={props.placeholder}
                   placeholderTextColor="#D1D1D6"
                   keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                   secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false} />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        borderBottomColor: '#D1D1D6',
        borderBottomWidth: 2,
        color: '#2C2C2C',
        fontSize: 14,
        fontFamily: 'roboto-regular'
    }
})

export default DefaultTextInput;