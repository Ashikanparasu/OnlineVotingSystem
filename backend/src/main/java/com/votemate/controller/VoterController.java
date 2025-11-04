package com.votemate.controller;

import com.votemate.model.Voter;
import com.votemate.service.VoterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class VoterController {

    @Autowired
    private VoterService voterService;

    // Add single voter
    @PostMapping("/voter")
    public ResponseEntity<Voter> addVoter(@RequestBody Voter voter) {
        Voter saved = voterService.addVoter(voter);
        return ResponseEntity.ok(saved);
    }

    // Upload multiple voters (expects array of {name,email})
    @PostMapping("/voters/upload")
    public ResponseEntity<?> uploadVoters(@RequestBody List<Voter> voters) {
        var saved = voterService.addBulk(voters);
        return ResponseEntity.ok(Map.of("ok", true, "count", saved.size()));
    }

    // Get all voters
    @GetMapping("/voters")
    public ResponseEntity<List<Voter>> getAllVoters() {
        return ResponseEntity.ok(voterService.getAllVoters());
    }
}
