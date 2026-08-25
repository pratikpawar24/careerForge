package com.careerforge.careerforge.profile.api;

import java.time.Instant;
import java.util.UUID;

public record ProfileResponse(

        UUID id,
        String fullName,
        String phoneNumber,
        String location,
        String headline,
        String currentRoleName,
        String linkedinUrl,
        String portfolioUrl,
        Instant createdAt,
        Instant updatedAt
) {
}