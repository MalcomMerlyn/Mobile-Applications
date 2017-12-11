import React from "react";
import {AsyncStorage, Button, FlatList, ListView, StyleSheet, Text, TextInput, View} from 'react-native';
import {ListItem} from "./ListItem";
import {ComicBook} from "../model/ComicBook";

export class List extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);
        this.handleChangedObject = this.handleChangedObject.bind(this);

        //this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        //console.log("List::constructor : this.props = ", this.props);

        //this.state = {listOfComicBooks: [
        //    {key: 0, comic: {title: 'Batman', description: 'First issue appeared in the spring of 1940'}},
        //    {key: 1, comic: {title: 'Superman', description: 'First issue appeared in the summer of 1939'}},
        //]};

        this.state = {listOfComicBooks: []}
    }

    componentDidMount()
    {
        this.updateList();
    }

    async updateList()
    {
        try
        {
            let response = await AsyncStorage.getItem("listOfComicBooks");
            let listOfComicBooks = await JSON.parse(response) || [];

            console.log("List::handleAddComicBook : listOfComicBooks = ", listOfComicBooks);

            this.setState({listOfComicBooks});
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async handleAddComicBook(comic)
    {
        console.log("List::handleAddComicBook : comic = ", comic);

        let max = 0;

        for (let item of this.state.listOfComicBooks)
        {
            if (item.key > max)
            {
                max = item.key;
            }
        }

        let indexedComicBook = { key: max + 1, comic: comic };
        let listOfComicBooks = [...this.state.listOfComicBooks, indexedComicBook];

        console.log("List::handleAddComicBook : listOfComicBooks = ", listOfComicBooks);

        await AsyncStorage.setItem("listOfComicBooks", JSON.stringify(listOfComicBooks));

        this.setState({listOfComicBooks});
    }

    async handleClickedDelete(index)
    {
        let listOfComicBooks = this.state.listOfComicBooks;

        listOfComicBooks.splice(index, 1);

        await AsyncStorage.setItem("listOfComicBooks", JSON.stringify(listOfComicBooks));

        this.setState({listOfComicBooks});
    }

    handleClickedItem(index)
    {
        console.log("List::handleClickedItem : index = ", index);

        let comic = this.state.listOfComicBooks[index].comic;

        console.log("List::handleClickedItem : comic = ", comic);

        this.props.navigator('Details', {index: index, comic: comic, updateComicBook: this.handleChangedObject, list: this.state.listOfComicBooks});
    }

    async handleChangedObject(index, newObject)
    {
        let listOfComicBooks = this.state.listOfComicBooks;
        listOfComicBooks[index].comic = newObject.comic;

        await AsyncStorage.setItem("listOfComicBooks", JSON.stringify(listOfComicBooks));

        this.setState({listOfComicBooks});
    }

    render()
    {
        //console.log("List::render : this.state.array = ", this.state.array);

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <ComicBook addComicBook={this.handleAddComicBook.bind(this)}/>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.listOfComicBooks}
                        extraData={this.state}
                        renderItem={ ({item, index}) =>
                            <ListItem
                                comicKey={index}
                                comic={item.comic}
                                clickedItem={this.handleClickedItem}
                                clickedDelete={this.handleClickedDelete.bind(this)}
                            /> }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});
