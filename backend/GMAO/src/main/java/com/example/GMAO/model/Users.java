package com.example.GMAO.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
// Enum pour le type d'utilisateur
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

@Entity
@Table(name = "users") // Nom de la table dans la base de données
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-génération de l'ID
    @Column(name = "ID_U") // Correspondance avec le nom de la colonne dans la BD
    private Long idU;

    @Column(name = "NOM") // Correspondance avec le nom de la colonne dans la BD
    @NotNull(message = "Le nom est obligatoire")
    @Size(min = 2, message = "Le nom doit comporter au moins 2 caractères")
    private String nom;

    @Column(name = "EMAIL_U", unique = true) // Ajout de la contrainte UNIQUE sur l'email
    @Email(message = "L'email doit être valide")
    @NotNull(message = "L'email est obligatoire")
    private String emailU;

    @Column(name = "MOT_DE_PASSE_U") // Correspondance avec le nom de la colonne dans la BD
    @NotNull(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit comporter au moins 6 caractères")
    private String motDePasseU;

    @Column(name = "TYPE") // Correspondance avec le nom de la colonne dans la BD
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

    public enum UserType {
        ADMIN("ADMIN"),
        GESTIONNAIRE("GESTIONNAIRE"),
        CLIENT("CLIENT");

        private final String value;

        UserType(String value) {
            this.value = value;
        }

        @JsonValue // Important for serialization
        public String getValue() {
            return value;
        }

        @JsonCreator // Important for deserialization
        public static UserType fromValue(String value) {
            if (value == null) {
                return null; // Handle null input if necessary
            }

            for (UserType type : values()) {
                if (type.value.equalsIgnoreCase(value)) { // Case-insensitive comparison
                    return type;
                }
            }
            throw new IllegalArgumentException("Invalid UserType: " + value);
        }
    }
}
