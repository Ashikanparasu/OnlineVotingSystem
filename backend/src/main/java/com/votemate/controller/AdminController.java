package com.votemate.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import com.votemate.model.Candidate;
import com.votemate.service.CandidateService;
import com.votemate.service.ResultPublisher;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.io.IOException;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final Map<String, String> otpStorage = new HashMap<>();

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private ResultPublisher resultPublisher;

    @Autowired
    private com.votemate.repository.VoterRepository voterRepository;

    @Autowired
    private com.votemate.repository.VoteRecordRepository voteRecordRepository;

    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        otpStorage.put(email, otp);
        System.out.println("Generated OTP for " + email + ": " + otp);

        Map<String, Object> response = new HashMap<>();
        response.put("ok", true);
        response.put("message", "OTP sent successfully");
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

    // ===== Candidate endpoints =====
    @GetMapping("/candidates")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> list = candidateService.getAllCandidates();
        return ResponseEntity.ok(list);
    }

    @PostMapping(value = "/candidate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> addCandidate(@RequestParam("name") String name,
                                                            @RequestParam("photo") MultipartFile photo) {
        Map<String, Object> resp = new HashMap<>();

        if (name == null || name.trim().isEmpty()) {
            resp.put("ok", false);
            resp.put("message", "Name is required");
            return ResponseEntity.badRequest().body(resp);
        }

        try {
            // ensure upload dir exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String original = photo.getOriginalFilename();
            String ext = "";
            if (original != null && original.contains(".")) {
                ext = original.substring(original.lastIndexOf('.'));
            }
            String filename = System.currentTimeMillis() + ext;
            Path filePath = uploadPath.resolve(filename);
            Files.write(filePath, photo.getBytes());

            String publicUrl = "http://localhost:8080/uploads/" + filename;

            Candidate c = new Candidate();
            c.setName(name);
            c.setPhotoUrl(publicUrl);
            c.setVotes(0);
            Candidate saved = candidateService.addCandidate(c);

            resp.put("ok", true);
            resp.put("message", "Candidate added");
            resp.put("data", saved);
            return ResponseEntity.ok(resp);

        } catch (IOException e) {
            resp.put("ok", false);
            resp.put("message", "Failed to save photo: " + e.getMessage());
            return ResponseEntity.internalServerError().body(resp);
        }
    }

    @DeleteMapping("/candidate/{id}")
    public ResponseEntity<Map<String, Object>> deleteCandidate(@PathVariable Long id) {
        Map<String, Object> resp = new HashMap<>();
        try {
            candidateService.deleteCandidate(id);
            resp.put("ok", true);
            resp.put("message", "Candidate deleted");
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            resp.put("ok", false);
            resp.put("message", "Failed to delete candidate: " + e.getMessage());
            return ResponseEntity.internalServerError().body(resp);
        }
    }

    // GET results for chart (name + votes)
    @GetMapping("/results")
    public ResponseEntity<List<Map<String, Object>>> getResults() {
        List<Candidate> list = candidateService.getAllCandidatesOrderedByVotesDesc();
        List<Map<String, Object>> out = new ArrayList<>();
        for (Candidate c : list) {
            Map<String, Object> m = new HashMap<>();
            m.put("id", c.getId());
            m.put("name", c.getName());
            m.put("votes", c.getVotes());
            out.add(m);
        }
        return ResponseEntity.ok(out);
    }

    // GET admin stats (totals)
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalVoters = voterRepository.count();
        long votesCast = voteRecordRepository.count();
        long candidates = candidateService.getAllCandidates().size();
        stats.put("totalVoters", totalVoters);
        stats.put("votesCast", votesCast);
        stats.put("candidates", candidates);
        stats.put("status", "Ongoing");
        return ResponseEntity.ok(stats);
    }

    // SSE stream for live results
    @GetMapping("/results/stream")
    public SseEmitter streamResults() {
        SseEmitter emitter = resultPublisher.register();
        // send initial payload
        try {
            emitter.send(SseEmitter.event().name("results").data(getResults().getBody()));
        } catch (IOException e) {
            // ignore
        }
        return emitter;
    }
}
