import React from "react";
import {Button, Linking, Text, TextInput, View} from "react-native";

export class ComicBook extends React.Component
{
    constructor(props)
    {
        super(props);

        console.log("ComicBook::constructor : this.props = ", this.props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { titleText: 'a', descriptionText: 'a'}
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
                    onChangeText={(titleText) => this.setState({titleText})}
                    value={this.state.titleText}
                />

                <TextInput
                    style={{height:50, borderColor: 'black', borderWidth: 1}}
                    name='DescriptionInput'
                    onChangeText={(descriptionText) => this.setState({descriptionText})}
                    value={this.state.descriptionText}
                />

                <Button
                    title='Send email'
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}