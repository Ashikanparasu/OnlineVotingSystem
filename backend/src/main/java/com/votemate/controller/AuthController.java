package com.votemate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private JavaMailSender mailSender;
    private final Map<String, String> otpStore = new HashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String email = request.get("email");

        if (email == null || email.trim().isEmpty()) {
            response.put("ok", false);
            response.put("message", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            String otp = String.valueOf(100000 + new Random().nextInt(900000));
            otpStore.put(email, otp);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("OTP Verification - VoteMate");
            message.setText("Your OTP is: " + otp + "\n\nPlease do not share this with anyone.");
            mailSender.send(message);

            response.put("ok", true);
            response.put("message", "OTP sent successfully");
            response.put("data", Map.of("devOtp", otp)); // For development
            return ResponseEntity.ok(response);

        } catch (MailException e) {
            response.put("ok", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        Map<String, Object> response = new HashMap<>();

        if (email == null || otp == null) {
            response.put("ok", false);
            response.put("message", "Email and OTP are required");
            return ResponseEntity.badRequest().body(response);
        }

        boolean isValid = otpStore.containsKey(email) && otpStore.get(email).equals(otp);
        
        if (isValid) {
            otpStore.remove(email); // Remove used OTP
            response.put("ok", true);
            response.put("message", "OTP verified successfully");
        } else {
            response.put("ok", false);
            response.put("message", "Invalid OTP");
        }

        return ResponseEntity.ok(response);
    }
}
