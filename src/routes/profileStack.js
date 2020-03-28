import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';

import ProfileConfiguration from '../pages/profile/ProfileConfiguration';
import AccountInformation from '../pages/profile/AccountInformation';
import ChangePassword from '../pages/profile/ChangePassword';

const ProfileStack = createStackNavigator({
    ProfileConfiguration: {
        screen: ProfileConfiguration,
        navigationOptions: (props) => ({
            title: 'Configurações de Perfil',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity style={{
                                            width: 50,
                                            height: 50,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                  onPress={() => props.navigation.toggleDrawer()}>
                    <FontAwesome name="bars" color="#007AFF" size={26} />
                </TouchableOpacity>
            )
        })
    },
    AccountInformation: {
        screen: AccountInformation,
        navigationOptions: {
            headerTitle: 'Alterar informações',
            headerTitleAlign: 'center',
            headerBackTitle: 'Voltar'
        }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: {
            headerTitle: 'Alterar senha',
            headerTitleAlign: 'center',
            headerBackTitle: 'Voltar'
        }
    }
});

export default createAppContainer(ProfileStack);