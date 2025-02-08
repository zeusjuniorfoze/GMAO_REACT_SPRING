package GMAO.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "users")  // Nom de la table dans la base de données
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-génération de l'ID
    @Column(name = "ID_U")  // Correspondance avec le nom de la colonne dans la BD
    private Long idU;

    @Column(name = "NOM")  // Correspondance avec le nom de la colonne dans la BD
    @NotNull(message = "Le nom est obligatoire")
    private String nom;

    @Column(name = "EMAIL_U")  // Correspondance avec le nom de la colonne dans la BD
    @Email(message = "L'email doit être valide")
    @NotNull(message = "L'email est obligatoire")
    private String emailU;

    @Column(name = "MOT_DE_PASSE_U")  // Correspondance avec le nom de la colonne dans la BD
    @NotNull(message = "Le mot de passe est obligatoire")
    private String motDePasseU;

    @Column(name = "TYPE")  // Correspondance avec le nom de la colonne dans la BD
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le type d'utilisateur est obligatoire")
    private UserType type;

    // Getters and Setters
    public Long getIdU() {
        return idU;
    }

    public void setIdU(Long idU) {
        this.idU = idU;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmailU() {
        return emailU;
    }

    public void setEmailU(String emailU) {
        this.emailU = emailU;
    }

    public String getMotDePasseU() {
        return motDePasseU;
    }

    public void setMotDePasseU(String motDePasseU) {
        this.motDePasseU = motDePasseU;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    // Méthode pour hacher le mot de passe avant la persistance
    @PrePersist
    public void prePersist() {
        if (this.motDePasseU != null) {
            this.motDePasseU = new BCryptPasswordEncoder().encode(this.motDePasseU);
        }
    }

    // Enum pour le type d'utilisateur
    public enum UserType {
        ADMIN,
        GESTIONNAIRE,
        CLIENT
    }
}
