import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Alert, Button, Dimensions, TouchableHighlight} from 'react-native';
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
    const [initTime, setInitTime] = useState(3);

    useEffect(() => {
        if (initTime > 0) {
            const timer = setInterval(() => {
                setInitTime(initTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [initTime]);

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
            if (initTime > 0) {
                setInitTime(initTime - 1);
                if(navigation.route.params.gameTime)
                    setTimeLeft(navigation.route.params.gameTime)
                else
                    setTimeLeft(60)
            }
            if (initTime === 0 && timeLeft === 0) {
                clearInterval(interval);
                if (round === 2 || round === 3) {
                    if(round < 3){
                        setRound(round + 1);
                        setInitTime(3)
                        setCurrentWord("");
                    }
                    if(round === 2){
                        SetEndGame(true);
                        Alert.alert('FIN', 'La partie est terminée');
                    }
                } else {
                    setRound(round + 1);
                    setTimeLeft(navigation.route.params.gameTime);
                    setInitTime(3); // set initTime to 3 for the next round
                    setPlayer(player === navigation.route.params.player1 ? navigation.route.params.player2 ? navigation.route.params.player2 : "player2"  : navigation.route.params.player1);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [initTime, words, timeLeft, round, navigation.route.params.gameTime, navigation.route.params.player1, navigation.route.params.player2]);

    useEffect(() => {
        // Display a new word every 2 seconds
        const interval = setInterval(() => {
            if (words.length > 0) {
                if(round < 3 && initTime === 0) {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const randomWord = words[randomIndex]['Mot'];
                    setCurrentWord(randomWord);
                }
            }
        }, navigation.route.params.wordTime);
        return () => clearInterval(interval);
    }, [initTime ,words, round, navigation.route.params.wordTime]);

    // decrement the time left every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(interval);
            } else {
                if(initTime === 0)
                    setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [initTime, timeLeft, round]);

    useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            playsInSilentModeIOS: true,
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
            {EndGame ? (

                    <TouchableHighlight onPress={handleRematch}  style={styles.rematchButtonContainer}>
                        <Text style={styles.rematchButton}>REJOUER</Text>
                    </TouchableHighlight>

            ) : (
                <>
                    {initTime > 0 ? (
                        <Text style={styles.timer}>{initTime}</Text>
                    ) : (
                        <>
                            <View style={styles.playerContainer}>
                                <Text style={styles.player}>{player}</Text>
                            </View>
                            <View style={styles.timerContainer}>
                                <Text style={styles.timer}>{timeLeft}</Text>
                            </View>
                            <View style={styles.wordContainer}>
                                <Text style={styles.word}>{currentWord}</Text>
                            </View>
                        </>
                    )}
                </>
            )}
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
    timerContainer: {
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    timer: {
        color: 'white',
        fontSize: 50,
        marginTop: height / 12,
        marginBottom: 30,
    },
    playerContainer: {
        alignItems: 'center',
        marginTop: height / 4,
        justifyContent: 'center',
    },
    player: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
    wordContainer: {
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
        borderWidth: 3,  // Ajoute une bordure d'épaisseur 1
        borderColor: 'white',  // Couleur de la bordure
        borderRadius: 25,  // Rayon des coins du rectangle
        paddingHorizontal: 25,  // Espacement horizontal à l'intérieur du conteneur
        paddingVertical: 15,  // Espacement vertical à l'intérieur du conteneur
    },
    word: {
        color: 'white',
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
    },
    rematchButton: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    rematchButtonContainer: {
        position: 'absolute',
        marginTop: height / 2,
        shadowColor: 'rgba(75,15,77, .4)', // IOS
        shadowOffset: {height: 10, width: 10}, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 1, //Android (don't work)
        width: width / 1.2,
        backgroundColor: 'yellow',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
    }
});
