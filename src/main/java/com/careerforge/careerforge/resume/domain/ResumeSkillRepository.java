package com.careerforge.careerforge.resume.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeSkillRepository
        extends JpaRepository<ResumeSkill, UUID> {

    List<ResumeSkill> findAllByResumeOrderByDisplayOrderAsc(
            Resume resume
    );

    Optional<ResumeSkill> findByIdAndResume(
            UUID id,
            Resume resume
    );

    boolean existsByResumeAndNameIgnoreCase(
            Resume resume,
            String name
    );
}