package com.careerforge.careerforge.profile.application;

import com.careerforge.careerforge.profile.api.ProfileRequest;
import com.careerforge.careerforge.profile.api.ProfileResponse;
import com.careerforge.careerforge.profile.domain.Profile;
import com.careerforge.careerforge.profile.domain.ProfileRepository;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(
            ProfileRepository profileRepository,
            UserRepository userRepository
    ) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public ProfileResponse getMyProfile(UUID userId) {

        Profile profile = profileRepository.findByUser(
                getUser(userId)
        ).orElseThrow(() ->
                new RuntimeException("Profile not found")
        );

        return toResponse(profile);
    }

    @Transactional
    public ProfileResponse saveMyProfile(
            UUID userId,
            ProfileRequest request
    ) {

        User user = getUser(userId);

        Profile profile = profileRepository.findByUser(user)
                .orElseGet(() -> new Profile(user));

        profile.update(
                request.fullName(),
                request.phoneNumber(),
                request.location(),
                request.headline(),
                request.currentRoleName(),
                request.linkedinUrl(),
                request.portfolioUrl()
        );

        Profile savedProfile = profileRepository.save(profile);

        return toResponse(savedProfile);
    }

    private User getUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }

    private ProfileResponse toResponse(Profile profile) {

        return new ProfileResponse(
                profile.getId(),
                profile.getFullName(),
                profile.getPhoneNumber(),
                profile.getLocation(),
                profile.getHeadline(),
                profile.getCurrentRoleName(),
                profile.getLinkedinUrl(),
                profile.getPortfolioUrl(),
                profile.getCreatedAt(),
                profile.getUpdatedAt()
        );
    }
}