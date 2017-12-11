package com.example.mihai.comicbooks.model;

import java.io.Serializable;

/**
 * Created by Mihai on 11/9/2017.
 */

public class Topic implements Serializable {

    private String title;
    private String description;
    private String type;

    public Topic() { }

    public Topic(String title, String description, String type) {
        this.title = title;
        this.description = description;
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    @Override
    public String toString() {
        return "Topic{" +
                " title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", type=' " + type + '\'' +
                '}';
    }
}
