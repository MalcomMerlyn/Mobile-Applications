import React from "react";
import {Text, TextInput, StyleSheet} from "react-native";

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

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.state = { titleText: this.props.title, descriptionText: this.props.description};
    }

    handleTitleChanged(titleText)
    {
        this.setState({titleText});
    }

    handleDescriptionChanged(descriptionText)
    {
        this.setState(descriptionText);
    }

    componentWillUnmount()
    {
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
                    onhangedText={this.handleTitleChange}
                    value={this.state.titleText}
                />
                <Text style={styles.titleText}>Description:</Text>
                <TextInput
                    style={{height: 35, borderColor: 'black', borderWidth: 2}}
                    name='DescriptionInput'
                    onChangedText={this.handleDescriptionChange}
                    value={this.state.descriptionText}
                />
            </View>
        );
    }
}
