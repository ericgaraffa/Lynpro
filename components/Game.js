import * as React from 'react';
import {Text, View, StyleSheet, Image, FlatList, SafeAreaView} from 'react-native';
import supabase from "../config/DatabaseConnection";
import 'react-native-url-polyfill/auto';
import {useEffect, useState} from "react";

//const [word, setWord] = useState(null)
export default function Game() {

    const [wordName, setWordName] = useState(null)

    async function fetchWords() {
        const {data, error} = await supabase
            .from('word')
            .select()
        if (error) {
            console.log(error)
        }
        if (data) {
            setWordName(data)
        }
    }

    async function getImage() {
        const {data, error} = await supabase
            .storage
            .from('media')
            .list()
        if (data) {
            console.log(data)
        }
        if (error) {
            console.log(error)
        }
    }

    const renderItem = ({item}) => {
        return (
            <Text>{item.name}</Text>
        );
    };

    useEffect(() => {
        fetchWords()
    }, [])
    //console.log(Word = {wordName})
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <SafeAreaView>
                <FlatList
                    data={wordName}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </View>
    );
}