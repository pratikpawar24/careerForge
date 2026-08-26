package com.careerforge.careerforge.job.api;

import com.careerforge.careerforge.job.domain.ApplicationStatus;

import java.time.Instant;
import java.util.UUID;

public record ApplicationStatusHistoryResponse(

        UUID id,
        ApplicationStatus status,
        Instant changedAt
) {
}