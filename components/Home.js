import React, {useRef, useState, useCallback, useEffect} from 'react';
import {View, ScrollView, Text, Button, TouchableOpacity, Dimensions} from 'react-native';
import Personnaliser from './Personnaliser';
import {useNavigation} from "@react-navigation/native";

const {height, width} = Dimensions.get('window');
const buttonHeight = 50;
//commit
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
    const [standardPos, setstandardPos] = useState({x: 0, y: height / 1.5});
    const [classicPos, setclassicPos] = useState({x: 0, y: height + buttonHeight});
    const [personaliserPos, setPersonaliserPos] = useState({x: 0, y: height + buttonHeight});
    const scrollViewRef = useRef(null);
    const initialPosition = height / 2;
    const [SelectedPassageProp, setSelectedPassageProp] = useState(null);
    const [SelectedIdProp, setSelectedIdProp] = useState(null);

    useEffect(() => {
        setstandardPos({x: 0, y: initialPosition});
        setclassicPos({x: 0, y: initialPosition + buttonHeight});
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

    const handleStandardPress = useCallback(() => {
        setPersoCompet(true);
        scrollViewRef.current.scrollTo({x: standardPos.x, y: standardPos.y, animated: true});
    }, []);

    const handlePersonnaliserPress = useCallback(() => {
        setPersoCompet(true);
        scrollViewRef.current.scrollTo({x: classicPos.x, y: classicPos.y, animated: true});
    }, []);

    const handleCompetPress = useCallback(() => {
        setPersonaliserPos({x: 0, y: classicPos.y + buttonHeight});
        scrollViewRef.current.scrollTo({
            x: personaliserPos.x,
            y: personaliserPos.y - height / 2 + height / 1.3,
            animated: true
        });
        setClick(true);
        selectAutoCompete();
    }, []);

    const handleClassicPress = useCallback(() => {
        setPersonaliserPos({x: 0, y: classicPos.y + buttonHeight});
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
        setclassicPos({x: 0, y: initialPosition + buttonHeight});
        scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }, [])

    return (
        <View style={{flex: 1}}>

            {!scroll &&
                <TouchableOpacity style={{alignSelf: 'center', marginTop: height / 2.5}} onPress={handleStartPress}>
                    <Text>BATTLE</Text>
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
                        <Button title="STANDARD" onPress={() => navigation.navigate("Game", {
                            wordTime: 4100,
                            gameTime : 60,
                            player1 : "player1",
                            player2 : "player2"
                        })}/>
                        <Button title="PERSONNALISER" onPress={handleStandardPress}/>
                        {persoCompet && <View style={{
                            alignSelf: 'center',
                            marginTop: height / 2.5,
                            display: persoCompet ? 'flex' : 'none',
                            alignItems: 'center'
                        }}>
                            <Button title="CLASSIC" onPress={handleClassicPress}/>
                            <Button title="COMPET" onPress={handleCompetPress}/>
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