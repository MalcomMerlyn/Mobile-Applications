package com.example.mihai.comicbooks.pages;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import com.example.mihai.comicbooks.R;
import com.example.mihai.comicbooks.model.Topic;
import com.example.mihai.comicbooks.utils.TopicAdapter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by Mihai on 1/14/2018.
 */

public class TopicsList extends AppCompatActivity {

    private static final String TAG = "Meetinglist";
    public final static int REQ_CODE_CHILD = 1;

    private ArrayList<Map.Entry<String, Topic>> topics;
    private TopicAdapter adapter;

    private int operation = 0;
    private int position = 0;
    private boolean isVIP;


    private FirebaseDatabase database;
    private FirebaseAuth firebaseAuth;
    private DatabaseReference topicReference;
    private DatabaseReference vipReference;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.page_topics_list);

        ListView listView = findViewById(R.id.listTopics);
        topics = new ArrayList<>();

        FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        final DatabaseReference dbReferenceUsers = database.getReference("users");
        DatabaseReference vipReference = dbReferenceUsers.child(firebaseAuth.getCurrentUser().getUid()).child("vip");
        DatabaseReference topicReference = dbReferenceUsers.child(firebaseAuth.getCurrentUser().getUid()).child("topics");

        vipReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@Nullable DataSnapshot dataSnapshot) {
                isVIP = dataSnapshot.getValue(Boolean.class);
                Log.v("[VIP]", (isVIP) ? "true" : "false");
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Log.e("ERROR", databaseError.getMessage());
            }
        });

        topicReference.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                if (dataSnapshot != null && dataSnapshot.getValue() != null) {
                    Topic topic = dataSnapshot.getValue(Topic.class);
                    adapter.addTopicLocally(dataSnapshot.getKey(), topic);
                    //Log.v(TAG, "onChildAdded : created " + topic);
                }
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                if (dataSnapshot != null && dataSnapshot.getValue() != null) {
                    adapter.updateTopicLocally(dataSnapshot.getKey(), dataSnapshot.getValue(Topic.class));
                }
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                if (dataSnapshot != null && dataSnapshot.getValue() != null) {
                    adapter.deleteTopicLocally(dataSnapshot.getKey());
                }
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        });

        adapter = new TopicAdapter(this, topics, topicReference);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener((AdapterView<?> adapterView, View view, int pos, long l) -> {
                    Log.v("[VIP]", (isVIP) ? "true" : "false");

                    Topic topic = adapter.getItem(pos);
                    Intent intent = new Intent(TopicsList.this, TopicEdit.class);
                    intent.putExtra("TOPIC", topic);
                    intent.putExtra("USER_TYPE", isVIP);
                    position = pos;
                    operation = 0;

                    startActivityForResult(intent, REQ_CODE_CHILD);
                }
        );

        Button addTopicButton = findViewById(R.id.addButton);
        addTopicButton.setOnClickListener((view) -> {
            Log.v("[VIP]", (isVIP) ? "true" : "false");

            Topic topic = new Topic("", "", "");
            Intent intent = new Intent(TopicsList.this, TopicEdit.class);
            intent.putExtra("TOPIC", topic);
            intent.putExtra("USER_TYPE", isVIP);
            operation = 1;
            startActivityForResult(intent, REQ_CODE_CHILD);
        });

        Button logoutButton = findViewById(R.id.logoutButton);
        logoutButton.setOnClickListener((view) -> {
            firebaseAuth.signOut();
            finish();
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQ_CODE_CHILD) {
            Topic topic = (Topic) data.getExtras().getSerializable("UPDATED_TOPIC");
            Log.v("topic", topic.toString());
            if (operation == 1) {
                adapter.saveTopic(-1, topic);
            } else if (operation == 0) {
                adapter.saveTopic(position, topic);
            }
        }
    }
}
