// https://reactnavigation.org/docs/drawer-navigator/#props

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import Feed from '../pages/Feed';
import DeliveryLocations from '../pages/DeliveryLocations';
import ManageFood from '../pages/ManageFood';
import SideMenu from '../components/drawers/SideMenu';

import ProfileStack from '../routes/profileStack';

const RootDrawerNavigator = createDrawerNavigator({
    Feed: {
        screen: Feed
    },
    Profile: {
        screen: ProfileStack
    },
    DeliveryLocations: {
        screen: DeliveryLocations
    },
    ManageFood: {
        screen: ManageFood
    }
}, {
    drawerWidth: '100%',
    drawerBackgroundColor: '#007AFF',
    contentComponent: SideMenu,
    contentOptions: {
        activeTintColor: '#000000',
        activeBackgroundColor: '#e6e6e6',
    },
    hideStatusBar: true
});

export default createAppContainer(RootDrawerNavigator);