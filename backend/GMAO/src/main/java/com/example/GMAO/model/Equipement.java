package com.example.GMAO.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "equipement")  // Nom de la table dans la base de données
public class Equipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-génération de l'ID
    @Column(name = "ID_E")  // Correspondance avec le nom de la colonne dans la BD
    private Long idE;

    @Column(name = "NUM_E", unique = true)  // Ajout de la contrainte UNIQUE sur le numéro d'équipement
    @NotNull(message = "Le numéro d'équipement est obligatoire")
    @Size(min = 1, message = "Le numéro d'équipement ne peut pas être vide")
    private String numE;

    @Column(name = "NOM")  // Correspondance avec le nom de la colonne dans la BD
    @NotNull(message = "Le nom de l'équipement est obligatoire")
    @Size(min = 2, message = "Le nsom de l'équipement doit comporter au moins 2 caractères")
    private String nom;

    @Column(name = "DATE_ENR")  // Correspondance avec le nom de la colonne dans la BD
    @NotNull(message = "La date d'enregistrement est obligatoire")
    private Date dateEnr;

    @Column(name = "DESCRIPTION")  // Correspondance avec le nom de la colonne dans la BD
    private String description;

    @Column(name = "STATU")  // Correspondance avec le nom de la colonne dans la BD
    @NotNull(message = "Le statut de l'équipement est obligatoire")
    private String statu;

    // Getters and Settersa
    public Long getIdE() {
        return idE;
    }

    public void setIdE(Long idE) {
        this.idE = idE;
    }

    public String getNumE() {
        return numE;
    }

    public void setNumE(String numE) {
        this.numE = numE;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Date getDateEnr() {
        return dateEnr;
    }

    public void setDateEnr(Date dateEnr) {
        this.dateEnr = dateEnr;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatu() {
        return statu;
    }

    public void setStatu(String statu) {
        this.statu = statu;
    }
}
