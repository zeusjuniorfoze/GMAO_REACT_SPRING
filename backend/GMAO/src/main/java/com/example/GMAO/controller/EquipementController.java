package com.example.GMAO.controller;

import com.example.GMAO.model.Equipement;
import com.example.GMAO.service.EquipementService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipements")
@CrossOrigin(origins = "http://localhost:3000") // Permettre les requêtes du front React
public class EquipementController {

    @Autowired
    private EquipementService equipementService;

    // 🔹 Récupérer tous les équipements
    @GetMapping
    public ResponseEntity<List<Equipement>> getAllEquipements() {
        List<Equipement> equipements = equipementService.getAllEquipements();
        return ResponseEntity.ok(equipements);
    }

    // 🔹 Récupérer un équipement par ID
    @GetMapping("/{id}")
    public ResponseEntity<Equipement> getEquipementById(@PathVariable("id") Long id) {
        Equipement equipement = equipementService.getEquipementById(id)
                .orElseThrow(() -> new RuntimeException("Équipement non trouvé"));
        return ResponseEntity.ok(equipement);
    }

    // 🔹 Ajouter un équipement
        @PostMapping
public ResponseEntity<Equipement> createEquipement(@Valid @RequestBody Equipement equipement, BindingResult result) {

    if (result.hasErrors()) {
        return ResponseEntity.badRequest().body(null); // Or return a more detailed error response
        // You could also return result.getFieldErrors() for more specific error messages
    }

    try {
        Equipement createdEquipement = equipementService.createEquipement(equipement);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEquipement);
    } catch (Exception e) { // Catch any potential exceptions during creation
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Or a more specific error response
    }
}

    // 🔹 Modifier un équipement
    @PutMapping("/{id}")
    public ResponseEntity<Equipement> updateEquipement(@PathVariable Long id,
            @RequestBody Equipement equipementDetails) {
        Equipement updatedEquipement = equipementService.updateEquipement(id, equipementDetails);
        return updatedEquipement != null ? ResponseEntity.ok(updatedEquipement) : ResponseEntity.notFound().build();
    }

    // 🔹 Supprimer un équipement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipement(@PathVariable Long id) {
        return equipementService.deleteEquipement(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
