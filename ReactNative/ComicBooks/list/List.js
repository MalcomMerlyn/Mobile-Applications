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

        console.log("List::constructor : this.props = ", this.props);

        this.state = {array: [
            {key: 0, comic: {title: 'Batman', description: 'First issue appeared in the spring of 1940'}},
            {key: 1, comic: {title: 'Superman', description: 'First issue appeared in the summer of 1939'}},
        ]};
    }

    handleClickedItem(index)
    {
        console.log("List::handleClickedItem : index = ", index);
        let comic = this.state.array[index].comic;
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
        console.log("List::render : this.state.array = ", this.state.array);
        return (
            <FlatList
                data={this.state.array}
                extraData={this.state}
                renderItem={ ({item}) => <ListItem comicKey={item.key} comic={item.comic} clickedItem={this.handleClickedItem}/> }
            />
        );
    }
}