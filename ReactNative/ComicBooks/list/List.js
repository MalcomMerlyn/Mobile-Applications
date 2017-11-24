import React from "react";
import {Button, FlatList, ListView, Text, TextInput, View} from 'react-native';
import {ListItem} from "./ListItem";

export class List extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);
        this.handleChangedObject = this.handleChangedObject.bind(this);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {array: [
            {key: 0, comic: {title: 'Aaa', description: 'Aaa'}}
        ]};
    }

    handleClickedItem(index)
    {
        console.log(index);
        let comic = this.state.array[index].comic;
        console.log(comic);
        this.props.navigator('Details', {index: index, comic: comic, updateComicBook: this.handleChangedObject});
    }

    handleChangedObject(index, newObject)
    {
        let newArray = this.state.array;
        newArray[index].comic = newObject.comic;

        this.setState({array: newArray});
    }

    render()
    {
        return (
            <FlatList
                data={this.state.array}
                extraData={this.state}
                renderItem={ item => <ListItem comicKey={item.key} comic={item.comic} clickedItem={this.handleClickedItem}/> }
            />
        );
    }
}