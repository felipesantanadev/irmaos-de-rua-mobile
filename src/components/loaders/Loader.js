// https://lottiefiles.com/2077-loading
// https://github.com/react-native-community/lottie-react-native
// https://github.com/vikrantnegi/react-native-animated-loader

import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';
import LottieView from "lottie-react-native";

const Loader = ({visible, animationSource, loop, speed, animationStyle, background, message}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    return(
        <>
            <Modal transparent
                   visible={isVisible}
                   animationType="none"
                   supportedOrientations={['portrait']}
                   onRequestClose={() => {}}>
                <View style={[styles.container, { backgroundColor: background }]}>
                    <View>
                        <LottieView source={animationSource}
                                    loop={loop}
                                    autoPlay
                                    speed={speed}
                                    style={[styles.animationStyle, animationStyle]} />
                        <Text style={{
                            fontFamily: 'roboto-bold',
                            fontSize: 18,
                            color: '#fff',
                            marginTop: 10,
                            textAlign: 'center'
                        }}>{message}</Text>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationStyle: {
        height: '100%',
        width: '100%',
    }
})

export default Loader;