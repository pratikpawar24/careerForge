package com.careerforge.careerforge.auth.api;

import java.util.UUID;

public record RegisterResponse(
        UUID userId,
        String email,
        String message
) {
}