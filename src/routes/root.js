import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginStack from './loginStack';
import RootDrawerNavigator from './drawerNavigator';

const Root = createSwitchNavigator({
    App: RootDrawerNavigator
}, {
    initialRouteName: 'App'
});

export default createAppContainer(Root);