CREATE TABLE resume_educations (

                                   id UUID PRIMARY KEY,

                                   resume_id UUID NOT NULL,

                                   institution_name VARCHAR(255) NOT NULL,

                                   degree VARCHAR(255) NOT NULL,

                                   field_of_study VARCHAR(255),

                                   location VARCHAR(255),

                                   start_date DATE,

                                   end_date DATE,

                                   currently_studying BOOLEAN NOT NULL DEFAULT FALSE,

                                   grade VARCHAR(100),

                                   description TEXT,

                                   display_order INTEGER NOT NULL DEFAULT 0,

                                   created_at TIMESTAMPTZ NOT NULL,
                                   updated_at TIMESTAMPTZ NOT NULL,

                                   CONSTRAINT fk_resume_educations_resume
                                       FOREIGN KEY (resume_id)
                                           REFERENCES resumes(id)
                                           ON DELETE CASCADE,

                                   CONSTRAINT chk_resume_education_dates
                                       CHECK (
                                           start_date IS NULL
                                               OR end_date IS NULL
                                               OR end_date >= start_date
                                           )
);

CREATE INDEX idx_resume_educations_resume_id
    ON resume_educations(resume_id);