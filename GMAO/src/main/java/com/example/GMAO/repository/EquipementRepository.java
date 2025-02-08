package com.example.GMAO.repository;

import com.example.GMAO.model.Equipement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipementRepository extends JpaRepository<Equipement, Long> {
    // Méthodes personnalisées si nécessaire
}
