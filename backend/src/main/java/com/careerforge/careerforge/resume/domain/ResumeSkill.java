package com.careerforge.careerforge.resume.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "resume_skills")
public class ResumeSkill {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String category;

    @Column(name = "proficiency_level", length = 50)
    private String proficiencyLevel;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected ResumeSkill() {
    }

    public ResumeSkill(
            Resume resume,
            String name,
            String category,
            String proficiencyLevel,
            int displayOrder
    ) {
        this.id = UUID.randomUUID();
        this.resume = resume;
        this.name = name;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
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

    public String getCategory() {
        return category;
    }

    public String getProficiencyLevel() {
        return proficiencyLevel;
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
            String category,
            String proficiencyLevel,
            int displayOrder
    ) {
        this.name = name;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
        this.displayOrder = displayOrder;
        this.updatedAt = Instant.now();
    }
}