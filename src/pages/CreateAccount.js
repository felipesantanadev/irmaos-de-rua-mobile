// https://github.com/react-native-community/datetimepicker
// https://github.com/react-native-community/hooks

import React, { useState, useRef } from 'react';
import { Platform, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Form } from '@unform/mobile';
import { Input, InputDate, Select, Switcher, InputImage } from '../components/inputs';
import DefaultButton from '../components/buttons/DefaultButton';

import { useKeyboard, useDimensions } from '@react-native-community/hooks';

const CreateAccount = ({navigation}) => {
    const formRef = useRef(null);
    const keyboard = useKeyboard();
    const screen = useDimensions().screen;

    return (
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={(Platform.OS === 'ios') ? "height" : "height"} 
                              enabled
                              keyboardVerticalOffset={screen.height % 100}>
            <ScrollView style={styles.page}>
                    <Form ref={formRef}>
                        <InputImage name="profilePicture" navigation={navigation} width={150} height={150} align="center" bottom={20} />
                        <Input label="Primeiro nome" name="firstName" type="text" bottom={10} />
                        <Input label="Sobrenome" name="lastName" type="text" bottom={10} />
                        <Input label="Digite seu melhor e-mail" name="email" type="email" bottom={10} />
                        <Input label="Escolha uma senha" name="password" secureTextEntry={true} type="text" bottom={10} />
                        <Input label="Repita a senha" name="password" secureTextEntry={true} type="text" bottom={10} />
                        <InputDate label="Data de nascimento" name="birthday" type="text" bottom={10} />
                        <Select label="Gênero" 
                                name="gender" 
                                options={[{ label: "Masculino", value: 0 }, { label: "Feminino", value: 1}]} 
                                bottom={ Platform.OS === "ios" ? 10 : 25 } />
                        <Switcher label="Possui veículo?" name="genre" top={10} />
                    </Form>
                    <DefaultButton text="Criar conta" top={20} bottom={50} />
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