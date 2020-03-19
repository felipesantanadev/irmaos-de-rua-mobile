// https://github.com/react-native-community/datetimepicker
// https://github.com/react-native-community/hooks

import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Form } from '@unform/mobile';
import Input from '../components/inputs/Input';
import InputDate from '../components/inputs/InputDate';
import DefaultButton from '../components/buttons/DefaultButton';

import { useKeyboard, useDimensions } from '@react-native-community/hooks';

const CreateAccount = () => {
    const formRef = useRef(null);
    const keyboard = useKeyboard();
    const screen = useDimensions().screen

    console.log(Platform.OS + ' ' + screen.height);
    return (
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={(Platform.OS === 'ios') ? "height" : "height"} 
                              enabled
                              keyboardVerticalOffset={screen.height % 100}>
            <ScrollView style={styles.page}>
                    <Form ref={formRef}>
                        <Input label="Primeiro nome" name="firstName" type="text" bottom={10} />

                        <Input label="Primeiro nome" name="firstName2" type="text" bottom={10} />
                        <Input label="Primeiro nome" name="firstName3" type="text" bottom={10} />
                        <Input label="Primeiro nome" name="firstName4" type="text" bottom={10} />
                        <Input label="Primeiro nome" name="firstName5" type="text" bottom={10} />

                        <Input label="Sobrenome" name="lastName" type="text" bottom={10} />
                        <Input label="Digite seu melhor e-mail" name="email" type="email" bottom={10} />
                        <Input label="Escolha uma senha" name="password" secureTextEntry={true} type="text" bottom={10} />
                        <Input label="Repita a senha" name="password" secureTextEntry={true} type="text" bottom={10} />
                        <InputDate label="Data de nascimento" name="birthday" type="text" bottom={10} />
                    </Form>
                    <DefaultButton text="Criar conta" bottom={50} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        padding: '10%'
    }
})

export default CreateAccount;