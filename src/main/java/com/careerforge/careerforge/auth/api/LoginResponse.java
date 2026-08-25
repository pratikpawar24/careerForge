package com.careerforge.careerforge.auth.api;

public record LoginResponse(
        String accessToken,
        String tokenType
) {
}