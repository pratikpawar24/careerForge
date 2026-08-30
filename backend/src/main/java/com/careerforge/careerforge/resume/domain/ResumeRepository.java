package com.careerforge.careerforge.resume.domain;

import com.careerforge.careerforge.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeRepository
        extends JpaRepository<Resume, UUID> {

    List<Resume> findAllByUserOrderByUpdatedAtDesc(User user);

    Optional<Resume> findByIdAndUser(
            UUID id,
            User user
    );

    Optional<Resume> findByUserAndIsDefaultTrue(User user);
}