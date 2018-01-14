package com.example.mihai.comicbooks.model;

/**
 * Created by Mihai on 1/14/2018.
 */

public class User {

    private String name;
    private String email;
    private String password;
    private boolean isVIP;

    public User() { }

    public User(String name, String email, String password, boolean isVIP) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isVIP = isVIP;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isVIP() {
        return isVIP;
    }

    public void setVIP(boolean VIP) {
        isVIP = VIP;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", isVIP=" + isVIP +
                '}';
    }
}
