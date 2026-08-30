package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.common.exception.ResourceNotFoundException;
import com.careerforge.careerforge.resume.api.CreateResumeSkillRequest;
import com.careerforge.careerforge.resume.api.ResumeSkillResponse;
import com.careerforge.careerforge.resume.api.UpdateResumeSkillRequest;
import com.careerforge.careerforge.resume.domain.Resume;
import com.careerforge.careerforge.resume.domain.ResumeRepository;
import com.careerforge.careerforge.resume.domain.ResumeSkill;
import com.careerforge.careerforge.resume.domain.ResumeSkillRepository;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ResumeSkillService {

    private final ResumeRepository resumeRepository;
    private final ResumeSkillRepository skillRepository;
    private final UserRepository userRepository;

    public ResumeSkillService(
            ResumeRepository resumeRepository,
            ResumeSkillRepository skillRepository,
            UserRepository userRepository
    ) {
        this.resumeRepository = resumeRepository;
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResumeSkillResponse createSkill(
            UUID userId,
            UUID resumeId,
            CreateResumeSkillRequest request
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        String normalizedName = request.name().trim();

        if (skillRepository.existsByResumeAndNameIgnoreCase(
                resume,
                normalizedName
        )) {
            throw new IllegalArgumentException(
                    "This skill already exists in the resume"
            );
        }

        ResumeSkill skill = new ResumeSkill(
                resume,
                normalizedName,
                request.category(),
                request.proficiencyLevel(),
                request.displayOrder()
        );

        ResumeSkill savedSkill = skillRepository.save(skill);

        return toResponse(savedSkill);
    }

    @Transactional(readOnly = true)
    public List<ResumeSkillResponse> getSkills(
            UUID userId,
            UUID resumeId
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        return skillRepository
                .findAllByResumeOrderByDisplayOrderAsc(resume)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ResumeSkillResponse updateSkill(
            UUID userId,
            UUID resumeId,
            UUID skillId,
            UpdateResumeSkillRequest request
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeSkill skill = findSkill(skillId, resume);

        String normalizedName = request.name().trim();

        /*
         * Check duplicates only when changing the name.
         */
        if (!skill.getName().equalsIgnoreCase(normalizedName)
                && skillRepository.existsByResumeAndNameIgnoreCase(
                resume,
                normalizedName
        )) {

            throw new IllegalArgumentException(
                    "This skill already exists in the resume"
            );
        }

        skill.update(
                normalizedName,
                request.category(),
                request.proficiencyLevel(),
                request.displayOrder()
        );

        return toResponse(skill);
    }

    @Transactional
    public void deleteSkill(
            UUID userId,
            UUID resumeId,
            UUID skillId
    ) {
        User user = getUser(userId);
        Resume resume = findResume(resumeId, user);

        ResumeSkill skill = findSkill(skillId, resume);

        skillRepository.delete(skill);
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

    private ResumeSkill findSkill(
            UUID skillId,
            Resume resume
    ) {
        return skillRepository
                .findByIdAndResume(skillId, resume)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Resume skill not found"
                        )
                );
    }

    private ResumeSkillResponse toResponse(
            ResumeSkill skill
    ) {
        return new ResumeSkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getProficiencyLevel(),
                skill.getDisplayOrder()
        );
    }
}