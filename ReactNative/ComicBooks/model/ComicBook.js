import React from "react";
import {Button, Linking, Text, TextInput, View} from "react-native";
import {TypePicker} from "../utils/TypePicker";

export class ComicBook extends React.Component
{
    constructor(props)
    {
        super(props);

        console.log("ComicBook::constructor : this.props = ", this.props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { titleText: '', descriptionText: '', typeText: ''}
    }

    handleSubmit()
    {
        let body = `Added a topic with title: ${this.state.titleText}, description: ${this.state.descriptionText}, type: ${this.state.typeText}`;

        Linking.openURL('mailto:jugariu_mihai@yahoo.com?subject=React&body=' + body);
    }

    handleAddComicBook()
    {
        let comic = {
            title: this.state.titleText,
            description: this.state.descriptionText,
            type: this.state.typeText
        };

        this.setState({ titleText: '', descriptionText: '', typeText: '' });

        this.props.addComicBook(comic);
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

                <TypePicker
                    selectedValue={this.state.typeText}
                    onValueChange={(itemValue, itemIndex) => this.setState({typeText: itemValue})}
                />

                <Button
                    title='Send email'
                    onPress={this.handleSubmit}
                />

                <Button
                    title='Add comic book'
                    onPress={this.handleAddComicBook.bind(this)}
                />
            </View>
        );
    }
}