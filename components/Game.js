import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Alert, Button} from 'react-native';
import { Audio } from 'expo-av';
import {useNavigation} from "@react-navigation/native";

const Game = (navigation) => {
    const nav = useNavigation();

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const [EndGame, SetEndGame ] = useState(false)
    const [words, setWords] = useState(require('../assets/mots.json'));
    let random = Math.floor(Math.random() * words.length)
    const [currentWord, setCurrentWord] = useState(words[random]['Mot']);
    const [timeLeft, setTimeLeft] = useState(navigation.route.params.gameTime ? navigation.route.params.gameTime : 60);
    const [round, setRound] = useState(1);
    const [player, setPlayer] = useState(navigation.route.params.player1 ? navigation.route.params.player1 : "player1" );

    useEffect(() => {
        // Fetch words from JSON file
        const fetchWords = async () => {
            const response = require('../assets/mots.json');
            setWords(response);
        };
        fetchWords();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(interval);
                if (round === 2 || round === 3) {
                    if(round < 3){
                        setRound(round + 1);
                        setCurrentWord("");
                    }
                    if(round == 2){
                        SetEndGame(true);
                        Alert.alert('FIN', 'La partie est terminée');
                    }
                } else {
                    setRound(round + 1);
                    setTimeLeft(navigation.route.params.gameTime);
                    setPlayer(player === navigation.route.params.player1 ? navigation.route.params.player2 ? navigation.route.params.player2 : "player2"  : navigation.route.params.player1);
                }
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [words, timeLeft, round, navigation.route.params.gameTime, navigation.route.params.player1, navigation.route.params.player2]);

    useEffect(() => {
        // Display a new word every 2 seconds
        const interval = setInterval(() => {
            if (words.length > 0) {
                    if(round < 3) {
                        const randomIndex = Math.floor(Math.random() * words.length);
                        const randomWord = words[randomIndex]['Mot'];
                        setCurrentWord(randomWord);
                    }
            }
        }, navigation.route.params.wordTime);
        return () => clearInterval(interval);
    }, [words, round, navigation.route.params.wordTime]);

    // decrement the time left every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(interval);
            } else {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, round]);

    useEffect(() => {
        let music = new Audio.Sound();
        if(round <= 2) {
            console.log("Loading sound");
            music.loadAsync(require('../assets/music/music.mp3')).then(() => {
                console.log("Sound Loaded");
                if(isMounted.current) music.playAsync();
            });
        }
        return () => {
            music.stopAsync();
            music.unloadAsync();
        }
    }, [round,isMounted.current]);
    const handleRematch = () => {
        nav.goBack()
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>Il reste {timeLeft} secondes</Text>
            <Text style={styles.player}>{player}</Text>
            <View style={styles.wordContainer}>
                <Text style={styles.word}>{currentWord}</Text>
            </View>
            {EndGame && (<Button onPress={handleRematch} title="Rejouer"></Button>) }
        </View>
    );
}

export default Game;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 20,
        marginBottom: 20,
    },
    player: {
        fontSize: 20,
        marginBottom: 20,
    },
    wordContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    word: {
        fontSize: 36,
    },
});