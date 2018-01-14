package com.example.mihai.comicbooks.utils;

import android.app.AlertDialog;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;

import com.example.mihai.comicbooks.R;
import com.example.mihai.comicbooks.model.Topic;
import com.google.firebase.database.DatabaseReference;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by Mihai on 11/9/2017.
 */

public class TopicAdapter extends BaseAdapter {

    private Context context;
    private DatabaseReference reference;
    private ArrayList<Map.Entry<String, Topic>> topics;

    public TopicAdapter(Context context, ArrayList<Map.Entry<String, Topic>> topics, DatabaseReference reference) {
        this.context = context;
        this.topics = topics;
        this.reference = reference;
    }

    public void addTopicLocally(String key, Topic topic) {
        Map.Entry<String, Topic> pair = new AbstractMap.SimpleEntry<>(key, topic);
        topics.add(pair);

        notifyDataSetChanged();
    }

    public void updateTopicLocally(String key, Topic topic)
    {
        for (Map.Entry<String, Topic> pair : topics)
        {
            if (pair.getKey().equals(key))
            {
                pair.setValue(topic);
            }
        }

        notifyDataSetChanged();
    }

    public void deleteTopicLocally(String key)
    {
        for (int i = 0; i < topics.size(); i++)
        {
            if (topics.get(i).getKey().equals(key))
            {
                topics.remove(i);
            }
        }

        notifyDataSetChanged();
    }

    public void saveTopic(int index, Topic topic)
    {
        if (index == -1)
        {
            String key = reference.push().getKey();
            reference.child(key).setValue(topic);
        }
        else
        {
            String key = topics.get(index).getKey();
            reference.child(key).setValue(topic);
        }

        notifyDataSetChanged();
    }

    private void deleteTopic(int index)
    {
        String key = topics.get(index).getKey();
        reference.child(key).removeValue();
    }

    @Override
    public int getCount() {
        return topics.size();
    }

    @Override
    public Topic getItem(int i) {
        return topics.get(i).getValue();
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        View topicView = View.inflate(this.context, R.layout.topic_view, null);
        TextView titleView = topicView.findViewById(R.id.titleTextView);
        TextView textView = topicView.findViewById(R.id.descriptionTextView);

        titleView.setText(topics.get(i).getValue().getTitle());
        textView.setText(topics.get(i).getValue().getDescription());
        topicView.setTag(topics.get(i));

        final int position = i;
        Button deleteButtonView = topicView.findViewById(R.id.deleteButton);
        deleteButtonView.setOnClickListener((View v) -> {
            AlertDialog.Builder alertDialog = new AlertDialog.Builder(context);
            alertDialog.setTitle("Confirm Delete...");

            alertDialog.setMessage("Are you sure you want delete this item?");

            alertDialog.setPositiveButton(
                    "YES",
                    (dialog, which) -> {
                        deleteTopic(position);
                    }
            );

            alertDialog.setNegativeButton(
                    "NO",
                    (dialog, which) -> { }
            );

            alertDialog.show();
        });

        return topicView;
    }
}
