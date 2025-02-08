package com.example.GMAO.repository;

import com.example.GMAO.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    
    // Définir la méthode pour trouver un utilisateur par son email
    Users findByEmailU(String email);
}
