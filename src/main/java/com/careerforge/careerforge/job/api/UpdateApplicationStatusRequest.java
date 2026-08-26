package com.careerforge.careerforge.job.api;

import com.careerforge.careerforge.job.domain.ApplicationStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateApplicationStatusRequest(

        @NotNull
        ApplicationStatus status
) {
}