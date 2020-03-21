// https://github.com/react-native-community/datetimepicker
// https://github.com/react-native-community/hooks

import React, { useRef, useState } from 'react';
import { Platform, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Form } from '@unform/mobile';
import { Input, InputDate, Select, Switcher, InputImage } from '../components/inputs';
import DefaultButton from '../components/buttons/DefaultButton';
import Loader from '../components/loaders/Loader';
import { useDimensions } from '@react-native-community/hooks';
import * as Yup from 'yup';
import ValidationHandler from '../utils/ValidationHandler';
import ApiService from '../services/ApiService';
import * as ImageManipulator from 'expo-image-manipulator';
import AlertAsync from '../components/alerts/AlertAsync';

const CreateAccount = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const formRef = useRef(null);
    const screen = useDimensions().screen;

    const schema = Yup.object().shape({
        profilePicture: Yup.string(),
        firstName: Yup.string().max(20, "O nome deve conter menos de 20 caracteres").required("Nome obrigatório"),
        lastName: Yup.string().max(100, "O sobrenome deve conter menos de 100 caracteres").required("Sobrenome obrigatório"),
        phoneNumber: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Número de celular inválido.").required("Celular obrigatório"),
        email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
        birthday: Yup.string().required("Data de nascimento obrigatória"),
        gender: Yup.number().required("Gênero obrigatório"),
        password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha obrigatória"),
        confirmPassword: Yup.string().min(6, "A confirmação da senha deve ter pelo menos 6 caracteres").required("Confirmação de senha obrigatória"),
        vehicle: Yup.boolean()
    });

    const handleSubmit = async (data) => {
        await ValidationHandler(formRef, schema, data, async () => {
            setLoading(true);
            var picture = "";
            if(data.profilePicture){
                picture = await ImageManipulator.manipulateAsync(data.profilePicture, [], { base64: true });
            }
            var splitBirthday = data.birthday.split('/');
            var birthday = `${splitBirthday[2]}-${splitBirthday[1]}-${splitBirthday[0]}`;

            try {
                var response = await ApiService.post('/account', {
                    email: data.email,
                    phoneDDD: data.phoneNumber.substring(0, 2),
                    phoneNumber: data.phoneNumber.substring(2),
                    firstName: data.firstName,
                    lastName: data.lastName,
                    genre: data.gender,
                    birthday: birthday,
                    hasVehicle: data.vehicle,
                    password: data.password,
                    passwordConfirmation: data.confirmPassword,
                    profilePicture: picture.base64
                });

                if(response.data.errorMessage) {
                    const alertResult = await AlertAsync("Erro ao criar a conta",
                                                         response.data.errorMessage,
                                                         "ok");
                    if(alertResult === "ok"){
                        setLoading(false);
                    }
                }
                else {
                    const alertResult = await AlertAsync("Conta criada",
                                                         "Sua conta foi criada com sucesso!",
                                                         "ok");
                    if(alertResult === "ok"){
                        setLoading(false);
                        navigation.goBack();
                    }
                }
            }
            catch(err) {
                const alertResult = await AlertAsync("Erro ao criar a conta",
                                                      err,
                                                      "ok");
                if(alertResult === "ok"){
                    setLoading(false);
                }
            }
        });
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={(Platform.OS === 'ios') ? "height" : "height"} 
                              enabled
                              keyboardVerticalOffset={screen.height % 100}>
            <Loader visible={loading} 
                    background="#007AFF"
                    animationSource={require("../../assets/lotties/loading.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                    loop={true}
                    message="Aguarde..." />
            <ScrollView style={styles.page}>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <InputImage name="profilePicture" navigation={navigation} useImageManipulation={true} width={150} height={150} align="center" bottom={20} />
                        <Input label="Primeiro nome" name="firstName" bottom={10} />
                        <Input label="Sobrenome" name="lastName" bottom={10} />
                        <Input label="Número de celular com DDD" name="phoneNumber" type="numeric" bottom={10} />
                        <Input label="Digite seu melhor e-mail" name="email" type="email-address" bottom={10} />
                        <InputDate label="Data de nascimento" name="birthday" type="numeric" bottom={10} defaultValue="12/10/1992" />
                        <Select label="Gênero" 
                                name="gender" 
                                options={[{ label: "Masculino", value: 0 }, { label: "Feminino", value: 1}]} 
                                bottom={ Platform.OS === "ios" ? 10 : 25 } />
                        <Input label="Escolha uma senha" name="password" secureTextEntry={true} bottom={10} />
                        <Input label="Repita a senha" name="confirmPassword" secureTextEntry={true} bottom={10} />
                        <Switcher label="Possui veículo?" name="vehicle" top={10} />
                    </Form>
                    <DefaultButton text="Criar conta" top={20} bottom={50} onClick={() => formRef.current.submitForm()} />
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
    },
    lottie: {
        width: 100,
        height: 100
    }
})

export default CreateAccount;