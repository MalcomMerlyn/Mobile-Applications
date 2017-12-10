import React from "react";
import {View} from "react-native";
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
            "name": "Washington",
            "population": 7694980
        }, {
            "name": "Oregon",
            "population": 2584160
        }, {
            "name": "Minnesota",
            "population": 6590667
        }, {
            "name": "Alaska",
            "population": 7284698
        }]

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
            r: 50,
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
                    accessorKey="population"
                />
            </View>
        );
    }
}