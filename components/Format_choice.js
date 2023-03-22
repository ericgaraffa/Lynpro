import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';


const {height, width} = Dimensions.get('window');

const Format_Choice = (navigation) => {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(63,15,64,0.9)', 'transparent']}
                style={styles.background}
            />
            <View style={styles.centeredView}>
                <TouchableHighlight
                    style={styles.buttonStandard}
                    onPress={() => nav.navigate("   ")}
                >
                    <Text style={styles.buttonText}>STANDARD</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.buttonPersonnaliser}
                    onPress={() => nav.navigate("    ")}
                >
                    <Text style={styles.buttonText}>PERSONNALISER</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default Format_Choice;


const styles = StyleSheet.create({
    buttonStandard: {
        backgroundColor: '#000',
        borderRadius: 25,
        marginBottom: 50,
        padding: 10,
        alignItems: 'center',
    },
    buttonPersonnaliser: {
        backgroundColor: '#000',
        borderRadius: 25,
        marginBottom: 50,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "#0c030c",
        justifyContent: 'center', // centre le contenu verticalement
        alignItems: 'center', // centre le contenu horizontalement
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '80%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    },
});