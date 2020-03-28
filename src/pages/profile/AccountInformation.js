import React, { useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Input, InputDate, Select, Switcher } from '../../components/inputs';
import DefaultButton from '../../components/buttons/DefaultButton';
import Loader from '../../components/loaders/Loader';
import { useDimensions } from '@react-native-community/hooks';

const AccountInformation = () => {
    const [loading, setLoading] = useState(false);

    const formRef = useRef(null);
    const screen = useDimensions().screen;
    
    const handleSubmit = async (data) => {
        
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={(Platform.OS === 'ios') ? "height" : "height"} 
                              enabled
                              keyboardVerticalOffset={screen.height % 100}>
            <Loader visible={loading} 
                    background="#007AFF"
                    animationSource={require("../../../assets/lotties/loading.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                    loop={true}
                    message="Aguarde..." />
            <ScrollView style={styles.page}>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input label="Primeiro nome" name="firstName" bottom={10} />
                        <Input label="Sobrenome" name="lastName" bottom={10} />
                        <Input label="Número de celular com DDD" name="phoneNumber" type="numeric" bottom={10} />
                        <Input label="Digite seu melhor e-mail" name="email" type="email-address" bottom={10} />
                        <InputDate label="Data de nascimento" name="birthday" type="numeric" bottom={10} defaultValue="12/10/1992" />
                        <Select label="Gênero" 
                                name="gender" 
                                options={[{ label: "Masculino", value: 0 }, { label: "Feminino", value: 1}]} 
                                bottom={ Platform.OS === "ios" ? 10 : 25 } />
                        <Switcher label="Possui veículo?" name="vehicle" top={10} />
                    </Form>
                    <DefaultButton text="Salvar alterações" top={20} bottom={50} onClick={() => formRef.current.submitForm()} />
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

export default AccountInformation;