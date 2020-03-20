// https://www.npmjs.com/package/expo-image-crop

import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View  } from 'react-native';
import { ImageManipulator } from 'expo-image-crop';

const ImageManipulation = ({navigation, uri}) => {
    const { width } = Dimensions.get('window');
    const [isVisible, setIsVisible] = useState(true);
    const [selectedImage, setSelectedImage] = useState(navigation.getParam('uri'));

    const onToggleModal = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        setSelectedImage(navigation.getParam('uri'));
    }, [])

    const done = (image) => {
        const returnData = navigation.getParam('returnData');
        returnData(image);
        navigation.goBack();
    }

    return(
        <ImageBackground resizeMode="contain"  style={styles.background}>
            <ImageManipulator photo={{uri: navigation.getParam('uri')}}
                              onToggleModal={onToggleModal}
                              isVisible={isVisible}
                              onPictureChoosed={(image) => done(image)}
                              btnTexts={{
                                  "done": "Feito"
                              }}
                               />
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ImageManipulation;