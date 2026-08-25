package com.careerforge.careerforge.profile.api;

import jakarta.validation.constraints.Size;

public record ProfileRequest(

        @Size(max = 255)
        String fullName,

        @Size(max = 50)
        String phoneNumber,

        @Size(max = 255)
        String location,

        @Size(max = 500)
        String headline,

        @Size(max = 255)
        String currentRoleName,

        @Size(max = 500)
        String linkedinUrl,

        @Size(max = 500)
        String portfolioUrl
) {
}