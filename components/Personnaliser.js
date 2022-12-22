import { View,Text, ScrollView,Button,TextInput, TouchableHighlight, FlatList  } from 'react-native';
import React from 'react';
import { useState } from 'react';

const tempsMot = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grapefruit', 'Huckleberry'];
const tempsPassage = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grapefruit', 'Huckleberry'];
const ListeTypeBatlle = ['SOLO','1 VS 1','2 VS 2','1 VS 1 VS 1'];

const Personnaliser = () => {

    return (
        <View>
            <View>
                <Text>Type BATTLE</Text>
            </View>
            <View>
                    <Text>Temps de passage</Text>
                    <ScrollView horizontal={true}>
                        {tempsPassage.map(item =>
                            <Button title={item} onPress={() => console.log(`Pressed ${item}`)} />
                        )}
                    </ScrollView>
            </View>
            <View>
                <Text>Temps avant le prochain mot</Text>
                <ScrollView horizontal={true}>
                    {tempsMot.map(item =>
                        <Button title={item} onPress={() => console.log(`Pressed ${item}`)} />
                    )}
                </ScrollView>
            </View>
        </View>
        );

};

export default Personnaliser;
