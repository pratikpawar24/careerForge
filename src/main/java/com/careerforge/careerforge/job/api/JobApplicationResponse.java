package com.careerforge.careerforge.job.api;

import com.careerforge.careerforge.job.domain.ApplicationSource;
import com.careerforge.careerforge.job.domain.ApplicationStatus;

import java.time.Instant;
import java.util.UUID;

public record JobApplicationResponse(

        UUID id,
        String companyName,
        String jobTitle,
        String jobUrl,
        ApplicationSource applicationSource,
        ApplicationStatus status,
        Instant appliedAt,
        String notes,
        Instant createdAt,
        Instant updatedAt
) {
}