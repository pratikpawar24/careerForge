package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.common.exception.ResourceNotFoundException;
import com.careerforge.careerforge.resume.api.CreateResumeProjectRequest;
import com.careerforge.careerforge.resume.api.ResumeProjectResponse;
import com.careerforge.careerforge.resume.api.UpdateResumeProjectRequest;
import com.careerforge.careerforge.resume.domain.Resume;
import com.careerforge.careerforge.resume.domain.ResumeProject;
import com.careerforge.careerforge.resume.domain.ResumeProjectRepository;
import com.careerforge.careerforge.resume.domain.ResumeRepository;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ResumeProjectService {

    private final ResumeRepository resumeRepository;
    private final ResumeProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ResumeProjectService(
            ResumeRepository resumeRepository,
            ResumeProjectRepository projectRepository,
            UserRepository userRepository
    ) {
        this.resumeRepository = resumeRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResumeProjectResponse createProject(
            UUID userId,
            UUID resumeId,
            CreateResumeProjectRequest request
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        validateDates(
                request.startDate(),
                request.endDate(),
                request.currentlyWorking()
        );

        ResumeProject project = new ResumeProject(
                resume,
                request.name().trim(),
                request.description(),
                request.technologies(),
                request.projectUrl(),
                request.repositoryUrl(),
                request.startDate(),
                request.endDate(),
                request.currentlyWorking(),
                request.displayOrder()
        );

        ResumeProject savedProject = projectRepository.save(project);

        return toResponse(savedProject);
    }

    @Transactional(readOnly = true)
    public List<ResumeProjectResponse> getProjects(
            UUID userId,
            UUID resumeId
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        return projectRepository
                .findAllByResumeOrderByDisplayOrderAsc(resume)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ResumeProjectResponse updateProject(
            UUID userId,
            UUID resumeId,
            UUID projectId,
            UpdateResumeProjectRequest request
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeProject project = findProject(projectId, resume);

        validateDates(
                request.startDate(),
                request.endDate(),
                request.currentlyWorking()
        );

        project.update(
                request.name().trim(),
                request.description(),
                request.technologies(),
                request.projectUrl(),
                request.repositoryUrl(),
                request.startDate(),
                request.endDate(),
                request.currentlyWorking(),
                request.displayOrder()
        );

        return toResponse(project);
    }

    @Transactional
    public void deleteProject(
            UUID userId,
            UUID resumeId,
            UUID projectId
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeProject project = findProject(projectId, resume);

        projectRepository.delete(project);
    }

    private void validateDates(
            java.time.LocalDate startDate,
            java.time.LocalDate endDate,
            boolean currentlyWorking
    ) {
        if (currentlyWorking && endDate != null) {
            throw new IllegalArgumentException(
                    "End date must be null for a currently working project"
            );
        }

        if (!currentlyWorking
                && startDate != null
                && endDate != null
                && endDate.isBefore(startDate)) {

            throw new IllegalArgumentException(
                    "End date cannot be before start date"
            );
        }
    }

    private User getUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );
    }

    private Resume findResume(
            UUID resumeId,
            User user
    ) {
        return resumeRepository.findByIdAndUser(resumeId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found")
                );
    }

    private ResumeProject findProject(
            UUID projectId,
            Resume resume
    ) {
        return projectRepository.findByIdAndResume(projectId, resume)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resume project not found"
                        )
                );
    }

    private ResumeProjectResponse toResponse(
            ResumeProject project
    ) {
        return new ResumeProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getTechnologies(),
                project.getProjectUrl(),
                project.getRepositoryUrl(),
                project.getStartDate(),
                project.getEndDate(),
                project.isCurrentlyWorking(),
                project.getDisplayOrder()
        );
    }
}