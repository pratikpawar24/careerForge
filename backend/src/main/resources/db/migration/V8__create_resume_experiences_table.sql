CREATE TABLE resume_experiences (

                                    id UUID PRIMARY KEY,

                                    resume_id UUID NOT NULL,

                                    company_name VARCHAR(255) NOT NULL,

                                    job_title VARCHAR(255) NOT NULL,

                                    location VARCHAR(255),

                                    employment_type VARCHAR(50),

                                    start_date DATE NOT NULL,

                                    end_date DATE,

                                    currently_working BOOLEAN NOT NULL DEFAULT FALSE,

                                    description TEXT,

                                    display_order INTEGER NOT NULL DEFAULT 0,

                                    created_at TIMESTAMPTZ NOT NULL,
                                    updated_at TIMESTAMPTZ NOT NULL,

                                    CONSTRAINT fk_resume_experiences_resume
                                        FOREIGN KEY (resume_id)
                                            REFERENCES resumes(id)
                                            ON DELETE CASCADE,

                                    CONSTRAINT chk_resume_experience_dates
                                        CHECK (
                                            end_date IS NULL
                                                OR end_date >= start_date
                                            )
);

CREATE INDEX idx_resume_experiences_resume_id
    ON resume_experiences(resume_id);