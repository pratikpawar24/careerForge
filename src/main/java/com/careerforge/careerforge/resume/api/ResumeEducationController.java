package com.careerforge.careerforge.resume.api;

import com.careerforge.careerforge.resume.application.ResumeEducationService;
import com.careerforge.careerforge.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/resumes/{resumeId}/educations")
public class ResumeEducationController {

    private final ResumeEducationService educationService;

    public ResumeEducationController(
            ResumeEducationService educationService
    ) {
        this.educationService = educationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResumeEducationResponse createEducation(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @Valid @RequestBody CreateResumeEducationRequest request
    ) {
        return educationService.createEducation(
                user.getId(),
                resumeId,
                request
        );
    }

    @GetMapping
    public List<ResumeEducationResponse> getEducations(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {
        return educationService.getEducations(
                user.getId(),
                resumeId
        );
    }

    @PutMapping("/{educationId}")
    public ResumeEducationResponse updateEducation(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID educationId,
            @Valid @RequestBody UpdateResumeEducationRequest request
    ) {
        return educationService.updateEducation(
                user.getId(),
                resumeId,
                educationId,
                request
        );
    }

    @DeleteMapping("/{educationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEducation(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID educationId
    ) {
        educationService.deleteEducation(
                user.getId(),
                resumeId,
                educationId
        );
    }
}