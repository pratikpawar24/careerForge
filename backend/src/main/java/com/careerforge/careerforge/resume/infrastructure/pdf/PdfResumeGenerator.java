package com.careerforge.careerforge.resume.infrastructure.pdf;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;

@Component
public class PdfResumeGenerator {

    public byte[] generate(String html) {

        try (ByteArrayOutputStream outputStream =
                     new ByteArrayOutputStream()) {

            PdfRendererBuilder builder =
                    new PdfRendererBuilder();

            builder
                    .withHtmlContent(html, null)
                    .useFastMode()
                    .toStream(outputStream);

            builder.run();

            return outputStream.toByteArray();

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "Failed to generate resume PDF",
                    exception
            );
        }
    }
}