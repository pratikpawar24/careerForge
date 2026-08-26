package com.careerforge.careerforge.job.api;

import com.careerforge.careerforge.job.application.JobApplicationService;
import com.careerforge.careerforge.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/job-applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(
            JobApplicationService jobApplicationService
    ) {
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobApplicationResponse createApplication(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody JobApplicationRequest request
    ) {

        return jobApplicationService.createApplication(
                user.getId(),
                request
        );
    }

    @GetMapping
    public List<JobApplicationResponse> getMyApplications(
            @AuthenticationPrincipal User user
    ) {

        return jobApplicationService.getMyApplications(
                user.getId()
        );
    }

    @GetMapping("/{applicationId}/status-history")
    public List<ApplicationStatusHistoryResponse> getStatusHistory(
            @AuthenticationPrincipal User user,
            @PathVariable UUID applicationId
    ) {

        return jobApplicationService.getStatusHistory(
                user.getId(),
                applicationId
        );
    }

    @GetMapping("/{applicationId}")
    public JobApplicationResponse getMyApplication(
            @AuthenticationPrincipal User user,
            @PathVariable UUID applicationId
    ) {

        return jobApplicationService.getMyApplication(
                user.getId(),
                applicationId
        );
    }

    @PutMapping("/{applicationId}")
    public JobApplicationResponse updateApplication(
            @AuthenticationPrincipal User user,
            @PathVariable UUID applicationId,
            @Valid @RequestBody JobApplicationRequest request
    ) {

        return jobApplicationService.updateApplication(
                user.getId(),
                applicationId,
                request
        );
    }

    @PatchMapping("/{applicationId}/status")
    public JobApplicationResponse updateStatus(
            @AuthenticationPrincipal User user,
            @PathVariable UUID applicationId,
            @Valid @RequestBody UpdateApplicationStatusRequest request
    ) {

        return jobApplicationService.updateStatus(
                user.getId(),
                applicationId,
                request.status()
        );
    }

    @DeleteMapping("/{applicationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteApplication(
            @AuthenticationPrincipal User user,
            @PathVariable UUID applicationId
    ) {

        jobApplicationService.deleteApplication(
                user.getId(),
                applicationId
        );
    }
}