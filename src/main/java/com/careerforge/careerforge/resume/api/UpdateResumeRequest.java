package com.careerforge.careerforge.resume.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateResumeRequest(

        @NotBlank
        @Size(max = 255)
        String name
) {
}