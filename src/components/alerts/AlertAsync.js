import React from 'react';
import { Alert } from 'react-native';

const AlertAsync = async (title, message, buttonType) => {
    return new Promise((resolve, reject) => {
        Alert.alert(title, message, GetButtons(buttonType, resolve));
    });
}

const GetButtons = (buttonType, resolve) => {
    let buttons = [];

    if(buttonType === "ok") {
        buttons.push({
            text: 'Ok',
            onPress: () => { resolve('ok') }
        })
    }
    else if(buttonType === "okOrCancel") {
        buttons.push({
            text: 'Ok',
            onPress: () => { resolve('ok') }
        }, {
            text: 'Ok',
            onPress: () => { resolve('cancel') }
        })
    }
    else if(buttonType === "yerOrNo") {
        buttons.push({
            text: 'Yes',
            onPress: () => { resolve('yes') }
        }, {
            text: 'No',
            onPress: () => { resolve('no') }
        })
    }

    return buttons;
}

export default AlertAsync;