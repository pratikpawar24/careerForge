package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.resume.api.FullResumeResponse;
import com.careerforge.careerforge.resume.domain.ResumeTemplate;

public interface ResumeRenderer {

    String render(FullResumeResponse resume);

    ResumeTemplate getTemplate();
}