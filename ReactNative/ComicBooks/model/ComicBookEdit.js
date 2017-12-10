import React from "react";
import {Alert, Text, TextInput, StyleSheet, View} from "react-native";
import {TypePicker} from "../utils/TypePicker";

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export class ComicBookEdit extends React.Component {

    constructor(props)
    {
        super(props);

        console.log("ComicBookEdit::constructor : this.props = ", this.props);

        this.state = {
            titleText: this.props.title,
            descriptionText: this.props.description,
            typeText: this.props.type
        };
    }

    updateComicBook()
    {
        let newComicBook = { comic: {
            title: this.state.titleText,
            description: this.state.descriptionText,
            type: this.state.typeText
        }};

        this.props.updateComicBook(this.props.index, newComicBook);
    }

    componentWillUnmount()
    {
        if (this.state.titleText != this.props.titleText ||
            this.state.descriptionText != this.props.descriptionText ||
            this.state.typeText != this.props.typeText
        ) {
            console.log("ComicBookEdit::componentWillUnmount : this.props = ", this.props);

            //let newComicBook = {comic: {title: this.state.titleText, description: this.state.descriptionText}};
            //this.props.updateComicBook(this.props.index, newComicBook);

            Alert.alert(
                'Save?',
                'Would you like to save changes?',
                [
                    {text: 'NO'},
                    {text: 'YES', onPress: () => this.updateComicBook()},
                ],
                {cancelable: false}
            );
        }
    }

    handleOnValueChange(itemValue, itemIndex)
    {
        this.setState({type: itemValue});
    }

    render() {
        return (
            <View>
                <Text style={styles.titleText}>Title:</Text>
                <TextInput
                    style={{height: 35, borderColor: 'black', borderWidth: 2}}
                    name='NameInput'
                    onChangeText={(titleText) => this.setState({titleText})}
                    value={this.state.titleText}
                />
                <Text style={styles.titleText}>Description:</Text>
                <TextInput
                    style={{height: 35, borderColor: 'black', borderWidth: 2}}
                    name='DescriptionInput'
                    onChangeText={(descriptionText) => this.setState({descriptionText})}
                    value={this.state.descriptionText}
                />
                <Text style={styles.typeText}>Type:</Text>
                <TypePicker
                    selectedValue={this.state.typeText}
                    onValueChange={(itemValue, itemIndex) => this.setState({typeText: itemValue})}
                />
            </View>
        );
    }
}
