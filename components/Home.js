import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useDrawerStatus} from '@react-navigation/drawer';


const {height, width} = Dimensions.get('window');

const MyComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1, backgroundColor: "#3F0F40", marginTop: (height / 2) - 100}}>
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
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 25
    },
    mainButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30
    }
});
