package com.careerforge.careerforge.auth.application;




import com.careerforge.careerforge.auth.api.RegisterRequest;
import com.careerforge.careerforge.auth.api.RegisterResponse;
import com.careerforge.careerforge.auth.api.VerifyOtpRequest;
import com.careerforge.careerforge.auth.domain.EmailVerificationOtp;
import com.careerforge.careerforge.auth.domain.EmailVerificationOtpRepository;
import com.careerforge.careerforge.profile.domain.Profile;
import com.careerforge.careerforge.profile.domain.ProfileRepository;
import com.careerforge.careerforge.user.domain.User;
import com.careerforge.careerforge.user.domain.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class AuthService {

    private static final Duration OTP_EXPIRY = Duration.ofMinutes(10);

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final EmailVerificationOtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            ProfileRepository profileRepository,
            EmailVerificationOtpRepository otpRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }
    @Transactional
    public void verifyEmail(VerifyOtpRequest request) {

        String email = request.email().trim().toLowerCase(Locale.ROOT);

        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        if (user.isEmailVerified()) {
            return;
        }

        EmailVerificationOtp otpRecord = otpRepository
                .findTopByUserAndVerifiedAtIsNullAndInvalidatedAtIsNullAndExpiresAtAfterOrderByCreatedAtDesc(
                        user,
                        Instant.now()
                )
                .orElseThrow(InvalidOtpException::new);

        otpRecord.incrementAttemptCount();

        boolean otpMatches = passwordEncoder.matches(
                request.otp(),
                otpRecord.getOtpHash()
        );

        if (!otpMatches) {
            throw new InvalidOtpException();
        }

        otpRecord.markAsVerified();
        user.markEmailAsVerified();
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        String email = request.email().trim().toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException(email);
        }

        String passwordHash = passwordEncoder.encode(request.password());

        User user = new User(email, passwordHash);
        User savedUser = userRepository.save(user);

        Profile profile = new Profile(savedUser);
        profileRepository.save(profile);

        String otp = generateOtp();
        String otpHash = passwordEncoder.encode(otp);

        EmailVerificationOtp emailVerificationOtp =
                new EmailVerificationOtp(
                        savedUser,
                        otpHash,
                        Instant.now().plus(OTP_EXPIRY)
                );

        otpRepository.save(emailVerificationOtp);
        emailService.sendVerificationOtp(
                savedUser.getEmail(),
                otp
        );


        /*
         * TEMPORARY:
         * Brevo SMTP is not connected yet.
         *
         * Next step:
         * Send `otp` to savedUser.getEmail().
         */

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                "Verification OTP sent to your email"
        );
    }

    private String generateOtp() {
        int otp = ThreadLocalRandom.current().nextInt(100000, 1_000_000);
        return String.valueOf(otp);
    }
}