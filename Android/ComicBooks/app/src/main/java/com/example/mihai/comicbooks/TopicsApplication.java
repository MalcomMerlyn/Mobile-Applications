package com.example.mihai.comicbooks;

import android.app.Application;

import com.google.firebase.database.FirebaseDatabase;

/**
 * Created by Mihai on 1/11/2018.
 */

public class TopicsApplication extends Application{
    public TopicsApplication() {
        FirebaseDatabase.getInstance().setPersistenceEnabled(true);
    }
}
