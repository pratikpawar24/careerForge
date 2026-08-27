package com.careerforge.careerforge.resume.application;

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

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository
    ) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
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
}