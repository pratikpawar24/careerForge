package com.careerforge.careerforge.resume.api;

import com.careerforge.careerforge.resume.domain.ResumeTemplate;

import java.util.List;
import java.util.UUID;

public record FullResumeResponse(

        UUID id,
        String name,
        boolean isDefault,
        ResumeTemplate template,

        List<ResumeExperienceResponse> experiences,
        List<ResumeEducationResponse> educations,
        List<ResumeSkillResponse> skills,
        List<ResumeProjectResponse> projects
) {
}