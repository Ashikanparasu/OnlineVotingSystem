package com.votemate.service;

import com.votemate.model.Candidate;
import com.votemate.model.Voter;
import com.votemate.model.VoteRecord;
import com.votemate.repository.CandidateRepository;
import com.votemate.repository.VoterRepository;
import com.votemate.repository.VoteRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    @Autowired
    private CandidateRepository candidateRepo;

    @Autowired
    private VoterRepository voterRepo;

    @Autowired
    private VoteRecordRepository recordRepo;

    // 🗳️ Cast a vote
    public String castVote(Long voterId, Long candidateId) {
        Voter v = voterRepo.findById(voterId).orElse(null);
        Candidate c = candidateRepo.findById(candidateId).orElse(null);

        if (v == null || c == null) {
            return "Invalid voter or candidate ID.";
        }

        if (v.isVoted()) {
            return "Voter has already voted.";
        }

        // increment vote count
        c.setVotes(c.getVotes() + 1);
        v.setVoted(true);
        candidateRepo.save(c);
        voterRepo.save(v);

        // record vote
        VoteRecord record = new VoteRecord();
        record.setVoterId(voterId);
        record.setCandidateId(candidateId);
        recordRepo.save(record);

        return "Vote recorded successfully!";
    }

    // 📊 Get election results (sorted)
    public List<Candidate> results() {
        return candidateRepo.findAll()
                .stream()
                .sorted((a, b) -> b.getVotes() - a.getVotes())
                .toList();
    }
}
