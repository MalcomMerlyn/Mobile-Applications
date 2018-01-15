import React from 'react';
import firebase from 'firebase';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {StackNavigator} from "react-navigation";
import {MainView} from "./views/MainView";
import {DetailView} from "./views/DetailView";
import {LoginView} from "./views/LoginView";

const SimpleStack = StackNavigator({
    Login: {
        screen: LoginView
    },
    Main: {
        screen: MainView
    },
    Details: {
        screen: DetailView,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.comic.title.toUpperCase()}`,
        }),
    },
});

export default class App extends React.Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyAmQAzRqj61q4rWjtnyasMrmH1BQgyI3k8",
            authDomain: "comicbooks-fbbe7.firebaseapp.com",
            databaseURL: "https://comicbooks-fbbe7.firebaseio.com",
            projectId: "comicbooks-fbbe7",
            storageBucket: "comicbooks-fbbe7.appspot.com",
            messagingSenderId: "576776668838"
        };

        firebase.initializeApp(config);
    }

    render() {
        return (
            <SimpleStack style={{paddingTop: StatusBar.currentHeight}}></SimpleStack>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
