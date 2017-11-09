package com.example.mihai.comicbooks.adapter;

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
        notifyDataSetChanged();
    }

    @Override
    public int getCount() {
        return topics.size();
    }

    @Override
    public Object getItem(int i) {
        return topics.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        View topicsView = View.inflate(context, R.layout.topics_view, null);
        TextView titleView = topicsView.findViewById(R.id.textView2);
        TextView textView = topicsView.findViewById(R.id.textView3);
        titleView.setText(topics.get(i).getTitle());
        textView.setText(topics.get(i).getText());
        topicsView.setTag(topics.get(i));
        return null;
    }
}
