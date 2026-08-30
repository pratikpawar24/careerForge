package com.careerforge.careerforge.resume.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeProjectRepository
        extends JpaRepository<ResumeProject, UUID> {

    List<ResumeProject> findAllByResumeOrderByDisplayOrderAsc(
            Resume resume
    );

    Optional<ResumeProject> findByIdAndResume(
            UUID id,
            Resume resume
    );
}