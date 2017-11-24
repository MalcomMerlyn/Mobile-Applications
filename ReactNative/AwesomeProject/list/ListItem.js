import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Game} from "../model/Game";

export class ListItem extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(e)
    {
        //console.log(e.currentTarget);
        this.props.clickedItem(this.props.gameKey);
    }

    render()
    {
        return(

            <TouchableOpacity
                onPress={this.handlePress}
                style={{backgroundColor: 'darkgoldenrod'}}
            >
                <View>{this.props.game}</View>
            </TouchableOpacity>
        );
    }
}
