package com.example.GMAO.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Applique la règle sur toutes les URLs commençant par /api/
                .allowedOrigins("http://localhost:5173") // Autorise l'origine de ton frontend React
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes HTTP autorisées
                .allowedHeaders("*") // Autorise tous les headers
                .allowCredentials(true); // Autorise les cookies (si nécessaire)
    }

    
}
