// Importation des bibliothèques React et Axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
    const [users, setUsers] = useState([]); // État pour stocker les utilisateurs
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Fonction pour mapper les types d'utilisateur
    function mapUserType(type) {
        switch (type) {
            case 'ADMIN':
                return 'Administrateur';
            case 'GESTIONNAIRE':
                return 'Gestionnaire';
            case 'CLIENT':
                return 'Client';
            default:
                return 'Inconnu';
        }
    }

    useEffect(() => {
        // Requête GET pour récupérer les utilisateurs
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                setUsers(response.data); // Mise à jour de l'état avec les utilisateurs récupérés
                setError(null); // Réinitialisation des erreurs
            })
            .catch(error => {
                setError('Il y a eu une erreur lors de la récupération des utilisateurs.');
                console.error('Il y a eu une erreur !', error);
            });
    }, []); // L'effet ne s'exécute qu'une seule fois après le premier rendu

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affichage de l'erreur si elle existe */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.idU}>
                            <td>{user.idU}</td>
                            <td>{user.nom}</td>
                            <td>{user.emailU}</td>
                            <td>{mapUserType(user.type)}</td>
                        </tr>

                    ))}
                </tbody>

            </table>
        </div>
    );
}

// Export du composant pour pouvoir l'utiliser dans d'autres fichiers
export default UsersList;
