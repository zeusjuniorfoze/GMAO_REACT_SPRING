package com.example.GMAO.service;

import com.example.GMAO.model.Users;
import com.example.GMAO.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;


    public Users findByEmail(String email) {
        return usersRepository.findByEmailU(email);
    }

    // Vérifie si l'email existe déjà
    public boolean emailExists(String email) {
        return usersRepository.findByEmailU(email) != null;
    }

    // Sauvegarde un utilisateur sans encoder le mot de passe
    public Users saveUser(Users user) {
        // Pas d'encodage du mot de passe, on le sauvegarde en clair
        return usersRepository.save(user);
    }

    public Users updateUser(Long id, Users updatedUser) {
        Optional<Users> existingUser = usersRepository.findById(id);

        if (existingUser.isPresent()) {
            Users user = existingUser.get();

            // Mettre à jour les champs nécessaires
            user.setNom(updatedUser.getNom()); // Mise à jour du nom
            user.setEmailU(updatedUser.getEmailU()); // Mise à jour de l'email
            user.setType(updatedUser.getType()); // Mise à jour du type (ADMIN, GESTIONNAIRE, CLIENT)

            // Sauvegarde de l'utilisateur mis à jour
            return usersRepository.save(user);
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + id);
        }
    }

    // Lire un utilisateur par son ID
    public Optional<Users> getUserById(Long id) {
        return usersRepository.findById(id);
    }

    // Lire tous les utilisateurs
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    // Supprimer un utilisateur par son ID
    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }
}
