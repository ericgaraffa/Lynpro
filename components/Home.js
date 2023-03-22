import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useDrawerStatus} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

const {height, width} = Dimensions.get('window');

const MyComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1, backgroundColor:"#0c030c"}}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(63,15,64,0.9)', 'transparent']}
                style={styles.background}
            />
            <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("  ")}>
                <Text style={styles.mainButtonText}>BATTLE</Text>
            </TouchableOpacity>
        </View>
    )
};

export default MyComponent;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderRadius: 25,
        marginBottom: 50,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    mainButton: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: height / 2.5,
        backgroundColor: 'yellow',
        padding: 15,
        borderRadius: 25
    },
    mainButtonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    },
});
