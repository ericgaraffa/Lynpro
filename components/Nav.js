import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, useDrawerProgress, DrawerToggleButton,
} from '@react-navigation/drawer';
import Home from './Home';
import Animated from "react-native-reanimated";

function CustomDrawerContent(props) {
    const progress = useDrawerProgress();

    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    return (
        <DrawerContentScrollView {...props}>
            <Animated.View style={{transform: [{translateX}]}}>
                <DrawerItemList {...props} />
                <DrawerItem label="Help" onPress={() => alert('Link to help')}/>
            </Animated.View>
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerLeft: false,
                drawerPosition: "right",
                headerRight: () => <DrawerToggleButton/>,
            }}
        >
            <Drawer.Screen name="Word" component={Home} options={{}}/>
        </Drawer.Navigator>
    );
}

export default MyDrawer
