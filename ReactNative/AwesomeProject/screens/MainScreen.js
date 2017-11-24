import React from 'react';
import {View} from 'react-native';
import {StyleSheet, StatusBar} from 'react-native';
import {GameForm} from "../model/GameForm";
import {List} from "../list/List";

export class MainScreen extends React.Component
{
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props)
    {
        super(props);
    }


    render()
    {

        return(

            <View style={styles.container}>

                <View style={{flex: 1}}>
                    <GameForm></GameForm>
                </View>


                <View style={{flex: 1}}>
                    <List navigator={this.props.navigation.navigate}/>
                </View>


            </View>
        );
    }
}

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