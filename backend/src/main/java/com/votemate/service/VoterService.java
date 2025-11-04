package com.votemate.service;

import com.votemate.model.Voter;
import com.votemate.repository.VoterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoterService {

    @Autowired
    private VoterRepository voterRepository;

    // Add single voter
    public Voter addVoter(Voter voter) {
        return voterRepository.save(voter);
    }

    // Get all voters
    public List<Voter> getAllVoters() {
        return voterRepository.findAll();
    }

    // Add bulk voters (Excel upload)
    public List<Voter> addBulk(List<Voter> voters) {
        return voterRepository.saveAll(voters);
    }
}
