package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.resume.domain.ResumeTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResumeRendererResolver {

    private final List<ResumeRenderer> renderers;

    public ResumeRendererResolver(
            List<ResumeRenderer> renderers
    ) {
        this.renderers = renderers;
    }

    public ResumeRenderer resolve(
            ResumeTemplate template
    ) {

        return renderers.stream()
                .filter(renderer ->
                        renderer.getTemplate() == template
                )
                .findFirst()
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Unsupported resume template: "
                                        + template
                        )
                );
    }
}