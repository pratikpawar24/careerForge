package com.careerforge.careerforge.resume.api;

import java.util.List;
import java.util.UUID;

public record FullResumeResponse(

        UUID id,
        String name,
        boolean isDefault,

        List<ResumeExperienceResponse> experiences,
        List<ResumeEducationResponse> educations,
        List<ResumeSkillResponse> skills,
        List<ResumeProjectResponse> projects
) {
}