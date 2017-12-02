import React from "react";
import {ComicBookEdit} from "../model/ComicBookEdit";

export class DetailView extends React.Component {
    constructor(props)
    {
        super(props);

        console.log("DetailView::constructor : props.navigation.state.params = ", props.navigation.state.params)

        this.navParams = this.props.navigation.state.params;
    }

    render()
    {
        return (
            <ComicBookEdit
                updateComicBook={this.navParams.updateComicBook}
                index={this.navParams.index}
                title={this.navParams.comic.title}
                description={this.navParams.comic.description}
            >
            </ComicBookEdit>
        );
    }
}