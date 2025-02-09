package com.example.GMAO.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "intervention")
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_I")
    private Long idI;

    @ManyToOne
    @JoinColumn(name = "ID_E", nullable = false) // Clé étrangère vers Equipement
    private Equipement equipement;

    @ManyToOne
    @JoinColumn(name = "ID_U", nullable = false) // Clé étrangère vers Users
    private Users user;

    @Column(name = "TYPE_I")
    @NotNull(message = "Le type d'intervention est obligatoire")
    private String typeI;

    @Column(name = "DATE_DEB")
    @NotNull(message = "La date de début est obligatoire")
    private Date dateDeb;

    @Column(name = "DUREE")
    @NotNull(message = "La durée est obligatoire")
    private int duree;

    @Column(name = "DESCRIPTION_I")
    private String descriptionI;

    @Column(name = "STATUT_I")
    private String statutI;

    // Getters et Setters (pour TOUS les champs, y compris equipement et user)

    public Long getIdI() { return idI; }
    public void setIdI(Long idI) { this.idI = idI; }

    public Equipement getEquipement() { return equipement; }
    public void setEquipement(Equipement equipement) { this.equipement = equipement; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public String getTypeI() { return typeI; }
    public void setTypeI(String typeI) { this.typeI = typeI; }

    public Date getDateDeb() { return dateDeb; }
    public void setDateDeb(Date dateDeb) { this.dateDeb = dateDeb; }

    public int getDuree() { return duree; }
    public void setDuree(int duree) { this.duree = duree; }

    public String getDescriptionI() { return descriptionI; }
    public void setDescriptionI(String descriptionI) { this.descriptionI = descriptionI; }

    public String getStatutI() { return statutI; }
    public void setStatutI(String statutI) { this.statutI = statutI; }

}