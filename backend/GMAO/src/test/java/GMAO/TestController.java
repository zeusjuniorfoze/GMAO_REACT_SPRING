package GMAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db")
    public String testDbConnection() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "✅ Connexion réussie : " + result;
        } catch (Exception e) {
            return "❌ Erreur de connexion : " + e.getMessage();
        }
    }
}
