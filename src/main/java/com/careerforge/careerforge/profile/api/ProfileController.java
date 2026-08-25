package com.careerforge.careerforge.profile.api;

import com.careerforge.careerforge.profile.application.ProfileService;
import com.careerforge.careerforge.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse getMyProfile(
            @AuthenticationPrincipal User user
    ) {
        return profileService.getMyProfile(user.getId());
    }

    @PutMapping
    public ProfileResponse saveMyProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ProfileRequest request
    ) {
        return profileService.saveMyProfile(
                user.getId(),
                request
        );
    }
}