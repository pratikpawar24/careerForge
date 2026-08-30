package com.careerforge.careerforge.job.application;

import com.careerforge.careerforge.common.exception.ResourceNotFoundException;
import com.careerforge.careerforge.job.api.ApplicationStatusHistoryResponse;
import com.careerforge.careerforge.job.api.JobApplicationRequest;
import com.careerforge.careerforge.job.api.JobApplicationResponse;
import com.careerforge.careerforge.job.domain.*;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class JobApplicationService {

    private final ApplicationStatusHistoryRepository
            applicationStatusHistoryRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplicationService(
            JobApplicationRepository jobApplicationRepository,
            UserRepository userRepository,
            ApplicationStatusHistoryRepository applicationStatusHistoryRepository
    ) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.applicationStatusHistoryRepository =
                applicationStatusHistoryRepository;
    }

    @Transactional
    public JobApplicationResponse createApplication(
            UUID userId,
            JobApplicationRequest request
    ) {

        User user = getUser(userId);

        JobApplication application = new JobApplication(
                user,
                request.companyName(),
                request.jobTitle(),
                request.jobUrl(),
                request.applicationSource(),
                request.status(),
                request.appliedAt(),
                request.notes()
        );

        JobApplication savedApplication =
                jobApplicationRepository.save(application);
        ApplicationStatusHistory history =
                new ApplicationStatusHistory(
                        savedApplication,
                        savedApplication.getStatus()
                );

        applicationStatusHistoryRepository.save(history);

        return toResponse(savedApplication);
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getMyApplications(UUID userId) {

        User user = getUser(userId);

        return jobApplicationRepository
                .findAllByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public JobApplicationResponse getMyApplication(
            UUID userId,
            UUID applicationId
    ) {

        User user = getUser(userId);

        JobApplication application =
                findApplication(applicationId, user);

        return toResponse(application);
    }

    @Transactional
    public JobApplicationResponse updateApplication(
            UUID userId,
            UUID applicationId,
            JobApplicationRequest request
    ) {

        User user = getUser(userId);

        JobApplication application =
                findApplication(applicationId, user);

        ApplicationStatus oldStatus = application.getStatus();

        application.update(
                request.companyName(),
                request.jobTitle(),
                request.jobUrl(),
                request.applicationSource(),
                request.status(),
                request.appliedAt(),
                request.notes()
        );

        if (oldStatus != request.status()) {

            ApplicationStatusHistory history =
                    new ApplicationStatusHistory(
                            application,
                            request.status()
                    );

            applicationStatusHistoryRepository.save(history);
        }

        return toResponse(application);
    }

    @Transactional
    public JobApplicationResponse updateStatus(
            UUID userId,
            UUID applicationId,
            ApplicationStatus status
    ) {

        User user = getUser(userId);

        JobApplication application =
                findApplication(applicationId, user);

        if (application.getStatus() != status) {

            application.updateStatus(status);

            ApplicationStatusHistory history =
                    new ApplicationStatusHistory(
                            application,
                            status
                    );

            applicationStatusHistoryRepository.save(history);
        }

        return toResponse(application);
    }

    @Transactional
    public void deleteApplication(
            UUID userId,
            UUID applicationId
    ) {

        User user = getUser(userId);

        JobApplication application =
                findApplication(applicationId, user);

        jobApplicationRepository.delete(application);
    }

    private User getUser(UUID userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );
    }

    private JobApplication findApplication(
            UUID applicationId,
            User user
    ) {

        return jobApplicationRepository
                .findByIdAndUser(applicationId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job application not found"
                        )
                );
    }

    private JobApplicationResponse toResponse(
            JobApplication application
    ) {

        return new JobApplicationResponse(
                application.getId(),
                application.getCompanyName(),
                application.getJobTitle(),
                application.getJobUrl(),
                application.getApplicationSource(),
                application.getStatus(),
                application.getAppliedAt(),
                application.getNotes(),
                application.getCreatedAt(),
                application.getUpdatedAt()
        );
    }
    @Transactional(readOnly = true)
    public List<ApplicationStatusHistoryResponse> getStatusHistory(
            UUID userId,
            UUID applicationId
    ) {

        User user = getUser(userId);

        JobApplication application =
                findApplication(applicationId, user);

        return applicationStatusHistoryRepository
                .findAllByJobApplicationOrderByChangedAtAsc(application)
                .stream()
                .map(history ->
                        new ApplicationStatusHistoryResponse(
                                history.getId(),
                                history.getStatus(),
                                history.getChangedAt()
                        )
                )
                .toList();
    }
}