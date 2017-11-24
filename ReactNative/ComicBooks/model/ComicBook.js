import React from "react";
import {Button, Linking, Text, TextInput, View} from "react-native";

export class ComicBook extends React.Component
{
    constructor(props) {
        super(props);
        this.handleTitleChanged = this.handleTitleChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { titleText: 'a', descriptionText: 'a'}
    }
    handleTitleChanged(title) {
        this.setState({titleText: title});
    }

    handleSubmit()
    {
        let body = `Added a topic with title: ${this.state.titleText}, description: ${this.state.descriptionText}`;

        Linking.openURL('mailto:jugariu_mihai@yahoo.com?subject=React&body=' + body);
    }

    render() {
        return(
            <View>
                <Text>
                    Introduce input to send on mail:
                </Text>

                <TextInput
                    style={{height:50, borderColor: 'black', borderWidth: 1}}
                    name='TitleInput'
                    onChangedText={this.handleTitleChanged}
                    value={this.state.titleText}
                />

                <Button
                    title='Send email'
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}