package com.careerforge.careerforge.profile.domain;

import com.careerforge.careerforge.user.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "profiles")
@Getter
@NoArgsConstructor
public class Profile {

    @Id
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String location;

    private String headline;

    @Column(name = "current_role_name")
    private String currentRoleName;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "portfolio_url")
    private String portfolioUrl;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Profile(User user) {
        this.id = UUID.randomUUID();
        this.user = user;

        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    public void update(
            String fullName,
            String phoneNumber,
            String location,
            String headline,
            String currentRoleName,
            String linkedinUrl,
            String portfolioUrl
    ) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.headline = headline;
        this.currentRoleName = currentRoleName;
        this.linkedinUrl = linkedinUrl;
        this.portfolioUrl = portfolioUrl;
        this.updatedAt = Instant.now();
    }
}