package com.careerforge.careerforge.resume.api;

import java.time.LocalDate;
import java.util.UUID;

public record ResumeEducationResponse(

        UUID id,
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
}