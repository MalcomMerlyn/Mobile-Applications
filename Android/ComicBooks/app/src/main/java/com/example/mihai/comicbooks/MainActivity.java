package com.example.mihai.comicbooks;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mihai.comicbooks.pages.TopicsList;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;

public class MainActivity extends AppCompatActivity {

    private EditText emailText;
    private EditText passwordText;
    private FirebaseAuth firebaseAuth;

    static {
        FirebaseDatabase.getInstance().setPersistenceEnabled(true);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        emailText = findViewById(R.id.emailText);
        passwordText = findViewById(R.id.passwordText);
        Button loginButton = findViewById(R.id.loginButton);
        Button signUpButton = findViewById(R.id.mainSignUpButton);

        firebaseAuth = FirebaseAuth.getInstance();

        loginButton.setOnClickListener((view) -> {
            try {
                firebaseAuth.signInWithEmailAndPassword(emailText.getText().toString(), passwordText.getText().toString())
                        .addOnCompleteListener(MainActivity.this, (task) -> {
                            if (task.isSuccessful()) {
                                Intent intent = new Intent(MainActivity.this, TopicsList.class);
                                startActivity(intent);
                            } else {
                                Toast.makeText(MainActivity.this, "Authentication failed.", Toast.LENGTH_SHORT).show();
                            }
                        });
            }
            catch(Exception ex) {
                Log.d("[AUTH_ERROR]", "emailText or passwordText invalid");
            }
        });

        signUpButton.setOnClickListener((v) -> {
            Intent intent = new Intent(MainActivity.this, SignUp.class);
            startActivity(intent);
        });
    }
}