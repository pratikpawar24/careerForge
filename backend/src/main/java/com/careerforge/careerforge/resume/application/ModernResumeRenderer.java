package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.resume.api.FullResumeResponse;
import com.careerforge.careerforge.resume.api.ResumeEducationResponse;
import com.careerforge.careerforge.resume.api.ResumeExperienceResponse;
import com.careerforge.careerforge.resume.api.ResumeProjectResponse;
import com.careerforge.careerforge.resume.api.ResumeSkillResponse;
import com.careerforge.careerforge.resume.domain.ResumeTemplate;
import org.springframework.stereotype.Component;

@Component
public class ModernResumeRenderer implements ResumeRenderer {

    @Override
    public ResumeTemplate getTemplate() {
        return ResumeTemplate.MODERN;
    }

    @Override
    public String render(FullResumeResponse resume) {

        StringBuilder html = new StringBuilder();

        html.append("""
                <!DOCTYPE html>
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta charset="UTF-8" />
                    <title>
                """);

        html.append(escape(resume.name()));

        html.append("""
                    </title>

                    <style>

                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background: white;
                            color: #222;
                        }

                        .container {
                            max-width: 850px;
                            margin: 0 auto;
                            padding: 40px;
                        }

                        .header {
                            padding-bottom: 20px;
                            border-bottom: 3px solid #222;
                            margin-bottom: 25px;
                        }

                        .name {
                            font-size: 32px;
                            font-weight: bold;
                            margin-bottom: 5px;
                        }

                        .section {
                            margin-top: 25px;
                        }

                        .section-title {
                            font-size: 18px;
                            font-weight: bold;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            margin-bottom: 12px;
                            border-bottom: 1px solid #999;
                            padding-bottom: 4px;
                        }

                        .item {
                            margin-bottom: 18px;
                        }

                        .item-title {
                            font-size: 15px;
                            font-weight: bold;
                        }

                        .item-subtitle {
                            font-size: 13px;
                            margin-top: 3px;
                        }

                        .muted {
                            font-size: 12px;
                            color: #666;
                        }

                        .description {
                            margin-top: 6px;
                            font-size: 13px;
                        }

                        .skills {
                            font-size: 13px;
                        }

                    </style>
                </head>

                <body>
                    <div class="container">
                """);

        html.append("""
                <div class="header">
                    <div class="name">
                """);

        html.append(escape(resume.name()));

        html.append("""
                    </div>
                </div>
                """);

        renderExperience(html, resume);
        renderEducation(html, resume);
        renderSkills(html, resume);
        renderProjects(html, resume);

        html.append("""
                    </div>
                </body>
                </html>
                """);

        return html.toString();
    }

    private void renderExperience(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.experiences().isEmpty()) {
            return;
        }

        html.append("""
                <div class="section">
                    <div class="section-title">Experience</div>
                """);

        for (ResumeExperienceResponse experience :
                resume.experiences()) {

            html.append("""
                    <div class="item">
                        <div class="item-title">
                """);

            html.append(escape(experience.jobTitle()));

            html.append("""
                        </div>
                        <div class="item-subtitle">
                """);

            html.append(escape(experience.companyName()));

            if (experience.location() != null) {
                html.append(" — ")
                        .append(escape(experience.location()));
            }

            html.append("""
                        </div>
                        <div class="muted">
                """);

            if (experience.startDate() != null) {
                html.append(experience.startDate());
            }

            html.append(" — ");

            if (experience.currentlyWorking()) {
                html.append("Present");
            } else if (experience.endDate() != null) {
                html.append(experience.endDate());
            }

            html.append("""
                        </div>
                """);

            if (experience.description() != null) {
                html.append("""
                        <div class="description">
                    """)
                        .append(escape(experience.description()))
                        .append("""
                        </div>
                        """);
            }

            html.append("</div>");
        }

        html.append("</div>");
    }

    private void renderEducation(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.educations().isEmpty()) {
            return;
        }

        html.append("""
                <div class="section">
                    <div class="section-title">Education</div>
                """);

        for (ResumeEducationResponse education :
                resume.educations()) {

            html.append("""
                    <div class="item">
                        <div class="item-title">
                """);

            html.append(escape(education.degree()));

            html.append("""
                        </div>
                        <div class="item-subtitle">
                """);

            html.append(
                    escape(education.institutionName())
            );

            if (education.fieldOfStudy() != null) {
                html.append(" — ")
                        .append(
                                escape(education.fieldOfStudy())
                        );
            }

            html.append("""
                        </div>
                """);

            if (education.grade() != null) {
                html.append("""
                        <div class="muted">
                    """)
                        .append("Grade: ")
                        .append(escape(education.grade()))
                        .append("""
                        </div>
                        """);
            }

            html.append("</div>");
        }

        html.append("</div>");
    }

    private void renderSkills(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.skills().isEmpty()) {
            return;
        }

        html.append("""
                <div class="section">
                    <div class="section-title">Skills</div>
                    <div class="skills">
                """);

        for (int i = 0;
             i < resume.skills().size();
             i++) {

            ResumeSkillResponse skill =
                    resume.skills().get(i);

            html.append(escape(skill.name()));

            if (skill.proficiencyLevel() != null) {
                html.append(" — ")
                        .append(
                                escape(
                                        skill.proficiencyLevel()
                                )
                        );
            }

            if (i < resume.skills().size() - 1) {
                html.append(" • ");
            }
        }

        html.append("""
                    </div>
                </div>
                """);
    }

    private void renderProjects(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.projects().isEmpty()) {
            return;
        }

        html.append("""
                <div class="section">
                    <div class="section-title">Projects</div>
                """);

        for (ResumeProjectResponse project :
                resume.projects()) {

            html.append("""
                    <div class="item">
                        <div class="item-title">
                """);

            html.append(escape(project.name()));

            html.append("""
                        </div>
                """);

            if (project.technologies() != null) {
                html.append("""
                        <div class="item-subtitle">
                    """)
                        .append(escape(project.technologies()))
                        .append("""
                        </div>
                        """);
            }

            if (project.description() != null) {
                html.append("""
                        <div class="description">
                    """)
                        .append(escape(project.description()))
                        .append("""
                        </div>
                        """);
            }

            html.append("</div>");
        }

        html.append("</div>");
    }

    private String escape(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}