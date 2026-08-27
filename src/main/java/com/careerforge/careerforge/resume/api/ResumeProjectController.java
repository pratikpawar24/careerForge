package com.careerforge.careerforge.resume.api;

import com.careerforge.careerforge.resume.application.ResumeProjectService;
import com.careerforge.careerforge.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/resumes/{resumeId}/projects")
public class ResumeProjectController {

    private final ResumeProjectService projectService;

    public ResumeProjectController(
            ResumeProjectService projectService
    ) {
        this.projectService = projectService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResumeProjectResponse createProject(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @Valid @RequestBody CreateResumeProjectRequest request
    ) {
        return projectService.createProject(
                user.getId(),
                resumeId,
                request
        );
    }

    @GetMapping
    public List<ResumeProjectResponse> getProjects(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {
        return projectService.getProjects(
                user.getId(),
                resumeId
        );
    }

    @PutMapping("/{projectId}")
    public ResumeProjectResponse updateProject(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID projectId,
            @Valid @RequestBody UpdateResumeProjectRequest request
    ) {
        return projectService.updateProject(
                user.getId(),
                resumeId,
                projectId,
                request
        );
    }

    @DeleteMapping("/{projectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID projectId
    ) {
        projectService.deleteProject(
                user.getId(),
                resumeId,
                projectId
        );
    }
}