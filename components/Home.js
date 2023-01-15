import React, {useRef, useState, useCallback, useEffect} from 'react';
import {View, ScrollView, Text, Button, TouchableOpacity, Dimensions, TouchableHighlight, StyleSheet} from 'react-native';
import Personnaliser from './Personnaliser';
import {useNavigation} from "@react-navigation/native";

const {height, width} = Dimensions.get('window');


const MyComponent = () => {

    const navigation = useNavigation();

    const timeBeforeWord = [
        {id: 1, name: '2'},
        {id: 2, name: '4'},
        {id: 3, name: '6'}
    ];

    const [scroll, setScroll] = useState(false);
    const [persoCompet, setPersoCompet] = useState(false);
    const [click, setClick] = useState(false);
    const [standardPos, setstandardPos] = useState({x: 0, y: height+ height/3.2});
    const [classicPos, setclassicPos] = useState({x: 0, y: 0});
    const [personaliserPos, setPersonaliserPos] = useState({x: 0, y: height*2 + height/50});
    const scrollViewRef = useRef(null);
    const initialPosition = height / 3;
    const [SelectedPassageProp, setSelectedPassageProp] = useState(null);
    const [SelectedIdProp, setSelectedIdProp] = useState(null);

    useEffect(() => {
        setstandardPos({x: 0, y: initialPosition});
        setclassicPos({x: 0, y: initialPosition + height / 20 + height});
    }, [])

    const selectAutoClassic = () => {
        const classictimeBeforeWord = timeBeforeWord.find(item => item.name === '4');
        setSelectedPassageProp(classictimeBeforeWord);
        setSelectedIdProp(classictimeBeforeWord.id);
    };

    const selectAutoCompete = () => {
        const competetimeBeforeWord = timeBeforeWord.find(item => item.name === '2');
        setSelectedPassageProp(competetimeBeforeWord);
        setSelectedIdProp(competetimeBeforeWord.id);
    };

    const handleStartPress = useCallback(() => {
        setScroll(true);
    }, []);

    const handlePersonnaliserPress = useCallback(() => {
        setPersoCompet(true);
        scrollViewRef.current.scrollTo({x: standardPos.x, y: standardPos.y, animated: true});
    }, []);

    const handleCompetPress = useCallback(() => {
        setPersonaliserPos({x: 0, y: classicPos.y + height / 20});
        scrollViewRef.current.scrollTo({
            x: personaliserPos.x,
            y: personaliserPos.y - height / 2 + height / 1.3,
            animated: true
        });
        setClick(true);
        selectAutoCompete();
    }, []);

    const handleClassicPress = useCallback(() => {
        setPersonaliserPos({x: 0, y: classicPos.y + height / 20});
        scrollViewRef.current.scrollTo({
            x: personaliserPos.x,
            y: personaliserPos.y - height / 2 + height / 1.3,
            animated: true
        });
        setClick(true);
        selectAutoClassic();
    }, []);

    const handleBackPress = useCallback(() => {
        setScroll(false)
        setPersoCompet(false)
        setstandardPos({x: 0, y: initialPosition});
        setclassicPos({x: 0, y: initialPosition + height / 20});
        scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }, [])

    return (
        <View style={{flex: 1}}>

            {!scroll &&
                <TouchableOpacity style={styles.mainButton} onPress={handleStartPress}>
                    <Text style={styles.mainButtonText}>BATTLE</Text>
                </TouchableOpacity>}
            {scroll &&
                <TouchableOpacity style={{position: 'absolute', top: 10, left: 10, zIndex: 1}}
                                         onPress={handleBackPress}>
                <Text>BACK</Text>
            </TouchableOpacity>}
            {scroll &&
            <ScrollView scrollEnabled={false} ref={scrollViewRef}>
                <View style={{height: '100%', width, backgroundColor: '#f0f0f0', padding: 10}}>
                    <View style={{alignSelf: 'center', marginTop: initialPosition}}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => navigation.navigate("Game", {
                                wordTime: 4100,
                                gameTime : 60,
                                player1 : "player1",
                                player2 : "player2"
                            })}
                        >
                            <Text style={styles.buttonText}>STANDARD</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={handlePersonnaliserPress}
                        >
                            <Text style={styles.buttonText}>PERSONNALISER</Text>
                        </TouchableHighlight>
                        {persoCompet && <View style={{
                            alignSelf: 'center',
                            marginTop: height,
                            display: persoCompet ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={handleClassicPress}
                            >
                                <Text style={styles.buttonText}>CLASSIC</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={handleCompetPress}
                            >
                                <Text style={styles.buttonText}>COMPET</Text>
                            </TouchableHighlight>
                            <View style={{
                                alignSelf: 'center',
                                marginTop: height / 2,
                                display: 'flex',
                                height: height * 5
                            }}>
                                <Personnaliser selectAuto={click} timeBeforeWord={timeBeforeWord}
                                               selectedPassageProp={setSelectedPassageProp}
                                               selectedIdProp={setSelectedIdProp}/>
                            </View>
                        </View> }
                    </View>
                </View>
            </ScrollView>}
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
