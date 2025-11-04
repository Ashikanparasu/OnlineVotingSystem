package com.votemate.controller;

import com.votemate.model.Candidate;
import com.votemate.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins="http://localhost:5173")
public class StudentController {
    @Autowired private VoteService voteService;

    @PostMapping("/vote")
    public ResponseEntity<?> vote(@RequestBody Map<String,Long> req){
        String msg=voteService.castVote(req.get("voterId"),req.get("candidateId"));
        return ResponseEntity.ok(Map.of("message",msg));
    }

    @GetMapping("/results")
    public List<Candidate> results(){return voteService.results();}
}
