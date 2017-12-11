import React from 'react';
import {Picker} from "react-native";

export class TypePicker extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render() {

        return(
            <Picker
                selectedValue={this.props.selectedValue}
                onValueChange={this.props.onValueChange}>
                <Picker.Item label="Comic book store" value="Comic book store" />
                <Picker.Item label="Comic book title" value="Comic book title" />
                <Picker.Item label="Comic book review" value="Comic book review" />
                <Picker.Item label="Comic book movie" value="Comic book movie" />
            </Picker>
        );
    }
}