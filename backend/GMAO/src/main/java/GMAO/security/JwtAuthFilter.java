package GMAO.security;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/*")
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;  // Injection de la classe JwtUtil

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Extraire le token d'un header Authorization
        String token = extractToken(request);

        // Si le token est présent et valide
        if (token != null && jwtUtil.validateToken(token, jwtUtil.extractUsername(token))) {
            // Authentifier l'utilisateur avec le token
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    jwtUtil.extractUsername(token), null, null);  // Ici tu pourrais ajouter des authorities selon le rôle
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);  // Passer à la suite du filtre
    }

    // Méthode pour extraire le token du header Authorization
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);  // Retirer "Bearer " du début du token
        }
        return null;
    }
}
