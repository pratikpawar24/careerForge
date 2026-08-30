package com.careerforge.careerforge.job.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApplicationStatusHistoryRepository
        extends JpaRepository<ApplicationStatusHistory, UUID> {

    List<ApplicationStatusHistory>
    findAllByJobApplicationOrderByChangedAtAsc(
            JobApplication jobApplication
    );
}