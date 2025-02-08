package com.example.GMAO;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.GMAO.repository")  // Spécifie le package contenant tes repositories
public class GmaoApplication {
    public static void main(String[] args) {
        SpringApplication.run(GmaoApplication.class, args);
    }
}
