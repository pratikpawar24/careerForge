package com.careerforge.careerforge.resume.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "resume_educations")
public class ResumeEducation {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(name = "institution_name", nullable = false)
    private String institutionName;

    @Column(nullable = false)
    private String degree;

    @Column(name = "field_of_study")
    private String fieldOfStudy;

    private String location;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "currently_studying", nullable = false)
    private boolean currentlyStudying;

    private String grade;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected ResumeEducation() {
    }

    public ResumeEducation(
            Resume resume,
            String institutionName,
            String degree,
            String fieldOfStudy,
            String location,
            LocalDate startDate,
            LocalDate endDate,
            boolean currentlyStudying,
            String grade,
            String description,
            int displayOrder
    ) {
        this.id = UUID.randomUUID();
        this.resume = resume;
        this.institutionName = institutionName;
        this.degree = degree;
        this.fieldOfStudy = fieldOfStudy;
        this.location = location;
        this.startDate = startDate;
        this.endDate = currentlyStudying ? null : endDate;
        this.currentlyStudying = currentlyStudying;
        this.grade = grade;
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

    public String getInstitutionName() {
        return institutionName;
    }

    public String getDegree() {
        return degree;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public String getLocation() {
        return location;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public boolean isCurrentlyStudying() {
        return currentlyStudying;
    }

    public String getGrade() {
        return grade;
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
            String institutionName,
            String degree,
            String fieldOfStudy,
            String location,
            LocalDate startDate,
            LocalDate endDate,
            boolean currentlyStudying,
            String grade,
            String description,
            int displayOrder
    ) {
        this.institutionName = institutionName;
        this.degree = degree;
        this.fieldOfStudy = fieldOfStudy;
        this.location = location;
        this.startDate = startDate;
        this.endDate = currentlyStudying ? null : endDate;
        this.currentlyStudying = currentlyStudying;
        this.grade = grade;
        this.description = description;
        this.displayOrder = displayOrder;
        this.updatedAt = Instant.now();
    }
}