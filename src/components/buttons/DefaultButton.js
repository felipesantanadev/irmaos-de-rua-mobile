import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const DefaultButton = (props) => {

    return (
        <TouchableOpacity onPress={props.onClick} style={[styles.defaultButton, 
                                  { 
                                      marginTop: props.top ?  props.top : 0 ,
                                      marginBottom: props.bottom ?  props.bottom : 0 
                                  }
                                ]}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    defaultButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        color: '#FFF',
        fontFamily: 'roboto-regular',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0
    },
    text: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'roboto-bold'
    }
})

export default DefaultButton;