package com.careerforge.careerforge.auth.domain;



import com.careerforge.careerforge.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface EmailVerificationOtpRepository
        extends JpaRepository<EmailVerificationOtp, UUID> {

    Optional<EmailVerificationOtp> findTopByUserAndVerifiedAtIsNullAndInvalidatedAtIsNullOrderByCreatedAtDesc(
            User user
    );

    Optional<EmailVerificationOtp> findTopByUserAndVerifiedAtIsNullAndInvalidatedAtIsNullAndExpiresAtAfterOrderByCreatedAtDesc(
            User user,
            Instant now
    );
}
