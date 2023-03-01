import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from "@react-navigation/native";


const {height, width} = Dimensions.get('window');

const HelloWorld = (navigation) => {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
                <TouchableHighlight
                    style={styles.buttonStandard}
                    onPress={() => nav.navigate("Basic_choice")}
                >
                    <Text style={styles.buttonText}>STANDARD</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.buttonPersonnaliser}
                    onPress={() => nav.navigate("Personalization")}
                >
                    <Text style={styles.buttonText}>PERSONNALISER</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default HelloWorld;


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
    }
});

