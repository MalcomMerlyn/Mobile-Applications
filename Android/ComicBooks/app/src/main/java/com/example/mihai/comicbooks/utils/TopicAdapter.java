package com.example.mihai.comicbooks.utils;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.mihai.comicbooks.R;
import com.example.mihai.comicbooks.model.Topic;

import java.util.ArrayList;

/**
 * Created by Mihai on 11/9/2017.
 */

public class TopicAdapter extends BaseAdapter {
    private Context context;
    ArrayList<Topic> topics;

    public TopicAdapter(Context context, ArrayList<Topic> topics) {
        this.context = context;
        this.topics = topics;
    }

    public void add(Topic topic) {
        topics.add(topic);
    }

    public void updateTopic(Topic topic)
    {
        Topic t = getTopicById(topic.getId());

        t.setTitle(topic.getTitle());
        t.setDescription(topic.getDescription());

        notifyDataSetChanged();
    }

    public Topic getTopicById(int id)
    {
        for(Topic topic : topics)
        {
            if (topic.getId() == id)
            {
                return topic;
            }
        }

        return topics.get(id);
    }

    @Override
    public int getCount() {
        return topics.size();
    }

    @Override
    public Topic getItem(int i) {
        return topics.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        View topicsView = View.inflate(this.context, R.layout.topics_view, null);
        TextView titleView = topicsView.findViewById(R.id.titleTextView);
        TextView textView = topicsView.findViewById(R.id.descriptionTextView);

        titleView.setText(topics.get(i).getTitle());
        textView.setText(topics.get(i).getDescription());
        topicsView.setTag(topics.get(i));

        return topicsView;
    }
}
