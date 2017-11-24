import React from 'react';
import {MainScreen} from "./screens/MainScreen";
import {DetailScreen} from "./screens/DetailScreen";
import {StackNavigator} from "react-navigation";

export default class App extends React.Component {
    render() {

        return (

            <SimpleStack></SimpleStack>
        );
    }
}

const SimpleStack = StackNavigator({
    Main: {
        screen: MainScreen
    },
    Details: {
        screen: DetailScreen
    },
});


