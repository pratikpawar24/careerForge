CREATE TABLE resume_skills (

                               id UUID PRIMARY KEY,

                               resume_id UUID NOT NULL,

                               name VARCHAR(100) NOT NULL,

                               category VARCHAR(100),

                               proficiency_level VARCHAR(50),

                               display_order INTEGER NOT NULL DEFAULT 0,

                               created_at TIMESTAMPTZ NOT NULL,
                               updated_at TIMESTAMPTZ NOT NULL,

                               CONSTRAINT fk_resume_skills_resume
                                   FOREIGN KEY (resume_id)
                                       REFERENCES resumes(id)
                                       ON DELETE CASCADE
);

CREATE INDEX idx_resume_skills_resume_id
    ON resume_skills(resume_id);

CREATE UNIQUE INDEX uq_resume_skills_resume_name
    ON resume_skills(resume_id, LOWER(name));