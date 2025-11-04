package com.votemate.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name="vote_records")
public class VoteRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long voterId;
    private String voterName;
    private String voterEmail;
    private Long candidateId;
    private String candidateName;
    private Date votedAt = new Date();

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}
    public Long getVoterId(){return voterId;}
    public void setVoterId(Long voterId){this.voterId=voterId;}
    public String getVoterName(){return voterName;}
    public void setVoterName(String voterName){this.voterName=voterName;}
    public String getVoterEmail(){return voterEmail;}
    public void setVoterEmail(String voterEmail){this.voterEmail=voterEmail;}
    public Long getCandidateId(){return candidateId;}
    public void setCandidateId(Long candidateId){this.candidateId=candidateId;}
    public String getCandidateName(){return candidateName;}
    public void setCandidateName(String candidateName){this.candidateName=candidateName;}
    public Date getVotedAt(){return votedAt;}
    public void setVotedAt(Date votedAt){this.votedAt=votedAt;}
}
