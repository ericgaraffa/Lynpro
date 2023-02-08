import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, useDrawerProgress, DrawerToggleButton,
} from '@react-navigation/drawer';
import Home from './Home';
import Animated from "react-native-reanimated";
import Game from './Game'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Personnaliser from "./Personnaliser";

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
                <DrawerItem label="Enregistrement" onPress={() => alert('Link to help')}/>
                <DrawerItem label="Favoris" onPress={() => alert('Link to help')}/>
                <DrawerItem label="Help" onPress={() => alert('Link to help')}/>
            </Animated.View>
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNav() {
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
            <Drawer.Screen name="Limpro" component={Home} options={{}}/>
        </Drawer.Navigator>
    );
}

function MyDrawer() {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Group>
                <Stack.Screen name="Root" component={DrawerNav} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="Perso" component={Personnaliser} options={{ headerShown: false }}/>
                <Stack.Screen name="Game" component={Game}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default MyDrawer
