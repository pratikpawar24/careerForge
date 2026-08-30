package com.careerforge.careerforge.job.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "application_status_history")
public class ApplicationStatusHistory {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "job_application_id",
            nullable = false
    )
    private JobApplication jobApplication;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(name = "changed_at", nullable = false)
    private Instant changedAt;

    protected ApplicationStatusHistory() {
    }

    public ApplicationStatusHistory(
            JobApplication jobApplication,
            ApplicationStatus status
    ) {
        this.id = UUID.randomUUID();
        this.jobApplication = jobApplication;
        this.status = status;
        this.changedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public Instant getChangedAt() {
        return changedAt;
    }
}