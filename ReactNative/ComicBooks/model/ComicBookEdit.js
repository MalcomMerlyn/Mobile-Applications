import React from "react";
import {Text, TextInput, StyleSheet, View} from "react-native";

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

        this.state = { titleText: this.props.title, descriptionText: this.props.description};
    }

    componentWillUnmount()
    {
        console.log("ComicBookEdit::componentWillUnmount : this.props = ", this.props);

        let newComicBook = {comic: {title: this.state.titleText, description: this.state.descriptionText}};
        this.props.updateComicBook(this.props.index, newComicBook);
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
            </View>
        );
    }
}
