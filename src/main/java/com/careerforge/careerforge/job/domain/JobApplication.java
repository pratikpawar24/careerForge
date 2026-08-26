package com.careerforge.careerforge.job.domain;

import com.careerforge.careerforge.user.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "job_applications")
@Getter
@NoArgsConstructor
public class JobApplication {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "job_url")
    private String jobUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_source", nullable = false)
    private ApplicationSource applicationSource;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(name = "applied_at")
    private Instant appliedAt;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public JobApplication(
            User user,
            String companyName,
            String jobTitle,
            String jobUrl,
            ApplicationSource applicationSource,
            ApplicationStatus status,
            Instant appliedAt,
            String notes
    ) {
        this.id = UUID.randomUUID();
        this.user = user;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.jobUrl = jobUrl;
        this.applicationSource = applicationSource;
        this.status = status;
        this.appliedAt = appliedAt;
        this.notes = notes;

        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    public void update(
            String companyName,
            String jobTitle,
            String jobUrl,
            ApplicationSource applicationSource,
            ApplicationStatus status,
            Instant appliedAt,
            String notes
    ) {
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.jobUrl = jobUrl;
        this.applicationSource = applicationSource;
        this.status = status;
        this.appliedAt = appliedAt;
        this.notes = notes;
        this.updatedAt = Instant.now();
    }
    public void updateStatus(ApplicationStatus status) {
        this.status = status;
        this.updatedAt = Instant.now();
    }
}