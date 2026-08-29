package com.careerforge.careerforge.resume.api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.careerforge.careerforge.resume.application.ResumeService;
import com.careerforge.careerforge.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResumeResponse createResume(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody CreateResumeRequest request
    ) {

        return resumeService.createResume(
                user.getId(),
                request
        );
    }

    @GetMapping
    public List<ResumeResponse> getMyResumes(
            @AuthenticationPrincipal User user
    ) {

        return resumeService.getMyResumes(user.getId());
    }

    @GetMapping("/{resumeId}")
    public ResumeResponse getMyResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {

        return resumeService.getMyResume(
                user.getId(),
                resumeId
        );
    }

    @PutMapping("/{resumeId}")
    public ResumeResponse updateResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId,
            @Valid @RequestBody UpdateResumeRequest request
    ) {

        return resumeService.updateResume(
                user.getId(),
                resumeId,
                request
        );
    }

    @PatchMapping("/{resumeId}/default")
    public ResumeResponse setDefaultResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {

        return resumeService.setDefaultResume(
                user.getId(),
                resumeId
        );
    }

    @DeleteMapping("/{resumeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {

        resumeService.deleteResume(
                user.getId(),
                resumeId
        );
    }

    @GetMapping("/{resumeId}/full")
    public FullResumeResponse getFullResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {

        return resumeService.getFullResume(
                user.getId(),
                resumeId
        );
    }
    @GetMapping("/{resumeId}/preview")
    public String previewResume(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {
        return resumeService.previewResume(
                user.getId(),
                resumeId
        );
    }
    @GetMapping(
            value = "/{resumeId}/pdf",
            produces = "application/pdf"
    )
    public ResponseEntity<byte[]> generatePdf(
            @AuthenticationPrincipal User user,
            @PathVariable UUID resumeId
    ) {

        byte[] pdf = resumeService.generatePdf(
                user.getId(),
                resumeId
        );

        return ResponseEntity
                .ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"resume.pdf\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}