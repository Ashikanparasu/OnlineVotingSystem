package com.votemate.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final Map<String, String> otpStorage = new HashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // ✅ Generate random 6-digit OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        otpStorage.put(email, otp);

        // ✅ Print OTP in terminal
        System.out.println("Generated OTP for " + email + ": " + otp);

        // ✅ Send response to frontend
        Map<String, Object> response = new HashMap<>();
        response.put("ok", true);
        response.put("message", "OTP sent successfully");
        response.put("data", Map.of("devOtp", otp));

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        Map<String, Object> response = new HashMap<>();

        if (otpStorage.containsKey(email) && otpStorage.get(email).equals(otp)) {
            response.put("ok", true);
            response.put("message", "OTP verified successfully");
            otpStorage.remove(email);
        } else {
            response.put("ok", false);
            response.put("message", "Invalid OTP");
        }

        return ResponseEntity.ok(response);
    }
}
