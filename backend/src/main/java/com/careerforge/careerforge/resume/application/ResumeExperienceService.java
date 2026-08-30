package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.common.exception.ResourceNotFoundException;
import com.careerforge.careerforge.resume.api.CreateResumeExperienceRequest;
import com.careerforge.careerforge.resume.api.ResumeExperienceResponse;
import com.careerforge.careerforge.resume.api.UpdateResumeExperienceRequest;
import com.careerforge.careerforge.resume.domain.Resume;
import com.careerforge.careerforge.resume.domain.ResumeExperience;
import com.careerforge.careerforge.resume.domain.ResumeExperienceRepository;
import com.careerforge.careerforge.resume.domain.ResumeRepository;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeExperienceService {

    private final ResumeRepository resumeRepository;
    private final ResumeExperienceRepository experienceRepository;
    private final UserRepository userRepository;

    public ResumeExperienceService(
            ResumeRepository resumeRepository,
            ResumeExperienceRepository experienceRepository,
            UserRepository userRepository
    ) {
        this.resumeRepository = resumeRepository;
        this.experienceRepository = experienceRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResumeExperienceResponse createExperience(
            UUID userId,
            UUID resumeId,
            CreateResumeExperienceRequest request
    ) {

        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        validateDates(
                request.startDate(),
                request.endDate(),
                request.currentlyWorking()
        );

        ResumeExperience experience = new ResumeExperience(
                resume,
                request.companyName(),
                request.jobTitle(),
                request.location(),
                request.employmentType(),
                request.startDate(),
                request.endDate(),
                request.currentlyWorking(),
                request.description(),
                request.displayOrder()
        );

        ResumeExperience savedExperience =
                experienceRepository.save(experience);

        return toResponse(savedExperience);
    }

    @Transactional(readOnly = true)
    public List<ResumeExperienceResponse> getExperiences(
            UUID userId,
            UUID resumeId
    ) {

        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        return experienceRepository
                .findAllByResumeOrderByDisplayOrderAsc(resume)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ResumeExperienceResponse updateExperience(
            UUID userId,
            UUID resumeId,
            UUID experienceId,
            UpdateResumeExperienceRequest request
    ) {

        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeExperience experience =
                findExperience(experienceId, resume);

        validateDates(
                request.startDate(),
                request.endDate(),
                request.currentlyWorking()
        );

        experience.update(
                request.companyName(),
                request.jobTitle(),
                request.location(),
                request.employmentType(),
                request.startDate(),
                request.endDate(),
                request.currentlyWorking(),
                request.description(),
                request.displayOrder()
        );

        return toResponse(experience);
    }

    @Transactional
    public void deleteExperience(
            UUID userId,
            UUID resumeId,
            UUID experienceId
    ) {

        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeExperience experience =
                findExperience(experienceId, resume);

        experienceRepository.delete(experience);
    }

    private void validateDates(
            LocalDate startDate,
            LocalDate endDate,
            boolean currentlyWorking
    ) {

        if (!currentlyWorking
                && endDate == null) {

            throw new IllegalArgumentException(
                    "End date is required when not currently working"
            );
        }

        if (endDate != null
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

        return resumeRepository
                .findByIdAndUser(resumeId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found")
                );
    }

    private ResumeExperience findExperience(
            UUID experienceId,
            Resume resume
    ) {

        return experienceRepository
                .findByIdAndResume(experienceId, resume)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resume experience not found"
                        )
                );
    }

    private ResumeExperienceResponse toResponse(
            ResumeExperience experience
    ) {

        return new ResumeExperienceResponse(
                experience.getId(),
                experience.getCompanyName(),
                experience.getJobTitle(),
                experience.getLocation(),
                experience.getEmploymentType(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.isCurrentlyWorking(),
                experience.getDescription(),
                experience.getDisplayOrder()
        );
    }
}