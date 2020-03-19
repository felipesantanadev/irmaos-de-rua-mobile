import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, StyleSheet, Image, View, Dimensions } from 'react-native';

import DefaultButton from '../components/buttons/DefaultButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import Input from  '../components/inputs/Input';
import { Form } from '@unform/mobile';

const Login = (props) => {
    const formRef = useRef(null);
    var {width, height} = Dimensions.get('window');
    var cookieLoverRatio = width / 1000; // 1000 is the current image width
    var cookieLoverImageHeight = 836;
    var bluePathRatio = width / 1000;
    var bluePathHeight = 1038;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={true}>
            <View style={styles.content}>
                <Form ref={formRef}>
                    <View style={styles.view}>
                        <Text style={styles.title}>Irmãos de Rua</Text>
                        <Input label="E-mail" name="email" type="email" bottom={10} />
                        <Input label="Senha" name="password" bottom={10} secureTextEntry={true} />
                        <DefaultButton text="Entrar" bottom={20} />
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
    }
})

export default Login;