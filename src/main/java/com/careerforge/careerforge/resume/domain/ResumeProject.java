package com.careerforge.careerforge.resume.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "resume_projects")
public class ResumeProject {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 1000)
    private String technologies;

    @Column(name = "project_url", length = 500)
    private String projectUrl;

    @Column(name = "repository_url", length = 500)
    private String repositoryUrl;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "currently_working", nullable = false)
    private boolean currentlyWorking;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected ResumeProject() {
    }

    public ResumeProject(
            Resume resume,
            String name,
            String description,
            String technologies,
            String projectUrl,
            String repositoryUrl,
            LocalDate startDate,
            LocalDate endDate,
            boolean currentlyWorking,
            int displayOrder
    ) {
        this.id = UUID.randomUUID();
        this.resume = resume;
        this.name = name;
        this.description = description;
        this.technologies = technologies;
        this.projectUrl = projectUrl;
        this.repositoryUrl = repositoryUrl;
        this.startDate = startDate;
        this.endDate = currentlyWorking ? null : endDate;
        this.currentlyWorking = currentlyWorking;
        this.displayOrder = displayOrder;

        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    public UUID getId() {
        return id;
    }

    public Resume getResume() {
        return resume;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getTechnologies() {
        return technologies;
    }

    public String getProjectUrl() {
        return projectUrl;
    }

    public String getRepositoryUrl() {
        return repositoryUrl;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public boolean isCurrentlyWorking() {
        return currentlyWorking;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void update(
            String name,
            String description,
            String technologies,
            String projectUrl,
            String repositoryUrl,
            LocalDate startDate,
            LocalDate endDate,
            boolean currentlyWorking,
            int displayOrder
    ) {
        this.name = name;
        this.description = description;
        this.technologies = technologies;
        this.projectUrl = projectUrl;
        this.repositoryUrl = repositoryUrl;
        this.startDate = startDate;
        this.endDate = currentlyWorking ? null : endDate;
        this.currentlyWorking = currentlyWorking;
        this.displayOrder = displayOrder;
        this.updatedAt = Instant.now();
    }
}