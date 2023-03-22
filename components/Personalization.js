import React from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const HelloWorld = (nav) => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Hello World!</Text>
        </View>
    );
};

export default HelloWorld;
