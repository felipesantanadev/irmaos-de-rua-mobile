import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Transition } from 'react-native-reanimated';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ImageManipulation from './components/images/ImageManipulation';

const Routes = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: false
            }
        },
        CreateAccount: {
            screen: CreateAccount,
            navigationOptions: {
                title: 'Cadastre-se',
                headerTitleAlign: 'center'
            }
        },
        ImageManipulation: {
            screen: ImageManipulation,
            navigationOptions: {
                headerShown: false
            }
        }
    }
)

export default createAppContainer(Routes);