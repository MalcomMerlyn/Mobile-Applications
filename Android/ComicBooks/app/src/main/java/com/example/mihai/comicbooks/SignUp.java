package com.example.mihai.comicbooks;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mihai.comicbooks.model.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

/**
 * Created by Mihai on 1/14/2018.
 */

public class SignUp extends AppCompatActivity {
    EditText nameText, emailText, passwordText;
    Button saveButton;
    CheckBox isVIP;

    FirebaseAuth firebaseAuth;
    DatabaseReference reference;
    FirebaseDatabase database ;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        database = FirebaseDatabase.getInstance() ;
        firebaseAuth = FirebaseAuth.getInstance();
        reference = database.getReference("users");

        nameText = findViewById(R.id.signUpNameText);
        emailText = findViewById(R.id.signUpEmailText);
        passwordText = findViewById(R.id.signUpPasswordText);
        saveButton = findViewById(R.id.signUpButton);
        isVIP = findViewById(R.id.checkBox);

        saveButton.setOnClickListener((view) -> {
            firebaseAuth.createUserWithEmailAndPassword(emailText.getText().toString(), passwordText.getText().toString())
                    .addOnCompleteListener(SignUp.this, (task) -> {
                        if (task.isSuccessful()) {
                            User user = new User(
                                    nameText.getText().toString()
                                    , emailText.getText().toString()
                                    , passwordText.getText().toString()
                                    , isVIP.isChecked()
                            );
                            Log.v("[FIREBASE_USER]", "Firebase id : " + firebaseAuth.getCurrentUser().getUid() + " User " + user.toString());
                            reference.child(firebaseAuth.getCurrentUser().getUid()).setValue(user);

                            Intent intent = new Intent(SignUp.this, MainActivity.class);
                            startActivity(intent);
                        }
                        else {
                            Toast.makeText(SignUp.this, "RegistrationFailed ", + Toast.LENGTH_SHORT).show();
                        }
                    });
        });
    }
}
