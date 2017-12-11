package com.example.mihai.comicbooks;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.example.mihai.comicbooks.utils.TopicAdapter;
import com.example.mihai.comicbooks.model.Topic;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.formatter.PercentFormatter;
import com.github.mikephil.charting.utils.ColorTemplate;

import java.util.ArrayList;

/**
 * Created by Mihai on 12/4/2017.
 */

public class TopicEditActivity extends AppCompatActivity{

    private Topic topic;
    private PieChart pieChart;
    private NumberPicker typePicker;
    private int typeNumber;

    private static final String TAG = TopicEditActivity.class.getSimpleName();
    private static final String types[] = {
            "Comic book store"
            , "Comic book title"
            , "Comic book review"
            , "Comic book movie"
    };

    @Override
    protected void onCreate(Bundle savedInstance)
    {
        super.onCreate(savedInstance);
        setContentView(R.layout.activity_edit);

        final EditText titleEditText = (EditText)findViewById(R.id.titleEditText);
        final EditText descriptionEditText = (EditText)findViewById(R.id.descriptionEditText);

        Intent intent = getIntent();
        topic = (Topic)intent.getSerializableExtra("TOPIC");

        for (int i = 0; i < types.length; i++) {
            if (topic.getType().equals(types[i])) {
                typeNumber = i;
            }
        }

        typePicker = (NumberPicker) findViewById(R.id.typePicker);
        typePicker.setMinValue(0);
        typePicker.setMaxValue(3);
        typePicker.setDisplayedValues(types);
        typePicker.setWrapSelectorWheel(true);
        typePicker.setValue(typeNumber);
        typePicker.setOnValueChangedListener(
                (picker, oldValue, newValue) -> {
                    topic.setType(types[newValue]);
                }
        );

        titleEditText.setText(topic.getTitle());
        descriptionEditText.setText(topic.getDescription());

        Button sendMailButton = (Button)findViewById(R.id.sendButton);

        sendMailButton.setOnClickListener((View view) ->{
                Intent sendMailIntent = new Intent(Intent.ACTION_SEND);
                sendMailIntent.setType("text/html");
                sendMailIntent.putExtra(Intent.EXTRA_EMAIL, "jugariu.mihai@gmail.com");
                sendMailIntent.putExtra(Intent.EXTRA_SUBJECT, "New topic for you : " + titleEditText.getText());
                sendMailIntent.putExtra(Intent.EXTRA_TEXT, descriptionEditText.getText());
                startActivity(Intent.createChooser(sendMailIntent, "Send email"));
            }
        );

        Button updateTopicButton = (Button)findViewById(R.id.updateButton);
        updateTopicButton.setOnClickListener((View view) -> {
                String title = titleEditText.getText().toString();
                String description = descriptionEditText.getText().toString();

                topic.setTitle(title);
                topic.setDescription(description);

                Intent updateIntent = new Intent();
                updateIntent.putExtra("UPDATED_TOPIC", topic);

                setResult(1, updateIntent);
                finish();
            }
        );

        pieChart = (PieChart)findViewById(R.id.chart);
        ArrayList<PieEntry> entries = new ArrayList<>();
        for (int i = 0; i < types.length; i++)
            entries.add(new PieEntry(i, types[i]));
        PieDataSet dataSet = new PieDataSet(entries, "");
        dataSet.setSliceSpace(10);
        dataSet.setSelectionShift(10);

        ArrayList<Integer> colors = new ArrayList<>();

        for (int c : ColorTemplate.VORDIPLOM_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.JOYFUL_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.COLORFUL_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.LIBERTY_COLORS)
            colors.add(c);

        for (int c : ColorTemplate.PASTEL_COLORS)
            colors.add(c);

        colors.add(ColorTemplate.getHoloBlue());
        dataSet.setColors(colors);

        PieData data = new PieData(dataSet);
        data.setValueFormatter(new PercentFormatter());
        data.setValueTextSize(12);
        data.setValueTextColor(Color.BLACK);
        pieChart.setData(data);

        pieChart.invalidate();
    }

    @Override
    public void onBackPressed()
    {
        super.onBackPressed();
    }
}
