import React from "react";
import {View, StyleSheet, StatusBar} from "react-native";
import {ComicBook} from "../model/ComicBook";
import {List} from "../list/List";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight

    },
});

export class MainView extends React.Component
{
    static navigationOptions = {
        title: 'Comic Book Sharing'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <ComicBook/>
                </View>
                <View style={{flex: 1}}>
                    <List navigator={this.props.navigation.navigate}/>
                </View>
            </View>
        );
    }
}