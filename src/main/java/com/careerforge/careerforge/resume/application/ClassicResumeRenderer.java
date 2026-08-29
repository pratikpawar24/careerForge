package com.careerforge.careerforge.resume.application;

import com.careerforge.careerforge.resume.api.FullResumeResponse;
import com.careerforge.careerforge.resume.api.ResumeEducationResponse;
import com.careerforge.careerforge.resume.api.ResumeExperienceResponse;
import com.careerforge.careerforge.resume.api.ResumeProjectResponse;
import com.careerforge.careerforge.resume.api.ResumeSkillResponse;
import com.careerforge.careerforge.resume.domain.ResumeTemplate;
import org.springframework.stereotype.Component;

@Component
public class ClassicResumeRenderer implements ResumeRenderer {

    @Override
    public String render(
            FullResumeResponse resume
    ) {

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
                            max-width: 850px;
                            margin: 40px auto;
                            padding: 0 30px;
                            line-height: 1.5;
                        }

                        h1 {
                            margin-bottom: 5px;
                        }

                        h2 {
                            border-bottom: 1px solid #ccc;
                            padding-bottom: 5px;
                            margin-top: 30px;
                        }

                        .item {
                            margin-bottom: 20px;
                        }

                        .muted {
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                """);

        html.append("<h1>")
                .append(escape(resume.name()))
                .append("</h1>");

        renderExperiences(html, resume);
        renderEducation(html, resume);
        renderSkills(html, resume);
        renderProjects(html, resume);

        html.append("""
                </body>
                </html>
                """);

        return html.toString();
    }

    private void renderExperiences(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.experiences().isEmpty()) {
            return;
        }

        html.append("<h2>Experience</h2>");

        for (ResumeExperienceResponse experience :
                resume.experiences()) {

            html.append("<div class=\"item\">");

            html.append("<strong>")
                    .append(escape(experience.jobTitle()))
                    .append("</strong><br/>");

            html.append(escape(experience.companyName()));

            if (experience.location() != null) {
                html.append(" — ")
                        .append(escape(experience.location()));
            }

            html.append("<br/>");

            html.append("<span class=\"muted\">")
                    .append(experience.startDate())
                    .append(" — ");

            if (experience.currentlyWorking()) {
                html.append("Present");
            } else {
                html.append(experience.endDate());
            }

            html.append("</span>");

            if (experience.description() != null) {
                html.append("<p>")
                        .append(escape(experience.description()))
                        .append("</p>");
            }

            html.append("</div>");
        }
    }

    private void renderEducation(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.educations().isEmpty()) {
            return;
        }

        html.append("<h2>Education</h2>");

        for (ResumeEducationResponse education :
                resume.educations()) {

            html.append("<div class=\"item\">");

            html.append("<strong>")
                    .append(escape(education.degree()))
                    .append("</strong><br/>");

            html.append(escape(
                    education.institutionName()
            ));

            if (education.fieldOfStudy() != null) {
                html.append(" — ")
                        .append(escape(
                                education.fieldOfStudy()
                        ));
            }

            if (education.grade() != null) {
                html.append("<br/>")
                        .append("Grade: ")
                        .append(escape(education.grade()));
            }

            html.append("</div>");
        }
    }

    private void renderSkills(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.skills().isEmpty()) {
            return;
        }

        html.append("<h2>Skills</h2>");

        for (ResumeSkillResponse skill : resume.skills()) {

            html.append("<span>")
                    .append(escape(skill.name()));

            if (skill.proficiencyLevel() != null) {
                html.append(" (")
                        .append(escape(
                                skill.proficiencyLevel()
                        ))
                        .append(")");
            }

            html.append("</span><br/>");
        }
    }

    private void renderProjects(
            StringBuilder html,
            FullResumeResponse resume
    ) {

        if (resume.projects().isEmpty()) {
            return;
        }

        html.append("<h2>Projects</h2>");

        for (ResumeProjectResponse project :
                resume.projects()) {

            html.append("<div class=\"item\">");

            html.append("<strong>")
                    .append(escape(project.name()))
                    .append("</strong>");

            if (project.technologies() != null) {
                html.append("<br/>")
                        .append(escape(
                                project.technologies()
                        ));
            }

            if (project.description() != null) {
                html.append("<p>")
                        .append(escape(
                                project.description()
                        ))
                        .append("</p>");
            }

            html.append("</div>");
        }
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
    @Override
    public ResumeTemplate getTemplate() {
        return ResumeTemplate.CLASSIC;
    }
}