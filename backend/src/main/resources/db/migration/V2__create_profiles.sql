CREATE TABLE profiles (
                          id UUID PRIMARY KEY,
                          user_id UUID NOT NULL UNIQUE,

                          full_name VARCHAR(255),
                          phone_number VARCHAR(50),
                          location VARCHAR(255),
                          headline VARCHAR(500),
                          current_role_name VARCHAR(255),
                          linkedin_url VARCHAR(500),
                          portfolio_url VARCHAR(500),

                          created_at TIMESTAMPTZ NOT NULL,
                          updated_at TIMESTAMPTZ NOT NULL,

                          CONSTRAINT fk_profiles_user
                              FOREIGN KEY (user_id)
                                  REFERENCES users(id)
                                  ON DELETE CASCADE
);