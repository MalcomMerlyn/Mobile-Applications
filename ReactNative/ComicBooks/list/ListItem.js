import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export class ListItem extends React.Component {
    constructor(props) {
        super(props);

        console.log("ListItem::constructor : this.props = ", this.props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(e) {
        console.log("ListItem::handlePress : this.props = ", this.props);
        this.props.clickedItem(this.props.comicKey, this.props.comic);
    }

    handleDelete() {
        this.props.clickedDelete(this.props.comicKey);
    }

    render() {
        if (!this.props.viewOnly) {
            return (
                <View style={styles.listItem}>
                    <TouchableOpacity
                        onPress={this.handlePress}
                        style={{backgroundColor: 'red'}}
                    >
                        <Text>Title: {this.props.comic.title}
                            Type: {this.props.comic.type} {"\n"}Description: {this.props.comic.description}
                        </Text>
                    </TouchableOpacity>

                    <Button
                        title='Delete'
                        onPress={this.handleDelete.bind(this)}
                    />
                </View>
            );
        }
        else {
            return (
                <View style={stylesP.listItem}>
                    <TouchableOpacity
                        onPress={this.handlePress}
                        style={{backgroundColor: 'red'}}
                    >
                        <Text>Title: {this.props.comic.title}
                            Type: {this.props.comic.type} {"\n"}Description: {this.props.comic.description}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
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

const stylesP = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //alignItems: 'center',
        backgroundColor: 'brown',
        height: 35,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
});
