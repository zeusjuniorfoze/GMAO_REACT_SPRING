package GMAO.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Configuration du CSRF avec les nouveaux Customizer
            .csrf(csrf -> csrf.disable()) // Désactivation du CSRF
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/login", "/register").permitAll()  // Routes publiques
                    .anyRequest().authenticated()  // Routes protégées
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()  // Autoriser l'accès à la page de connexion
            )
            .logout(logout -> logout
                .permitAll()  // Autoriser la déconnexion
            )
            .addFilterBefore(new JwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);  // Ajout du filtre JWT

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Encoder le mot de passe
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = 
            http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();  // Construction de l'AuthenticationManager sans `and()`
    }
}
