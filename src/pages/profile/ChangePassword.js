import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Input } from '../../components/inputs';
import { Form } from '@unform/mobile';
import DefaultButton from '../../components/buttons/DefaultButton';
import Loader from '../../components/loaders/Loader';
import { useDimensions } from '@react-native-community/hooks';

const ChangePassword = () => {
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
                        <Input label="Senha atual" name="currentPassword" secureTextEntry={true} bottom={10} />
                        <Input label="Nova senha" name="newPassword" secureTextEntry={true} bottom={10} />
                        <Input label="Repita a nova senha" name="confirmNewPassword" secureTextEntry={true} bottom={10} />
                    </Form>
                    <DefaultButton text="Alterar senha" top={20} bottom={50} onClick={() => formRef.current.submitForm()} />
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

export default ChangePassword;