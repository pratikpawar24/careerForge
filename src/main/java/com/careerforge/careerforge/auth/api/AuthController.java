package com.careerforge.careerforge.auth.api;


import com.careerforge.careerforge.auth.api.ResendOtpRequest;
import com.careerforge.careerforge.auth.api.ResendOtpResponse;
import com.careerforge.careerforge.auth.application.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/verify-email")
    public void verifyEmail(
            @Valid @RequestBody VerifyOtpRequest request
    ) {
        authService.verifyEmail(request);

    }

    @PostMapping("/resend-otp")
    public ResendOtpResponse resendOtp(
            @Valid @RequestBody ResendOtpRequest request
    ) {
        return authService.resendOtp(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }
}