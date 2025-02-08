package GMAO.security;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static final String JWT_SECRET = "votre_secret";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Extraire et valider le JWT dans les entêtes de la requête
        String jwt = ((HttpServletRequest) request).getHeader("Authorization");
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
            // Vérifier et extraire les informations du JWT
            String username = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
            // Authentification à partir du JWT
        }
        chain.doFilter(request, response);
    }
}
