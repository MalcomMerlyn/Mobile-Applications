package com.example.mihai.comicbooks;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import com.example.mihai.comicbooks.utils.TopicAdapter;
import com.example.mihai.comicbooks.model.Topic;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private static int id = 1;
    private final String EMPTY_STRING = "";

    private TopicAdapter adapter;
    private int operation = 0;
    private ArrayList<Map.Entry<String, Topic>> topics;
    private ListView listView;
    private boolean edited = false;
    private int position = 0;

    public FirebaseDatabase database = FirebaseDatabase.getInstance();
    public DatabaseReference reference = database.getReference("topics");
    private static final String TAG = MainActivity.class.getSimpleName();

    public final static int REQ_CODE_CHILD = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = (ListView)findViewById(R.id.listTopics);
        topics = new ArrayList<>();
        /*topics.add(new Topic(
                1,
                "Places where to buy comics.",
                "The best place to buy comics in Cluj-Napoca is Libraria Universitatii."
        ));*/

        final EditText titleEditText = (EditText)findViewById(R.id.titleEditText);
        final EditText textEditText = (EditText)findViewById(R.id.descriptionEditText);

        reference.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                if (dataSnapshot != null && dataSnapshot.getValue() != null) {
                    Topic topic = dataSnapshot.getValue(Topic.class);
                    adapter.addTopicLocally(dataSnapshot.getKey(), topic);
                    Log.v(TAG, "onChildAdded : created " + topic);
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
            public void onChildMoved(DataSnapshot dataSnapshot, String s) { }

            @Override
            public void onCancelled(DatabaseError databaseError) { }
        });

        adapter = new TopicAdapter(this, topics, reference);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener((AdapterView<?> adapterView, View view, int pos, long l) ->
            {
                Topic topic = adapter.getItem(pos);

                Intent intent = new Intent(MainActivity.this, TopicEditActivity.class);
                intent.putExtra("TOPIC", topic);
                position = pos;
                operation = 0;

                startActivityForResult(intent, REQ_CODE_CHILD);
            }
        );

        Button addTopicButton = (Button) findViewById(R.id.addButton);
        addTopicButton.setOnClickListener((view) -> {
            Topic topic = new Topic("", "", "");
            Intent intent = new Intent(MainActivity.this, TopicEditActivity.class);
            intent.putExtra("TOPIC", topic);
            operation = 1;
            startActivityForResult(intent, REQ_CODE_CHILD);
        });
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if (requestCode == REQ_CODE_CHILD)
        {
            Topic topic = (Topic)data.getExtras().getSerializable("UPDATED_TOPIC");
            if (operation == 1) {
                adapter.saveTopic(-1, topic);
            }
            else if (operation == 0) {
                adapter.saveTopic(position, topic);
            }
        }
    }
}