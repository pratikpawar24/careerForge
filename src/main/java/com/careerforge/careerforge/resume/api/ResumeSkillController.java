package com.careerforge.careerforge.resume.api;

import com.careerforge.careerforge.resume.application.ResumeSkillService;
import com.careerforge.careerforge.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/resumes/{resumeId}/skills")
public class ResumeSkillController {

    private final ResumeSkillService skillService;

    public ResumeSkillController(
            ResumeSkillService skillService
    ) {
        this.skillService = skillService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResumeSkillResponse createSkill(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @Valid @RequestBody CreateResumeSkillRequest request
    ) {
        return skillService.createSkill(
                user.getId(),
                resumeId,
                request
        );
    }

    @GetMapping
    public List<ResumeSkillResponse> getSkills(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {
        return skillService.getSkills(
                user.getId(),
                resumeId
        );
    }

    @PutMapping("/{skillId}")
    public ResumeSkillResponse updateSkill(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID skillId,
            @Valid @RequestBody UpdateResumeSkillRequest request
    ) {
        return skillService.updateSkill(
                user.getId(),
                resumeId,
                skillId,
                request
        );
    }

    @DeleteMapping("/{skillId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSkill(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @PathVariable UUID skillId
    ) {
        skillService.deleteSkill(
                user.getId(),
                resumeId,
                skillId
        );
    }
}