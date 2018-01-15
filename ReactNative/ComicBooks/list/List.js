import React from "react";
import firebase from "firebase";
import {AsyncStorage, Button, FlatList, ListView, StyleSheet, Text, TextInput, View} from 'react-native';
import {ListItem} from "./ListItem";
import {ComicBook} from "../model/ComicBook";
import {Spinner} from "../utils/Spinner";

export class List extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);
        this.handleChangedObject = this.handleChangedObject.bind(this);

        console.log("List::constructor : this.props = ", this.props);

        this.currentUser = firebase.auth().currentUser.uid;
        this.viewOnly = true;

        this.state = {listOfComicBooks: [], loading: true, viewOnly: this.viewOnly};
    }

    componentWillMount() {
        firebase.database().ref(`/users/${this.currentUser}/viewOnly`)
            .on('value', (snapshot) => {
                this.viewOnly = JSON.stringify(snapshot) == "true" ? true : false;
                this.setState({loading: false});
            });
    }

    componentDidMount() {
        this.updateList();
    }

    async updateList() {
        firebase.database().ref(`/users/${this.currentUser}/topics`).on('value', snapshot => {
            let listOfComicBooks = [];
            snapshot.forEach((child) => {
                listOfComicBooks.push({
                    key: child.key,
                    comic: child.val()
                });
            });
            this.setState({listOfComicBooks});

            console.log("Firebase update : listOfComicBooks = ", this.listOfComicBooks);
        });
    }

    async handleAddComicBook(comic) {
        console.log("List::handleAddComicBook : comic = ", comic);

        await firebase.database().ref(`/users/${this.currentUser}`).child("topics").push(comic);

        console.log("List::handleAddComicBook : listOfComicBooks = ", this.listOfComicBooks);
    }

    async handleClickedDelete(key) {
        await firebase.database().ref(`/users/${this.currentUser}/topics/${key}`).remove();
    }

    async handleChangedObject(key, newObject) {
        await firebase.database().ref(`/users/${this.currentUser}/topics/${key}`).set(newObject);
    }

    handleClickedItem(key, comic) {
        console.log("List::handleClickedItem : key = ", key);
        console.log("List::handleClickedItem : comic = ", comic);

        this.props.navigator(
            'Details', {
                comicKey: key,
                comic: comic,
                viewOnly: this.viewOnly,
                updateComicBook: this.handleChangedObject,
                list: this.state.listOfComicBooks
            });
    }

    render() {
        if (this.state.loading) {
            return (<Spinner size={'large'}/>);
        }

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <ComicBook
                        addComicBook={this.handleAddComicBook.bind(this)}
                        viewOnly={this.viewOnly}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button
                        title='Logout'
                        onPress={firebase.auth().signOut()}
                    />
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.listOfComicBooks}
                        extraData={this.state}
                        renderItem={({item}) =>
                            <ListItem
                                comicKey={item.key}
                                comic={item.comic}
                                viewOnly={this.viewOnly}
                                clickedItem={this.handleClickedItem}
                                clickedDelete={this.handleClickedDelete.bind(this)}
                            />
                        }
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
