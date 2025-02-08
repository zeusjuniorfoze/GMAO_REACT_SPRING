package com.example.GMAO.service;

import com.example.GMAO.model.Intervention;
import com.example.GMAO.model.Users;
import com.example.GMAO.model.Equipement;
import com.example.GMAO.repository.InterventionRepository;
import com.example.GMAO.repository.UsersRepository;
import com.example.GMAO.repository.EquipementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterventionService {

    @Autowired
    private InterventionRepository interventionRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private EquipementRepository equipementRepository;

    // 🔹 Récupérer toutes les interventions
    public List<Intervention> getAllInterventions() {
        return interventionRepository.findAll();
    }

    // 🔹 Récupérer une intervention par ID
    public Optional<Intervention> getInterventionById(Long id) {
        return interventionRepository.findById(id);
    }

    // 🔹 Créer une intervention
    public Intervention createIntervention(Intervention intervention, Long equipementId, Long userId) {
        Equipement equipement = equipementRepository.findById(equipementId)
                .orElseThrow(() -> new RuntimeException("Équipement non trouvé"));
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        intervention.setEquipement(equipement);
        intervention.setUser(user);

        return interventionRepository.save(intervention);
    }

    // 🔹 Mettre à jour une intervention
    public Intervention updateIntervention(Long id, Intervention interventionDetails) {
        Intervention intervention = interventionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intervention non trouvée"));

        intervention.setTypeI(interventionDetails.getTypeI());
        intervention.setDateDeb(interventionDetails.getDateDeb());
        intervention.setDuree(interventionDetails.getDuree());
        intervention.setDescriptionI(interventionDetails.getDescriptionI());
        intervention.setStatutI(interventionDetails.getStatutI());

        return interventionRepository.save(intervention);
    }

    // 🔹 Supprimer une intervention
    public boolean deleteIntervention(Long id) {
        Intervention intervention = interventionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intervention non trouvée"));
        interventionRepository.delete(intervention);
        return true;
    }
}
