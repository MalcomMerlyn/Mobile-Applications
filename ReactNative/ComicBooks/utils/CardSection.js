import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    console.log();
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};


const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#5dbdff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };