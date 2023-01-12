import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import { Audio } from 'expo-av';

export default function Words() {
    const [words, setWords] = useState(require('../assets/mot.json'));
    let random = Math.floor(Math.random() * words.length)
    const [currentWord, setCurrentWord] = useState(words[random]['mot']);
    const [timeLeft, setTimeLeft] = useState(10);
    const [round, setRound] = useState(1);
    const [player, setPlayer] = useState('Player 1');

    useEffect(() => {
        // Fetch words from JSON file
        const fetchWords = async () => {
            const response = require('../assets/mot.json');
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
                    if(round == 2)
                        Alert.alert('FIN', 'La partie est terminée');
                } else {
                    setRound(round + 1);
                    setTimeLeft(10);
                    setPlayer(player === 'Player 1' ? 'Player 2' : 'Player 1');
                }
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [words, timeLeft, round]);

    useEffect(() => {
        // Display a new word every 2 seconds
        const interval = setInterval(() => {
            if (words.length > 0) {
                    if(round < 3) {
                        const randomIndex = Math.floor(Math.random() * words.length);
                        const randomWord = words[randomIndex]['mot'];
                        setCurrentWord(randomWord);
                    }
            }
        }, 2050);
        return () => clearInterval(interval);
    }, [words, round]);

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
                music.playAsync();
            });
        }
        return () => {
            music.stopAsync();
            music.unloadAsync();
        }
    }, [round]);


    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{timeLeft} seconds left</Text>
            <Text style={styles.player}>{player}</Text>
            <View style={styles.wordContainer}>
                <Text style={styles.word}>{currentWord}</Text>
            </View>
        </View>
    );
}

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