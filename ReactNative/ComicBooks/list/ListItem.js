import React from "react";
import {Text, TouchableOpacity} from "react-native";

export class ListItem extends React.Component {
    constructor(props)
    {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(e)
    {
        this.props.clickedItem(this.props.comicKey);
    }

    render()
    {
        return (
            <TouchableOpacity
                onPress={this.handlePress}
                style={{backgroundColor: 'red'}}
            >
                <Text>Title: {this.props.title}, Description: {this.props.description}</Text>
            </TouchableOpacity>
        );
    }
}