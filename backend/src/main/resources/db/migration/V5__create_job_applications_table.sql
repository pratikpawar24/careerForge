CREATE TABLE job_applications (

                                  id UUID PRIMARY KEY,

                                  user_id UUID NOT NULL,

                                  company_name VARCHAR(255) NOT NULL,
                                  job_title VARCHAR(255) NOT NULL,
                                  job_url VARCHAR(1000),

                                  application_source VARCHAR(50) NOT NULL,
                                  status VARCHAR(50) NOT NULL,

                                  applied_at TIMESTAMPTZ,
                                  notes TEXT,

                                  created_at TIMESTAMPTZ NOT NULL,
                                  updated_at TIMESTAMPTZ NOT NULL,

                                  CONSTRAINT fk_job_applications_user
                                      FOREIGN KEY (user_id)
                                          REFERENCES users(id)
                                          ON DELETE CASCADE
);

CREATE INDEX idx_job_applications_user_id
    ON job_applications(user_id);

CREATE INDEX idx_job_applications_user_status
    ON job_applications(user_id, status);