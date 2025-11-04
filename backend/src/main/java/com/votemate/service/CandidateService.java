package com.votemate.service;

import com.votemate.model.Candidate;
import com.votemate.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Sort;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public Candidate addCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public List<Candidate> getAllCandidatesOrderedByVotesDesc() {
        return candidateRepository.findAll(Sort.by(Sort.Direction.DESC, "votes"));
    }

    public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }
}
