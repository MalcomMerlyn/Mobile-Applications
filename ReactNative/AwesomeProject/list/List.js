import React from 'react';
import {Button, FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Game} from "../model/Game";
import {ListItem} from "./ListItem";

export class List extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);

        this.state = {array: [
                        {key: 'g1', game: <Game name='hoi4' releaseYear='2016' producer='paradox'/>},
                        {key: 'g2', game: <Game name='eu4' releaseYear='2015' producer='paradox'/>},
                        {key: 'g3', game: <Game name='AC - Origins' releaseYear='2017' producer='Ubisoft'/>},
                        {key: 'g4', game: <Game name='Fifa17' releaseYear='2016' producer='EA Sports'/>}
                        ]};

    }

    handleClickedItem(index)
    {
        console.log("in list!   -   " + this.state.array[index].game.releaseYear);

        this.props.navigator('Details');
    }


    render()
    {
        //should be in state probably
        // let arr = [];
        // arr.push({key: 'g1', game: <Game name='hoi4' releaseYear='2016' producer='paradox'/>});
        // arr.push({key: 'g2', game: <Game name='eu4' releaseYear='2015' producer='paradox'/>});
        // arr.push({key: 'g3', game: <Game name='AC - Origins' releaseYear='2017' producer='Ubisoft'/>});
        // arr.push({key: 'g4', game: <Game name='Fifa17' releaseYear='2016' producer='EA Sports'/>});

        return(
            <FlatList
                data={this.state.array}
                renderItem={({item, index}) => <ListItem gameKey={index} game={item.game} clickedItem={this.handleClickedItem}/>}
            />
        );
    }
}
