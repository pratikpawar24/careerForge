package com.careerforge.careerforge.resume.api;

import java.time.LocalDate;
import java.util.UUID;

public record ResumeProjectResponse(

        UUID id,
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
}