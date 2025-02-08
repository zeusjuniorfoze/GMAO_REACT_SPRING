package GMAO.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);  // Clé secrète générée pour HS256

    // Générer un token JWT
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Expiration dans 10 heures
                .signWith(secretKey)  // Utilisation de la clé secrète pour signer
                .compact();
    }

    // Extraire les informations du token (comme le sujet)
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()  // Nouvelle approche avec parserBuilder()
                .setSigningKey(secretKey)  // Utilisation de la clé secrète
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Vérifier si le token est expiré
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Extraire le sujet (nom d'utilisateur) du token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Valider le token
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}
