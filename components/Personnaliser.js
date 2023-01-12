import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import React, { useEffect } from 'react';

const Personnaliser = (props) => {
    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedPassage, setSelectedPassage] = React.useState(null);

    useEffect(() => {
        if(props.selectFig) {
            const fig = props.tempsPassage.find(item => item.name === '4');
            props.setSelectedPassageProp(fig);
            props.setSelectedIdProp(fig.id);
            handlePassagePress(fig)
        }
    }, [props.selectFig])

    const handlePassagePress = item => {
        setSelectedPassage(item);
        setSelectedId(item.id);
        props.setSelectedPassageProp(item);
        props.setSelectedIdProp(item.id);
    };

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? 'yellow' : '#fff';
        return (
            <TouchableHighlight underlayColor='yellow' onPress={() => handlePassagePress(item)}>
                <Text style={{backgroundColor, padding: 10}}>
                    {item.name}
                </Text>
            </TouchableHighlight>
        );
    };

    return (
        <View>
            <View style={{marginVertical: 20}}>
                <Text>Temps de passage</Text>
                <FlatList
                    horizontal={true}
                    data={props.tempsPassage}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
};

export default Personnaliser;
