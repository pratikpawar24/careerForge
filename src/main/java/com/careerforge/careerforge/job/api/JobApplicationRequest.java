package com.careerforge.careerforge.job.api;

import com.careerforge.careerforge.job.domain.ApplicationSource;
import com.careerforge.careerforge.job.domain.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record JobApplicationRequest(

        @NotBlank
        @Size(max = 255)
        String companyName,

        @NotBlank
        @Size(max = 255)
        String jobTitle,

        @Size(max = 1000)
        String jobUrl,

        @NotNull
        ApplicationSource applicationSource,

        @NotNull
        ApplicationStatus status,

        Instant appliedAt,

        String notes
) {
}