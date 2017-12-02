import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from "react-navigation";
import {MainView} from "./views/MainView";
import {DetailView} from "./views/DetailView";

const SimpleStack = StackNavigator({
    Main: {
        screen: MainView
    },
    Details: {
        screen: DetailView,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.comic.title.toUpperCase()}`,
        }),
    },
});

export default class App extends React.Component {
  render() {
    return (
      <SimpleStack></SimpleStack>
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
