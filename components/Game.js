import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Alert, Button, Dimensions} from 'react-native';
import { Audio } from 'expo-av';
import {useNavigation} from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
let musicFiles = {
    'Ambicion': require('../assets/music/Ambicion.mp3'),
    'Caution': require('../assets/music/Caution.mp3'),
    'De_Locos': require('../assets/music/De_Locos.mp3'),
    'Guadalquivir': require('../assets/music/Guadalquivir.mp3'),
    'Leyendas_Urbanas': require('../assets/music/Leyendas_Urbanas.mp3'),
    'Mezcal': require('../assets/music/Mezcal.mp3'),
    'Mutantes': require('../assets/music/Mutantes.mp3'),
    'Narcos': require('../assets/music/Narcos.mp3'),
    'No_molestes': require('../assets/music/No_molestes.mp3'),
    'Oliver_y_Benji': require('../assets/music/Oliver_y_Benji.mp3'),
    'Quavo': require('../assets/music/Quavo.mp3'),
    'San_Telmo': require('../assets/music/San_Telmo.mp3'),
    'Shoote': require('../assets/music/Shoote.mp3'),
    'Soneto': require('../assets/music/Soneto.mp3'),
    'Todopoderoso': require('../assets/music/Todopoderoso.mp3'),
    'Un_dolar': require('../assets/music/Un_dolar.mp3'),
    'Un_euro_primo': require('../assets/music/Un_euro_primo.mp3'),
    'Undertaker': require('../assets/music/Undertaker.mp3'),
    'Valhalla': require('../assets/music/Valhalla.mp3'),
    'Warzone': require('../assets/music/Warzone.mp3'),
};
const {height, width} = Dimensions.get('window');

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
    const [songKey, setSongKey] = useState(null);

    useEffect(() => {
        if (!songKey) {
            let keys = Object.keys(musicFiles);
            let randomKey = keys[ keys.length * Math.random() << 0];
            setSongKey(randomKey);
        }
    }, [songKey]);

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
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
        });
    }, []);

    useEffect(() => {
        let music = new Audio.Sound();
        let isLoaded = false;

        if(round <= 2 && songKey) {
            let musicFile = musicFiles[songKey];
            music.loadAsync(musicFile, { shouldPlay: true }).then(() => {
                console.log("Sound Loaded");
                isLoaded = true;
                if(isMounted.current) music.playAsync();
            });
        }
        return () => {
            if (isLoaded) {
                music.stopAsync();
                music.unloadAsync();
            }
        }
    }, [round, isMounted.current, songKey, musicFiles]);

    const handleRematch = () => {
        nav.goBack()
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(63,15,64,0.9)', 'transparent']}
                style={styles.background}
            />
            <Text style={styles.timer}>{timeLeft}</Text>
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
        backgroundColor: "#0c030c",
        alignItems: 'center',

    },
    timer: {
        color: 'white',
        fontSize: 50,
        marginTop: height / 12,
        marginBottom: 30,
    },
    player: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
    wordContainer: {
        alignItems: 'center',
        marginTop: height / 4,
        justifyContent: 'center',
    },
    word: {
        color: 'yellow',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        textTransform: 'uppercase'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900,
    }
});