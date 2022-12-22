import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const BattleButton = () => {
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BATTLE</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#1c1c1c',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export default BattleButton;
