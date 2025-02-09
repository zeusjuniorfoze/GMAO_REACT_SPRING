package com.example.GMAO.repository;

import com.example.GMAO.model.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
    // Add any custom queries here if needed
}