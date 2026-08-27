package com.careerforge.careerforge.resume.api;

import java.util.UUID;

public record ResumeSkillResponse(

        UUID id,
        String name,
        String category,
        String proficiencyLevel,
        int displayOrder
) {
}