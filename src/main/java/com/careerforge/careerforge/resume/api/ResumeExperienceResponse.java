package com.careerforge.careerforge.resume.api;

import com.careerforge.careerforge.resume.domain.EmploymentType;

import java.time.LocalDate;
import java.util.UUID;

public record ResumeExperienceResponse(

        UUID id,
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
}