package com.example.mihai.comicbooks.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.example.mihai.comicbooks.model.Topic;

import java.util.ArrayList;

/**
 * Created by Mihai on 11/9/2017.
 */

public class TopicAdapter extends BaseAdapter {
    private Context context;
    ArrayList<Topic> topics;

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
        return null;
    }
}
