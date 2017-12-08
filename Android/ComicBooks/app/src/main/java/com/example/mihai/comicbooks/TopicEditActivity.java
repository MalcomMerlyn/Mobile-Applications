package com.example.mihai.comicbooks;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.mihai.comicbooks.adapter.TopicAdapter;
import com.example.mihai.comicbooks.model.Topic;

/**
 * Created by Mihai on 12/4/2017.
 */

public class TopicEditActivity extends AppCompatActivity{

    private TopicAdapter adapter;
    private Topic topic;

    @Override
    protected void onCreate(Bundle savedInstance)
    {
        super.onCreate(savedInstance);
        setContentView(R.layout.activity_edit);

        final EditText titleEditText = (EditText)findViewById(R.id.textEditText);
        final EditText descriptionEditText = (EditText)findViewById(R.id.descriptionEditText);

        Intent intent = getIntent();

        topic = (Topic)intent.getSerializableExtra("TOPIC");

        Button sendMailButton = (Button)findViewById(R.id.sendButton);

        sendMailButton.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/html");
                intent.putExtra(Intent.EXTRA_EMAIL, "jugariu.mihai@gmail.com");
                intent.putExtra(Intent.EXTRA_SUBJECT, "New topic for you : " + titleEditText.getText());
                intent.putExtra(Intent.EXTRA_TEXT, descriptionEditText.getText());
                startActivity(Intent.createChooser(intent, "Send email"));
            }
        });

        Button updateTopicButton = (Button)findViewById(R.id.updateButton);
        updateTopicButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String title = titleEditText.getText().toString();
                String description = descriptionEditText.getText().toString();

                topic.setTitle(title);
                topic.setDescription(description);

                Intent updateIntent = new Intent();
                updateIntent.putExtra("UPDATED_TOPIC", topic);


            }
        });
    }
}
