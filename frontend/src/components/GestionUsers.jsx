import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestionUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [newUser, setNewUser] = useState({
        nom: '',
        emailU: '',
        type: 'CLIENT',
        motDePasseU: ''
    });

    const [selectedUser, setSelectedUser] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    };
    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!newUser.motDePasseU) {
            setFormErrors({ motDePasseU: 'Le mot de passe est obligatoire !' });
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/users', newUser);
            setUsers([...users, response.data]);
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur", error);
        }
    };
    const handleEditUser = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${selectedUser.idU}`, selectedUser);
            setUsers(users.map(user => user.idU === selectedUser.idU ? response.data : user));
            closeModal();
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur", error);
        }
    };

    const handleDelete = async (idU) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${idU}`);
            setUsers(users.filter(user => user.idU !== idU));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
        }
    };

    const closeModal = () => {
        setModalShow(false);
        setSelectedUser(null);
        setNewUser({ nom: '', emailU: '', type: 'CLIENT', motDePasseU: '' });
    };

    return (
        <div>
            <h1>Gestion des utilisateurs</h1>
            <button className="btn btn-primary" onClick={() => setModalShow(true)}>
                <i className="bx bx-plus-circle"></i> Ajouter un utilisateur
            </button>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter(user => user.nom.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(user => (
                            <tr key={user.idU}>
                                <td>{user.idU}</td>
                                <td>{user.nom}</td>
                                <td>{user.emailU}</td>
                                <td>{user.type}</td>
                                <td>
                                    <button onClick={() => { setSelectedUser(user); setModalShow(true); }} className="btn btn-primary">
                                        <i className="bx bx-edit-alt"></i>
                                    </button>
                                    <button onClick={() => handleDelete(user.idU)} className="btn btn-danger" style={{ marginLeft: '10px' }}>
                                        <i className="bx bx-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {modalShow && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
                                </h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-3" placeholder="Nom" name="nom" value={newUser.nom} onChange={handleChange} />
                                <input type="email" className="form-control mb-3" placeholder="Email" name="emailU" value={newUser.emailU} onChange={handleChange} />
                                <select className="form-control mb-3" name="type" value={newUser.type} onChange={handleChange}>
                                    <option value="ADMIN">Admin</option>
                                    <option value="GESTIONNAIRE">Gestionnaire</option>
                                    <option value="CLIENT">Client</option>
                                </select>
                                {!selectedUser && (
                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Mot de passe"
                                        name="motDePasseU"
                                        value={newUser.motDePasseU}
                                        onChange={handleChange}
                                    />

                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>Fermer</button>
                                <button className="btn btn-primary" onClick={selectedUser ? handleEditUser : handleAddUser}>
                                    {selectedUser ? 'Modifier' : 'Ajouter'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionUsers;