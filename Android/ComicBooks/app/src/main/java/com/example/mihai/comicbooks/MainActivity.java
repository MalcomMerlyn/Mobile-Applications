package com.example.mihai.comicbooks;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.ListView;

import com.example.mihai.comicbooks.adapter.TopicAdapter;
import com.example.mihai.comicbooks.model.Topic;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private static int id = 1;
    private final String EMPTY_STRING = "";

    private TopicAdapter adapter;
    private ArrayList<Topic> topics;
    private ListView listView;
    private boolean edited = false;
    private int selectedTopicId = 0;

    public final static int REQ_CODE_CHILD = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = (ListView)findViewById(R.id.listTopics);
        topics = new ArrayList<>();
        topics.add(new Topic(
                id++,
                "Places where to buy comics.",
                "The best place to buy comics in Cluj-Napoca is Libraria Universitatii."
        ));

        final EditText titleEditText = (EditText)findViewById(R.id.titleEditText);
        final EditText textEditText = (EditText)findViewById(R.id.textEditText);

        adapter = new TopicAdapter(this, topics);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                titleEditText.setText(adapter.getItem(i).getTitle());
                textEditText.setText(adapter.getItem(i).getDescription());
                selectedTopicId = adapter.getItem(i).getId();
                edited = true;
            }
        });
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if (requestCode == REQ_CODE_CHILD)
        {
            Topic topic = (Topic)data.getExtras().getSerializable("UPDATE_TOPIC");
            adapter.updateTopic(topic);
        }
    }
}
