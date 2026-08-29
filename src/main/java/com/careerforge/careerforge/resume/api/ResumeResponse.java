package com.careerforge.careerforge.resume.api;

import com.careerforge.careerforge.resume.domain.ResumeTemplate;

import java.time.Instant;
import java.util.UUID;

public record ResumeResponse(

        UUID id,
        String name,
        boolean isDefault,
        Instant createdAt,
        Instant updatedAt,
        ResumeTemplate template
) {
}