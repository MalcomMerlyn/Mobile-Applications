import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class Game extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View>
                <Text>Name: {this.props.name}, Release year: {this.props.releaseYear}, Producer: {this.props.producer}</Text>
            </View>
        );
    }
}
