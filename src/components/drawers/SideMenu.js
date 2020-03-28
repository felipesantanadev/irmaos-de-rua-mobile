import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, SafeAreaView, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { EvilIcons } from '@expo/vector-icons';
import { Profile, Clear } from '../../services/IdentityServer';
import { AuthContext } from '../../context/AuthContext';

const SideMenu = (props) => {
    const [profile, setProfile] = useState(null);
    const [picture, setPicture] = useState('');
    const [token, setToken] = useContext(AuthContext);

    const loadProfile = async () => {
        const result = await Profile(false);
        setProfile(result);
        setPicture(result.picture);
    }
    useEffect(() => {
        loadProfile();
    }, []);

    const navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        props.navigation.dispatch(navigateAction);
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.closeContent}>
                    <TouchableOpacity style={styles.closeIcon}
                                      onPress={() => props.navigation.toggleDrawer()}>
                        <EvilIcons name="close" color="#fff" size={32} />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContent}>
                    {
                        picture != "" && (
                            <Image style={styles.image} source={{ uri: picture, cache: 'reload' }} resizeMode="cover" />
                        )
                    }
                </View>
                <View style={styles.screenStyle}>
                    <Text style={styles.screenTextStyle} onPress={navigateToScreen('Feed')}>Início</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text style={styles.screenTextStyle} onPress={navigateToScreen('Profile')}>Configurar Perfil</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text style={styles.screenTextStyle} onPress={navigateToScreen('DeliveryLocations')}>Locais de Entrega</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text style={styles.screenTextStyle} onPress={navigateToScreen('ManageFood')}>Gerenciar Alimentos</Text>
                </View>
                <View style={styles.screenStyle}>
                    <TouchableOpacity onPress={async () => { 
                        await Clear();
                        setToken("");
                    }}>
                        <Text style={styles.screenTextStyle}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    closeContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: 50,
        paddingRight: 8
    },
    closeIcon: { 
        width: 32, 
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenStyle: {
        height: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    screenTextStyle:{
        fontSize: 18, 
        textAlign: 'center',
        fontFamily: 'roboto-regular',
        color: '#fff'
    },
    imageContent: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: '#006CE1',
        borderColor: '#fff',
        borderWidth: 1
    }
})
export default SideMenu;