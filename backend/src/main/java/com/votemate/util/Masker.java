package com.votemate.util;

public class Masker {
    public static String maskEmail(String email) {
        if (email == null || !email.contains("@")) return "****";
        String[] parts = email.split("@", 2);
        String name = parts[0];
        String domain = parts[1];
        String visible = name.length() <= 2 ? name.substring(0,1) : name.substring(0,2);
        return visible + "****@" + domain;
    }
}