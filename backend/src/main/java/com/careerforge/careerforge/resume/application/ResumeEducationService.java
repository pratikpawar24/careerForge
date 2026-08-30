package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.common.exception.ResourceNotFoundException;
import com.careerforge.careerforge.resume.api.CreateResumeEducationRequest;
import com.careerforge.careerforge.resume.api.ResumeEducationResponse;
import com.careerforge.careerforge.resume.api.UpdateResumeEducationRequest;
import com.careerforge.careerforge.resume.domain.Resume;
import com.careerforge.careerforge.resume.domain.ResumeEducation;
import com.careerforge.careerforge.resume.domain.ResumeEducationRepository;
import com.careerforge.careerforge.resume.domain.ResumeRepository;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeEducationService {

    private final ResumeRepository resumeRepository;
    private final ResumeEducationRepository educationRepository;
    private final UserRepository userRepository;

    public ResumeEducationService(
            ResumeRepository resumeRepository,
            ResumeEducationRepository educationRepository,
            UserRepository userRepository
    ) {
        this.resumeRepository = resumeRepository;
        this.educationRepository = educationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResumeEducationResponse createEducation(
            UUID userId,
            UUID resumeId,
            CreateResumeEducationRequest request
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        validateDates(
                request.startDate(),
                request.endDate()
        );

        ResumeEducation education = new ResumeEducation(
                resume,
                request.institutionName(),
                request.degree(),
                request.fieldOfStudy(),
                request.location(),
                request.startDate(),
                request.endDate(),
                request.currentlyStudying(),
                request.grade(),
                request.description(),
                request.displayOrder()
        );

        ResumeEducation savedEducation =
                educationRepository.save(education);

        return toResponse(savedEducation);
    }

    @Transactional(readOnly = true)
    public List<ResumeEducationResponse> getEducations(
            UUID userId,
            UUID resumeId
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        return educationRepository
                .findAllByResumeOrderByDisplayOrderAsc(resume)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ResumeEducationResponse updateEducation(
            UUID userId,
            UUID resumeId,
            UUID educationId,
            UpdateResumeEducationRequest request
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeEducation education =
                findEducation(educationId, resume);

        validateDates(
                request.startDate(),
                request.endDate()
        );

        education.update(
                request.institutionName(),
                request.degree(),
                request.fieldOfStudy(),
                request.location(),
                request.startDate(),
                request.endDate(),
                request.currentlyStudying(),
                request.grade(),
                request.description(),
                request.displayOrder()
        );

        return toResponse(education);
    }

    @Transactional
    public void deleteEducation(
            UUID userId,
            UUID resumeId,
            UUID educationId
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeEducation education =
                findEducation(educationId, resume);

        educationRepository.delete(education);
    }

    private void validateDates(
            LocalDate startDate,
            LocalDate endDate
    ) {
        if (startDate != null
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
        return resumeRepository
                .findByIdAndUser(resumeId, user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found")
                );
    }

    private ResumeEducation findEducation(
            UUID educationId,
            Resume resume
    ) {
        return educationRepository
                .findByIdAndResume(educationId, resume)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resume education not found"
                        )
                );
    }

    private ResumeEducationResponse toResponse(
            ResumeEducation education
    ) {
        return new ResumeEducationResponse(
                education.getId(),
                education.getInstitutionName(),
                education.getDegree(),
                education.getFieldOfStudy(),
                education.getLocation(),
                education.getStartDate(),
                education.getEndDate(),
                education.isCurrentlyStudying(),
                education.getGrade(),
                education.getDescription(),
                education.getDisplayOrder()
        );
    }
}