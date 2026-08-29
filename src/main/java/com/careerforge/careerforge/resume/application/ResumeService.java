package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.resume.domain.ResumeTemplate;
import com.careerforge.careerforge.resume.api.FullResumeResponse;
import com.careerforge.careerforge.resume.api.ResumeEducationResponse;
import com.careerforge.careerforge.resume.api.ResumeExperienceResponse;
import com.careerforge.careerforge.resume.api.ResumeProjectResponse;
import com.careerforge.careerforge.resume.api.ResumeSkillResponse;
import com.careerforge.careerforge.resume.domain.ResumeExperienceRepository;
import com.careerforge.careerforge.resume.domain.ResumeEducationRepository;
import com.careerforge.careerforge.resume.domain.ResumeSkillRepository;
import com.careerforge.careerforge.resume.domain.ResumeProjectRepository;
import com.careerforge.careerforge.common.exception.ResourceNotFoundException;
import com.careerforge.careerforge.resume.api.CreateResumeRequest;
import com.careerforge.careerforge.resume.api.ResumeResponse;
import com.careerforge.careerforge.resume.api.UpdateResumeRequest;
import com.careerforge.careerforge.resume.domain.Resume;
import com.careerforge.careerforge.resume.domain.ResumeRepository;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRenderer resumeRenderer;
    private final ResumeExperienceRepository experienceRepository;
    private final ResumeEducationRepository educationRepository;
    private final ResumeSkillRepository skillRepository;
    private final ResumeProjectRepository projectRepository;

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository,
            ResumeExperienceRepository experienceRepository,
            ResumeEducationRepository educationRepository,
            ResumeSkillRepository skillRepository,
            ResumeProjectRepository projectRepository,
            ResumeRenderer resumeRenderer
    ) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.resumeRenderer = resumeRenderer;
    }

    @Transactional
    public ResumeResponse createResume(
            UUID userId,
            CreateResumeRequest request
    ) {

        User user = getUser(userId);

        boolean shouldBeDefault = resumeRepository
                .findByUserAndIsDefaultTrue(user)
                .isEmpty();

        Resume resume = new Resume(
                user,
                request.name(),
                shouldBeDefault
        );

        Resume savedResume = resumeRepository.save(resume);

        return toResponse(savedResume);
    }

    @Transactional(readOnly = true)
    public List<ResumeResponse> getMyResumes(UUID userId) {

        User user = getUser(userId);

        return resumeRepository
                .findAllByUserOrderByUpdatedAtDesc(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ResumeResponse getMyResume(
            UUID userId,
            UUID resumeId
    ) {

        User user = getUser(userId);

        return toResponse(findResume(resumeId, user));
    }

    @Transactional
    public ResumeResponse updateResume(
            UUID userId,
            UUID resumeId,
            UpdateResumeRequest request
    ) {

        User user = getUser(userId);

        Resume resume = findResume(resumeId, user);

        resume.updateName(request.name());

        return toResponse(resume);
    }

    @Transactional
    public ResumeResponse setDefaultResume(
            UUID userId,
            UUID resumeId
    ) {

        User user = getUser(userId);

        Resume newDefaultResume = findResume(resumeId, user);

        resumeRepository
                .findByUserAndIsDefaultTrue(user)
                .ifPresent(currentDefault -> {

                    if (!currentDefault.getId()
                            .equals(newDefaultResume.getId())) {

                        currentDefault.setDefault(false);
                    }
                });

        newDefaultResume.setDefault(true);

        return toResponse(newDefaultResume);
    }

    @Transactional
    public void deleteResume(
            UUID userId,
            UUID resumeId
    ) {

        User user = getUser(userId);

        Resume resume = findResume(resumeId, user);

        boolean wasDefault = resume.isDefault();

        resumeRepository.delete(resume);

        // If the deleted resume was the default,
        // make another remaining resume the default.
        if (wasDefault) {

            resumeRepository
                    .findAllByUserOrderByUpdatedAtDesc(user)
                    .stream()
                    .findFirst()
                    .ifPresent(nextResume ->
                            nextResume.setDefault(true)
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

    private ResumeResponse toResponse(Resume resume) {

        return new ResumeResponse(
                resume.getId(),
                resume.getName(),
                resume.isDefault(),
                resume.getCreatedAt(),
                resume.getUpdatedAt()
        );
    }

    @Transactional(readOnly = true)
    public FullResumeResponse getFullResume(
            UUID userId,
            UUID resumeId
    ) {

        User user = getUser(userId);

        Resume resume = findResume(resumeId, user);

        List<ResumeExperienceResponse> experiences =
                experienceRepository
                        .findAllByResumeOrderByDisplayOrderAsc(resume)
                        .stream()
                        .map(experience ->
                                new ResumeExperienceResponse(
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
                                )
                        )
                        .toList();

        List<ResumeEducationResponse> educations =
                educationRepository
                        .findAllByResumeOrderByDisplayOrderAsc(resume)
                        .stream()
                        .map(education ->
                                new ResumeEducationResponse(
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
                                )
                        )
                        .toList();

        List<ResumeSkillResponse> skills =
                skillRepository
                        .findAllByResumeOrderByDisplayOrderAsc(resume)
                        .stream()
                        .map(skill ->
                                new ResumeSkillResponse(
                                        skill.getId(),
                                        skill.getName(),
                                        skill.getCategory(),
                                        skill.getProficiencyLevel(),
                                        skill.getDisplayOrder()
                                )
                        )
                        .toList();

        List<ResumeProjectResponse> projects =
                projectRepository
                        .findAllByResumeOrderByDisplayOrderAsc(resume)
                        .stream()
                        .map(project ->
                                new ResumeProjectResponse(
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
                                )
                        )
                        .toList();

        return new FullResumeResponse(
                resume.getId(),
                resume.getName(),
                resume.isDefault(),
                experiences,
                educations,
                skills,
                projects
        );
    }
    @Transactional(readOnly = true)
    public String previewResume(
            UUID userId,
            UUID resumeId
    ) {
        FullResumeResponse resume =
                getFullResume(userId, resumeId);

        return resumeRenderer.render(
                resume,
                ResumeTemplate.CLASSIC
        );
    }
}