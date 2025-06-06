package com.example.coursemanager.config;

import com.example.coursemanager.security.JwtFilter;
import jakarta.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    @Bean
    public FilterRegistrationBean<Filter> jwtFilter(JwtFilter jwtFilter) {
        FilterRegistrationBean<Filter> reg = new FilterRegistrationBean<>();
        reg.setFilter(jwtFilter);
        reg.addUrlPatterns("/users/*", "/courses/*", "/enrollments/*");
        return reg;
    }
}