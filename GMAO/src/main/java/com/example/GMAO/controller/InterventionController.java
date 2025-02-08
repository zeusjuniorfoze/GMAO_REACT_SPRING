package com.example.GMAO.controller;

import com.example.GMAO.model.Intervention;
import com.example.GMAO.service.InterventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/interventions")
@CrossOrigin(origins = "http://localhost:3000") // Permettre le front React
public class InterventionController {

    @Autowired
    private InterventionService interventionService;

    // 🔹 Récupérer toutes les interventions
    @GetMapping
    public ResponseEntity<List<Intervention>> getAllInterventions() {
        return ResponseEntity.ok(interventionService.getAllInterventions());
    }

    // 🔹 Récupérer une intervention par ID
    @GetMapping("/{id}")
    public ResponseEntity<Intervention> getInterventionById(@PathVariable Long id) {
        Optional<Intervention> intervention = interventionService.getInterventionById(id);
        return intervention.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 🔹 Créer une intervention
    @PostMapping
    public ResponseEntity<Intervention> createIntervention(
            @RequestBody Intervention intervention,
            @RequestParam Long equipementId,
            @RequestParam Long userId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(interventionService.createIntervention(intervention, equipementId, userId));
    }

    // 🔹 Modifier une intervention
    @PutMapping("/{id}")
    public ResponseEntity<Intervention> updateIntervention(
            @PathVariable Long id,
            @RequestBody Intervention interventionDetails) {
        return ResponseEntity.ok(interventionService.updateIntervention(id, interventionDetails));
    }

    // 🔹 Supprimer une intervention
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIntervention(@PathVariable Long id) {
        return interventionService.deleteIntervention(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}