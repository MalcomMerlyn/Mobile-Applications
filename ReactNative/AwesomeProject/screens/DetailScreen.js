import React from 'react';
import {Text, TextInput, TouchableOpacity, View, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {Game} from "../model/Game";

export class DetailScreen extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(

            <View style={styles.container}>
                <Text>Details</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,

    },
});