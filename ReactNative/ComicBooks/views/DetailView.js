import React from "react";

export class DetailView extends React.Component {
    constructor(props)
    {
        super(props);

        this.navParams = this.props.navigation.state.params;
    }

    render()
    {
        return (
            <ComickBookEdit updateComicBook={this.navParams.update} index={this.navParams.index} title={this.navParams.comic.title} description={this.navParams.comic.description}/>
        );
    }
}