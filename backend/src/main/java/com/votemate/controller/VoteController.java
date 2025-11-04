package com.votemate.controller;

import com.votemate.model.*;
import com.votemate.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.votemate.service.ResultPublisher;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class VoteController {

    @Autowired
    private VoterRepository voterRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private VoteRecordRepository voteRecordRepository;

    @Autowired
    private ResultPublisher resultPublisher;

    // ✅ Cast Vote
    @PostMapping("/vote/{candidateId}")
    @Transactional
    public Map<String, Object> castVote(@PathVariable Long candidateId, @RequestBody Map<String, String> body) {
        String email = body.get("email");
        Map<String, Object> response = new HashMap<>();

        Voter voter = voterRepository.findByEmail(email);
        if (voter == null) {
            response.put("ok", false);
            response.put("message", "Voter not found!");
            return response;
        }

        if (voter.isVoted()) {
            response.put("ok", false);
            response.put("message", "You have already voted!");
            return response;
        }

        Candidate candidate = candidateRepository.findById(candidateId).orElse(null);
        if (candidate == null) {
            response.put("ok", false);
            response.put("message", "Candidate not found!");
            return response;
        }

        // Update candidate vote count atomically using repository JPQL increment
        int updated = candidateRepository.incrementVotesById(candidateId);
        if (updated <= 0) {
            response.put("ok", false);
            response.put("message", "Failed to increment candidate votes");
            return response;
        }

        // refresh candidate to get latest votes
        candidate = candidateRepository.findById(candidateId).orElse(candidate);

        // Mark voter as voted
        voter.setVoted(true);
        voterRepository.save(voter);

        // Record vote
        VoteRecord record = new VoteRecord();
        record.setVoterId(voter.getId());
        record.setVoterName(voter.getName());
        record.setVoterEmail(voter.getEmail());
        record.setCandidateId(candidate.getId());
        record.setCandidateName(candidate.getName());
        voteRecordRepository.save(record);

        // publish new results to any SSE listeners
        try {
            List<com.votemate.model.Candidate> all = candidateRepository.findAll();
            resultPublisher.publish(all);
        } catch (Exception e) {
            // don't fail the vote if publishing fails
            System.err.println("Failed to publish results: " + e.getMessage());
        }

        response.put("ok", true);
        response.put("message", "Vote cast successfully!");
        return response;
    }
}
