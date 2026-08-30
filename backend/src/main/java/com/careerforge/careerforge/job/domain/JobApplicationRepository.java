package com.careerforge.careerforge.job.domain;

import com.careerforge.careerforge.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, UUID> {

    List<JobApplication> findAllByUserOrderByCreatedAtDesc(User user);

    Optional<JobApplication> findByIdAndUser(
            UUID id,
            User user
    );
}