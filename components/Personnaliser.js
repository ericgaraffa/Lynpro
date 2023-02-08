import {View, Text, FlatList, TouchableHighlight, Dimensions, ScrollView, StyleSheet, TextInput} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Game from './Game';

const timeBeforeWord = [
    {id: 1, name: '2'},
    {id: 2, name: '4'},
    {id: 3, name: '6'}
];

const gameTimes = [
    {id: 4, name: '10'},
    {id: 5, name: '60'},
    {id: 6, name: '90'}
];

const Personnaliser = (props) => {
    const navigation = useNavigation();

    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedIdGameTime, setSelectedIdGameTime] = React.useState(5);
    const [beforeWord, setBeforeWord] = React.useState(4);
    const [gameTime, setGameTime] = React.useState(60);
    const scrollViewRef = useRef(props.scrollViewRef);
    const [player1, setPlayer1] = useState('Player1');
    const [player2, setPlayer2] = useState('Player2');

    useEffect(() => {
        if (props.selectAuto) {
            const Auto = props.timeBeforeWord.find(item => item.name === '4');
            props.selectedPassageProp(Auto);
            props.selectedIdProp(Auto.id);
            handleBeforeWordPress(Auto)
        }
    }, [props.selectAuto])

    const handleStartPress = () => {
        navigation.navigate("Game", {
           wordTime: beforeWord,
            gameTime : gameTime,
            player1 : player1,
            player2 : player2
        })
    };

    const handleBeforeWordPress = beforeWord => {
        setBeforeWord(beforeWord.name * 1000 + 100 ? beforeWord.name * 1000 + 100 : 2);
        setSelectedId(beforeWord.id);
        props.selectedPassageProp(beforeWord);
        props.selectedIdProp(beforeWord.id);
    };
    const handleGameTimePress = gameTime => {
        setGameTime(gameTime.name);
        setSelectedIdGameTime(gameTime.id ? gameTime.id : "5")
    };

    const renderBeforeWord = ({item}) => {
        const backgroundColor = item.id === selectedId ? 'yellow' : '#fff';
        return (
            <TouchableHighlight underlayColor='yellow' onPress={() => handleBeforeWordPress(item)}>
                <Text style={{backgroundColor, padding: 10}}>
                    {item.name}
                </Text>
            </TouchableHighlight>
        );
    };
    const renderGameTime = ({item}) => {
        const backgroundColor = item.id === selectedIdGameTime ? 'yellow' : '#fff';
        return (
            <TouchableHighlight underlayColor='yellow' onPress={() => handleGameTimePress(item)}>
                <Text style={{backgroundColor, padding: 10}}>
                    {item.name}
                </Text>
            </TouchableHighlight>
        );
    };

    return (
        <View>
            <View style={{marginVertical: 20}}>
                <Text>Temps avant le prochain mot</Text>
                <FlatList
                    horizontal={true}
                    data={props.timeBeforeWord}
                    renderItem={renderBeforeWord}
                    keyExtractor={beforeWord => beforeWord.id}
                />
            </View>
            <View style={{marginVertical: 20}}>
                <Text>Temps de passage</Text>
                <FlatList
                    horizontal={true}
                    data={gameTimes}
                    renderItem={renderGameTime}
                    keyExtractor={TimePlayed => TimePlayed.id}
                />
            </View>
            <View style={{marginVertical: 20}}>
                <Text>Définir le nom des équipes :</Text>
                <TextInput
                    style={{ height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10}}
                    onChangeText={(text) => setPlayer1(text)}
                    value={player1}
                />
                <TextInput
                    style={{ height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10}}
                    onChangeText={(text) => setPlayer2(text)}
                    value={player2}
                />
            </View>
            <View>
                <ScrollView ref={scrollViewRef}>
                    <TouchableHighlight onPress={handleStartPress}>
                        <Text>START</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        </View>
    );
};


export default Personnaliser;