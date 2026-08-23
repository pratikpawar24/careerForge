package com.careerforge.careerforge.auth.domain;

import com.careerforge.careerforge.user.domain.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "email_verification_otps")
@Getter
public class EmailVerificationOtp {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "otp_hash", nullable = false, length = 255)
    private String otpHash;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(name = "verified_at")
    private Instant verifiedAt;

    @Column(name = "invalidated_at")
    private Instant invalidatedAt;

    @Column(name = "attempt_count", nullable = false)
    private int attemptCount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    protected EmailVerificationOtp() {
        // Required by JPA
    }
    public void markAsVerified() {
        this.verifiedAt = Instant.now();
    }

    public void invalidate() {
        this.invalidatedAt = Instant.now();
    }

    public void incrementAttemptCount() {
        this.attemptCount++;
    }
    public EmailVerificationOtp(
            User user,
            String otpHash,
            Instant expiresAt
    ) {
        this.user = user;
        this.otpHash = otpHash;
        this.expiresAt = expiresAt;
    }

    @PrePersist
    private void prePersist() {
        if (id == null) {
            id = UUID.randomUUID();
        }

        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}
