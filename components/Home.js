import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity,  Dimensions } from 'react-native';
import Personnaliser from './Personnaliser';

const { height, width } = Dimensions.get('window');
const buttonHeight = 50;

const MyComponent = () => {

    const tempsPassage = [
        { id: 1, name: '2' },
        { id: 2, name: '4' },
        { id: 3, name: '6' }
    ];

    const [scroll, setScroll] = useState(false);
    const [classicCompet, setClassicCompet] = useState(false);
    const [clickClassic, setClickClassic] = useState(false);
    const [ button1Pos, setButton1Pos] = useState({x: 0, y:height/1.5});
    const [ button2Pos, setButton2Pos] = useState({x: 0, y:height + buttonHeight });
    const [ button3Pos, setButton3Pos] = useState({x: 0, y:height + buttonHeight });
    const [personaliserPos, setPersonaliserPos] = useState({x: 0, y:height + buttonHeight });
    const scrollViewRef = useRef(null);
    const initialPosition = height/2;
    const [SelectedPassageProp, setSelectedPassageProp] = useState(null);
    const [SelectedIdProp, setSelectedIdProp] = useState(null);

    useEffect(()=> {
        setButton1Pos({x: 0, y:initialPosition});
        setButton2Pos({x: 0, y:initialPosition + buttonHeight });
    },[])

    const selectFig = () => {
        const fig = tempsPassage.find(item => item.name === '4');
        setSelectedPassageProp(fig);
        setSelectedIdProp(fig.id);
    };

    const handleButtonPress = useCallback(() => {
        setScroll(true);
        scrollViewRef.current.scrollTo({ x: 0, y: height/2 - initialPosition, animated: true });
    }, []);

    const handleButton1Press = useCallback(() => {
        setClassicCompet(true);
        scrollViewRef.current.scrollTo({ x: button1Pos.x, y: button1Pos.y, animated: true });
    }, []);

    const handleButton2Press = useCallback(() => {
        scrollViewRef.current.scrollTo({ x: button2Pos.x, y: button2Pos.y, animated: true });
    }, []);

    const handleButton3Press = useCallback(() => {
        scrollViewRef.current.scrollTo({ x: button3Pos.x, y: button3Pos.y, animated: true });
    }, []);

    const handleClassicPress = useCallback(() => {
        setPersonaliserPos({x: 0, y: button2Pos.y + buttonHeight });
        scrollViewRef.current.scrollTo({ x: personaliserPos.x, y: personaliserPos.y - height / 2 + height /1.3, animated: true });
        setClickClassic(true);
        selectFig();
    }, []);

    const handleBackPress = useCallback(() => {
        setScroll(false)
        setClassicCompet(false)
        setButton1Pos({x: 0, y:initialPosition});
        setButton2Pos({x: 0, y:initialPosition + buttonHeight });
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }, [])

    return (
        <View style={{ flex: 1 }}>
            { !scroll && <TouchableOpacity style={{ alignSelf: 'center', marginTop: height / 2.5 }} onPress={handleButtonPress}>
                <Text>BATTLE</Text>
            </TouchableOpacity>}
            <ScrollView ref={scrollViewRef}>
                <View style={{ height: '100%', width, backgroundColor: '#f0f0f0', padding: 10 }}>
                    <View style={{ alignSelf: 'center', marginTop: initialPosition }}>
                        <Button title="STANDARD" onPress={handleButton1Press} />
                        <Button title="PERSONNALISER" onPress={handleButton2Press} />
                        <View style={{ alignSelf: 'center', marginTop: height/2.5 , display: classicCompet ? 'flex': 'none', alignItems: 'center'}}>
                            <Button title="CLASSIC" onPress={handleClassicPress} />
                            <Button title="COMPET" onPress={handleButton3Press} />
                            <View style={{ alignSelf: 'center', marginTop: height/2, display: 'flex', height:height*5}}>
                                <Personnaliser selectFig={setClickClassic} tempsPassage={tempsPassage} setSelectedPassageProp={setSelectedPassageProp} setSelectedIdProp={setSelectedIdProp}  />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

export default MyComponent;

