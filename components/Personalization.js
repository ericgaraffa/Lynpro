import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableHighlight, FlatList, TextInput, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';


const {height, width} = Dimensions.get('window');
const HelloWorld = (nav) => {
    const navi = useNavigation();

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

    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedIdGameTime, setSelectedIdGameTime] = React.useState(5);
    const [beforeWord, setBeforeWord] = React.useState(4);
    const [gameTime, setGameTime] = React.useState(60);
    const [player1, setPlayer1] = useState('Player1');
    const [player2, setPlayer2] = useState('Player2');

    const handleStartPress = () => {
        navi.navigate("     ", {
            wordTime: beforeWord,
            gameTime: gameTime,
            player1: player1,
            player2: player2
        })
    };

    const handleBeforeWordPress = beforeWord => {
        setBeforeWord(beforeWord.name * 1000 + 100 ? beforeWord.name * 1000 + 100 : 2);
        setSelectedId(beforeWord.id);
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
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(63,15,64,0.9)', 'transparent']}
                style={styles.background}
            />
            <View style={{marginVertical: 20}}>
                <Text>Temps avant le prochain mot</Text>
                <FlatList
                    horizontal={true}
                    data={timeBeforeWord}
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
                    style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10
                    }}
                    onChangeText={(text) => setPlayer1(text)}
                    value={player1}
                />
                <TextInput
                    style={{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10
                    }}
                    onChangeText={(text) => setPlayer2(text)}
                    value={player2}
                />
            </View>
            <View>
                <TouchableHighlight onPress={handleStartPress}>
                    <Text>START</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default HelloWorld;


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderRadius: 25,
        marginBottom: 50,
        padding: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "#0c030c",
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
