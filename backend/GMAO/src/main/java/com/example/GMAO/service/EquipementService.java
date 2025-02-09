package com.example.GMAO.service;

import com.example.GMAO.model.Equipement;
import com.example.GMAO.repository.EquipementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipementService {

    @Autowired
    private EquipementRepository equipementRepository;

    // Obtenir tous les équipements
    public List<Equipement> getAllEquipements() {
        return equipementRepository.findAll();
    }

    // Obtenir un équipement par son ID
    public Optional<Equipement> getEquipementById(Long id) {
        return equipementRepository.findById(id);  // Utilisation de la méthode JpaRepository
    }
    
    // Créer un nouvel équipement
    public Equipement createEquipement(Equipement equipement) {
        return equipementRepository.save(equipement);
    }

    // Mettre à jour un équipement existant
    public Equipement updateEquipement(Long id, Equipement equipementDetails) {
        Equipement equipement = getEquipementById(id)
                .orElseThrow(() -> new RuntimeException("Équipement non trouvé"));
        equipement.setNumE(equipementDetails.getNumE());
        equipement.setNom(equipementDetails.getNom());
        equipement.setDescription(equipementDetails.getDescription());
        equipement.setStatu(equipementDetails.getStatu());
        return equipementRepository.save(equipement);
    }

    // Supprimer un équipement
    public boolean deleteEquipement(Long id) {
        Equipement equipement = getEquipementById(id)
                .orElseThrow(() -> new RuntimeException("Équipement non trouvé"));
        equipementRepository.delete(equipement);
        return true;
    }
}
