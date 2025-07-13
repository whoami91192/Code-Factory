package com.bookreviewhub.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI bookReviewHubOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Book Review Hub API")
                        .version("1.0")
                        .description("API for managing books, reviews and users"));
    }
}
