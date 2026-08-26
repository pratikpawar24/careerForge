CREATE TABLE application_status_history (

                                            id UUID PRIMARY KEY,

                                            job_application_id UUID NOT NULL,

                                            status VARCHAR(50) NOT NULL,

                                            changed_at TIMESTAMPTZ NOT NULL,

                                            CONSTRAINT fk_application_status_history_job_application
                                                FOREIGN KEY (job_application_id)
                                                    REFERENCES job_applications(id)
                                                    ON DELETE CASCADE
);

CREATE INDEX idx_application_status_history_application_id
    ON application_status_history(job_application_id);