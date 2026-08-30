package com.careerforge.careerforge.auth.application;

public class InvalidOtpException extends RuntimeException {

    public InvalidOtpException() {
        super("Invalid or expired OTP");
    }
}