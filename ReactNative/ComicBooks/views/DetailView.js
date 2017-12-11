import React from "react";
import {StyleSheet, View} from "react-native";
import {ComicBookEdit} from "../model/ComicBookEdit";
import {Pie} from "react-native-pathjs-charts";

export class DetailView extends React.Component {
    constructor(props)
    {
        super(props);

        console.log("DetailView::constructor : props.navigation.state.params = ", props.navigation.state.params)

        this.navParams = this.props.navigation.state.params;
    }

    render()
    {
        let data = [{
            "name": "Comic book store",
            "numberItems": 0
        }, {
            "name": "Comic book title",
            "numberItems": 0
        }, {
            "name": "Comic book review",
            "numberItems": 0
        }, {
            "name": "Comic book movie",
            "numberItems": 0
        }];

        for (let comic of this.navParams.list)
        {
            for (let elem of data)
            {
                if (elem["name"] == comic.comic.type)
                {
                    elem["numberItems"] += 1;
                }
            }
        }

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 0,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        }
        return (
            <View>
                <ComicBookEdit
                    updateComicBook={this.navParams.updateComicBook}
                    index={this.navParams.index}
                    title={this.navParams.comic.title}
                    description={this.navParams.comic.description}
                    type={this.navParams.comic.type}
                >
                </ComicBookEdit>

                <Pie
                    data={data}
                    options={options}
                    accessorKey="numberItems"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    gauge: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },
});