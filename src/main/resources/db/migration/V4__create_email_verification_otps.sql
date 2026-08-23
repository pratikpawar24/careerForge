CREATE TABLE email_verification_otps (
                                         id UUID PRIMARY KEY,
                                         user_id UUID NOT NULL,

                                         otp_hash VARCHAR(255) NOT NULL,

                                         expires_at TIMESTAMPTZ NOT NULL,
                                         verified_at TIMESTAMPTZ,
                                         invalidated_at TIMESTAMPTZ,

                                         attempt_count INTEGER NOT NULL DEFAULT 0,

                                         created_at TIMESTAMPTZ NOT NULL,

                                         CONSTRAINT fk_email_verification_otps_user
                                             FOREIGN KEY (user_id)
                                                 REFERENCES users(id)
                                                 ON DELETE CASCADE
);

CREATE INDEX idx_email_verification_otps_user_id
    ON email_verification_otps(user_id);