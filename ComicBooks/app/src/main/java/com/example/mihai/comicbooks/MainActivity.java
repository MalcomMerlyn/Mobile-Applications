package com.example.mihai.comicbooks;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = (ListView)findViewById(R.id.listTopics);
        topics = new ArrayList<>();
        /*topics.add(new Topic(
                id++,
                "Places where to buy comics.",
                "The best place to buy comics in Cluj-Napoca is Libraria Universitatii."
        ));*/
        System.out.println("Mihai");
        final EditText titleEditText = (EditText)findViewById(R.id.titleEditText);
        final EditText textEditText = (EditText)findViewById(R.id.textEditText);

        adapter = new TopicAdapter(this, topics);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                titleEditText.setText(adapter.getItem(i).getTitle());
                textEditText.setText(adapter.getItem(i).getText());
                selectedTopicId = adapter.getItem(i).getId();
                edited = true;
            }
        });

        Button sendMailBtn = (Button)findViewById(R.id.btnSendMail);
        sendMailBtn.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/html");
                intent.putExtra(Intent.EXTRA_EMAIL, "jugariu.mihai@gmail.com");
                intent.putExtra(Intent.EXTRA_SUBJECT, "New topic for you : " + titleEditText.getText());
                intent.putExtra(Intent.EXTRA_TEXT, textEditText.getText());
                startActivity(Intent.createChooser(intent, "Send email"));
            }
        });

        Button postTopicBtn = (Button)findViewById(R.id.btnPostTopic);
        postTopicBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text = textEditText.getText().toString();
                String title = titleEditText.getText().toString();

                if (edited) {
                    for (int i = 0; i < adapter.getCount(); i++) {
                        if (adapter.getItem(i).getId() == selectedTopicId) {
                            adapter.getItem(i).setTitle(title);
                            adapter.getItem(i).setText(text);
                        }
                    }
                    titleEditText.setText(EMPTY_STRING);
                    textEditText.setText(EMPTY_STRING);
                    selectedTopicId = 0;
                    adapter.notifyDataSetChanged();
                } else {
                    id++;
                    adapter.add(new Topic(id, title, text));
                    adapter.notifyDataSetChanged();
                }
            }
        });
    }
}
