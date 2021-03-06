import React, { useRef, useState, useContext, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, StyleSheet, Image, View, Dimensions, SafeAreaView } from 'react-native';

import DefaultButton from '../components/buttons/DefaultButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { Input } from  '../components/inputs';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import ValidationHandler from '../utils/ValidationHandler';
import ApiService from '../services/ApiService';
import { StoreUser, Profile } from '../services/IdentityServer';
import Loader from '../components/loaders/Loader';
import AlertAsync from '../components/alerts/AlertAsync';
import { AuthContext } from '../context/AuthContext';

const Login = (props) => {
    const [token, setToken] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);

    var { width } = Dimensions.get('window');
    var cookieLoverRatio = width / 1000; // 1000 is the current image width
    var cookieLoverImageHeight = 836;
    var bluePathRatio = width / 1000;
    var bluePathHeight = 1038;

    const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        password: Yup.string().required("Senha obrigatória")
    });

    const login = async (data) => {
        await ValidationHandler(formRef, schema, data, async () => {
            try {
                setLoading(true);

                var response = await ApiService.post('/auth', {
                    Username: data.email,
                    Password: data.password,
                    GrantType: "password"
                });

                if(response.data.errorMessage) {
                    const alertResult = await AlertAsync("Falha no login",
                                                        response.data.errorMessage,
                                                        "ok");
                    if(alertResult === "ok"){
                        setLoading(false);
                    }
                }
                else {
                    setLoading(false);

                    await StoreUser(response.data.result.userId, data.email, 
                        response.data.result.token, 
                        response.data.result.expiration, 
                        response.data.result.refreshToken, 
                        response.data.result.refreshTokenExpiration, 
                        response.data.result.roles);
                    
                    await Profile(true);
                    setToken(response.data.result.token);
                }
            } catch(err) {
                const alertResult = await AlertAsync("Erro de login",
                                                      "Tente novamente",
                                                      "ok");
                if(alertResult === "ok"){
                    setLoading(false);
                }
            }
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={true}>
            <View style={styles.content}>
                <Loader visible={loading} 
                        background="#007AFF"
                        animationSource={require("../../assets/lotties/loading.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                        loop={true}
                        message="Entrando..." />
                <Form ref={formRef} onSubmit={login}>
                    <View style={styles.view}>
                        <Text style={styles.title}>Irmãos de Rua</Text>
                        <Input label="E-mail" name="email" type="email-address" bottom={10} />
                        <Input label="Senha" name="password" bottom={10} secureTextEntry={true} />
                        <DefaultButton text="Entrar" bottom={20} onClick={() => formRef.current.submitForm()} />
                        <SecondaryButton text="Cadastre-se" onClick={() => props.navigation.navigate('CreateAccount')} />
                    </View>
                    <Image source={require('../../assets/images/cookie_lover.png')} 
                                    style={styles.cookieLover}
                                    resizeMode="contain"
                                    width={width}
                                    height={cookieLoverImageHeight * cookieLoverRatio}>

                    </Image>
                    <Image source={require('../../assets/images/blue-path.png')} 
                                    style={styles.bluePath}
                                    resizeMode="contain"
                                    width={width}
                                    height={bluePathHeight * bluePathRatio}>

                    </Image>
                </Form>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    content: {
        zIndex: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: '20%'
    },
    view: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        paddingRight: '10%',
        paddingLeft: '10%',
        backgroundColor: '#00000000',
        zIndex: 2
    },
    title: {
        color: '#8E8E93',
        fontFamily: 'roboto-bold',
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 40
    },
    bluePath: {
        bottom: 0,
        position: 'absolute',
        zIndex: 0
    },
    cookieLover: {
        bottom: 0,
        position: 'absolute',
        zIndex: 1
    },
    lottie: {
        width: 100,
        height: 100
    }
})

export default Login;