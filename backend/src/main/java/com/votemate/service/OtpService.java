package com.votemate.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    static class OtpRecord {
        final String otp;
        final Instant expiresAt;
        OtpRecord(String otp, Instant expiresAt) {
            this.otp = otp;
            this.expiresAt = expiresAt;
        }
    }

    private final Map<String, OtpRecord> store = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public String generateOtp(String email) {
        String otp = String.valueOf(100000 + random.nextInt(900000));
        Instant exp = Instant.now().plusSeconds(300);
        store.put(email.toLowerCase(), new OtpRecord(otp, exp));
        return otp;
    }

    public boolean verify(String email, String otp) {
        OtpRecord rec = store.get(email.toLowerCase());
        if (rec == null || Instant.now().isAfter(rec.expiresAt)) return false;
        boolean ok = rec.otp.equals(otp);
        if (ok) store.remove(email.toLowerCase());
        return ok;
    }
}