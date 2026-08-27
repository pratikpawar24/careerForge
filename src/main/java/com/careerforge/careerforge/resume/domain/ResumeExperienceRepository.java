package com.careerforge.careerforge.resume.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeExperienceRepository
        extends JpaRepository<ResumeExperience, UUID> {

    List<ResumeExperience> findAllByResumeOrderByDisplayOrderAsc(
            Resume resume
    );

    Optional<ResumeExperience> findByIdAndResume(
            UUID id,
            Resume resume
    );
}