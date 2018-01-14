package com.example.mihai.comicbooks.notifications;

import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

/**
 * Created by Mihai on 1/14/2018.
 */

public class TopicFirebaseInstanceIDService extends FirebaseInstanceIdService {

    private static final String TAG = "[FirebaseIDService]";

    @Override
    public void onTokenRefresh() {
        String refreshToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, " RefreshedToken = " + refreshToken);
    }
}
