package com.careerforge.careerforge.profile.domain;

import com.careerforge.careerforge.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProfileRepository
        extends JpaRepository<Profile, UUID> {

    Optional<Profile> findByUser(User user);
}