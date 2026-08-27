package com.careerforge.careerforge.resume.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateResumeEducationRequest(

        @NotBlank
        @Size(max = 255)
        String institutionName,

        @NotBlank
        @Size(max = 255)
        String degree,

        @Size(max = 255)
        String fieldOfStudy,

        @Size(max = 255)
        String location,

        LocalDate startDate,

        LocalDate endDate,

        boolean currentlyStudying,

        @Size(max = 100)
        String grade,

        String description,

        int displayOrder
) {
}