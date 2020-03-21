import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useField } from '@unform/core';

const InputImage = ({navigation, useImageManipulation, width, height, align, top, bottom, name, label, ...rest}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const selectPicture = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if(pickerResult.cancelled === true){
            return;
        }
        else
        {
            if(useImageManipulation){
                navigation.navigate('ImageManipulation', {
                    navigation: navigation,
                    uri: pickerResult.uri,
                    returnData: getManipulatedImage
                });
            }
            else {
                setSelectedImage(pickerResult.uri);
            }
        }
    }

    const getManipulatedImage = async (image) => {
        setSelectedImage(image.uri);
        inputRef.current._lastNativeText = image.uri;
    }

    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue = '', error } = useField(name);

    useEffect(() => {
        registerField({
          name: fieldName,
          ref: inputRef.current,
          path: '_lastNativeText',
          getValue(ref) {
            return ref._lastNativeText || '';
          },
          setValue(ref, value) {
            ref.setNativeProps({ text: value });
            ref._lastNativeText = value;
          },
          clearValue(ref) {
            ref.setNativeProps({ text: '' });
            ref._lastNativeText = '';
          },
        });
      }, [fieldName, registerField]);

    return (
        <TouchableOpacity onPress={selectPicture} style={{
                            width: width,
                            height: height,
                            alignSelf: align,
                            backgroundColor: '#007AFF',
                            borderRadius: 100,
                            marginTop: top ? top : 0,
                            marginBottom: bottom ? bottom : 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
            <TextInput ref={inputRef} defaultValue={selectedImage} style={{display: 'none'}}/>

            { 
                selectedImage != null &&
                <Image source={{ uri: selectedImage }}
                       resizeMode="cover"
                       style={[styles.image, { width: width, height: height }]} />
            }
            <FontAwesome name="camera" color="#fff" size={32} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        zIndex: 0,
        borderRadius: 100
    }
});

export { InputImage };