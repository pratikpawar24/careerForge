CREATE TABLE resume_projects (

                                 id UUID PRIMARY KEY,

                                 resume_id UUID NOT NULL,

                                 name VARCHAR(255) NOT NULL,

                                 description TEXT,

                                 technologies VARCHAR(1000),

                                 project_url VARCHAR(500),

                                 repository_url VARCHAR(500),

                                 start_date DATE,

                                 end_date DATE,

                                 currently_working BOOLEAN NOT NULL DEFAULT FALSE,

                                 display_order INTEGER NOT NULL DEFAULT 0,

                                 created_at TIMESTAMPTZ NOT NULL,
                                 updated_at TIMESTAMPTZ NOT NULL,

                                 CONSTRAINT fk_resume_projects_resume
                                     FOREIGN KEY (resume_id)
                                         REFERENCES resumes(id)
                                         ON DELETE CASCADE,

                                 CONSTRAINT chk_resume_project_dates
                                     CHECK (
                                         start_date IS NULL
                                             OR end_date IS NULL
                                             OR end_date >= start_date
                                         )
);

CREATE INDEX idx_resume_projects_resume_id
    ON resume_projects(resume_id);