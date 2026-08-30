package com.careerforge.careerforge.resume.api;

import com.careerforge.careerforge.resume.application.ResumeExperienceService;
import com.careerforge.careerforge.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/resumes/{resumeId}/experiences")
public class ResumeExperienceController {

    private final ResumeExperienceService experienceService;

    public ResumeExperienceController(
            ResumeExperienceService experienceService
    ) {
        this.experienceService = experienceService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResumeExperienceResponse createExperience(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @Valid @RequestBody CreateResumeExperienceRequest request
    ) {

        return experienceService.createExperience(
                user.getId(),
                resumeId,
                request
        );
    }

    @GetMapping
    public List<ResumeExperienceResponse> getExperiences(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {

        return experienceService.getExperiences(
                user.getId(),
                resumeId
        );
    }

    @PutMapping("/{experienceId}")
    public ResumeExperienceResponse updateExperience(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID experienceId,
            @Valid @RequestBody UpdateResumeExperienceRequest request
    ) {

        return experienceService.updateExperience(
                user.getId(),
                resumeId,
                experienceId,
                request
        );
    }

    @DeleteMapping("/{experienceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID experienceId
    ) {

        experienceService.deleteExperience(
                user.getId(),
                resumeId,
                experienceId
        );
    }
}