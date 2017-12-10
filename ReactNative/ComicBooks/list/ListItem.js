import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export class ListItem extends React.Component {
    constructor(props)
    {
        super(props);

        console.log("ListItem::constructor : this.props = ", this.props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(e)
    {
        this.props.clickedItem(this.props.comicKey);
    }

    handleDelete()
    {
        this.props.clickedDelete(this.props.comicKey);
    }

    render()
    {
        return (
            <View style={styles.listItem}>
                <TouchableOpacity
                    onPress={this.handlePress}
                    style={{backgroundColor: 'red'}}
                >
                    <Text>Title: {this.props.comic.title} Type: {this.props.comic.type} {"\n"}Description: {this.props.comic.description}</Text>
                </TouchableOpacity>

                <Button
                    title='Delete'
                    onPress={this.handleDelete.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //alignItems: 'center',
        backgroundColor: 'darkgoldenrod',
        height: 70,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
});
