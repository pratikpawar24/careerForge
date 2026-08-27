package com.careerforge.careerforge.resume.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UpdateResumeProjectRequest(

        @NotBlank
        @Size(max = 255)
        String name,

        String description,

        @Size(max = 1000)
        String technologies,

        @Size(max = 500)
        String projectUrl,

        @Size(max = 500)
        String repositoryUrl,

        LocalDate startDate,

        LocalDate endDate,

        boolean currentlyWorking,

        int displayOrder
) {
}