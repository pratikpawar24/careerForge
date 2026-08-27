package com.careerforge.careerforge.resume.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeEducationRepository
        extends JpaRepository<ResumeEducation, UUID> {

    List<ResumeEducation> findAllByResumeOrderByDisplayOrderAsc(
            Resume resume
    );

    Optional<ResumeEducation> findByIdAndResume(
            UUID id,
            Resume resume
    );
}