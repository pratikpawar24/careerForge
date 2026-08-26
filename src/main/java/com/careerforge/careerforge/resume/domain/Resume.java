package com.careerforge.careerforge.resume.domain;

import com.careerforge.careerforge.user.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "resumes")
@Getter
@NoArgsConstructor
public class Resume {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(name = "is_default", nullable = false)
    private boolean isDefault;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Resume(
            User user,
            String name,
            boolean isDefault
    ) {
        this.id = UUID.randomUUID();
        this.user = user;
        this.name = name;
        this.isDefault = isDefault;

        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    public void updateName(String name) {
        this.name = name;
        this.updatedAt = Instant.now();
    }

    public void setDefault(boolean isDefault) {
        this.isDefault = isDefault;
        this.updatedAt = Instant.now();
    }
}