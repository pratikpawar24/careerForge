CREATE TABLE resumes (

                         id UUID PRIMARY KEY,

                         user_id UUID NOT NULL,

                         name VARCHAR(255) NOT NULL,

                         is_default BOOLEAN NOT NULL DEFAULT FALSE,

                         created_at TIMESTAMPTZ NOT NULL,
                         updated_at TIMESTAMPTZ NOT NULL,

                         CONSTRAINT fk_resumes_user
                             FOREIGN KEY (user_id)
                                 REFERENCES users(id)
                                 ON DELETE CASCADE
);

CREATE INDEX idx_resumes_user_id
    ON resumes(user_id);