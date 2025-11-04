package com.votemate.repository;

import com.votemate.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

	@Modifying
	@Transactional
	@Query("update Candidate c set c.votes = c.votes + 1 where c.id = :id")
	int incrementVotesById(@Param("id") Long id);
}
