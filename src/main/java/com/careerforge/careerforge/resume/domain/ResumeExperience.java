package com.careerforge.careerforge.resume.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "resume_experiences")
public class ResumeExperience {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_type")
    private EmploymentType employmentType;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "currently_working", nullable = false)
    private boolean currentlyWorking;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected ResumeExperience() {
    }

    public ResumeExperience(
            Resume resume,
            String companyName,
            String jobTitle,
            String location,
            EmploymentType employmentType,
            LocalDate startDate,
            LocalDate endDate,
            boolean currentlyWorking,
            String description,
            int displayOrder
    ) {
        this.id = UUID.randomUUID();
        this.resume = resume;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.location = location;
        this.employmentType = employmentType;
        this.startDate = startDate;
        this.endDate = currentlyWorking ? null : endDate;
        this.currentlyWorking = currentlyWorking;
        this.description = description;
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

    public String getCompanyName() {
        return companyName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getLocation() {
        return location;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
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

    public String getDescription() {
        return description;
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
            String companyName,
            String jobTitle,
            String location,
            EmploymentType employmentType,
            LocalDate startDate,
            LocalDate endDate,
            boolean currentlyWorking,
            String description,
            int displayOrder
    ) {
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.location = location;
        this.employmentType = employmentType;
        this.startDate = startDate;
        this.endDate = currentlyWorking ? null : endDate;
        this.currentlyWorking = currentlyWorking;
        this.description = description;
        this.displayOrder = displayOrder;
        this.updatedAt = Instant.now();
    }
}