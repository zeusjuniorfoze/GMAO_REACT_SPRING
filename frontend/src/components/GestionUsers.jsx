import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";

const GestionUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
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
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (error) {
            toast.error('Erreur lors du chargement des utilisateurs');
        }
        finally {
            setLoading(false);
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
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/users', newUser);
            setUsers([...users, response.data]);
            toast.success("Utilisateur ajouté avec succès !");
            closeModal();
        } catch (error) {
            toast.error("Erreur lors de l'ajout de l'utilisateur");
        }
        setLoading(false);
    };

    const handleEditUser = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${selectedUser.idU}`, selectedUser);
            setUsers(users.map(user => user.idU === selectedUser.idU ? response.data : user));
            toast.success("Utilisateur modifié avec succès !");
            closeModal();
        } catch (error) {
            toast.error("Erreur lors de la modification");
        }
        setLoading(false);
    };

    const handleDelete = async (idU) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8080/api/users/${idU}`);
            setUsers(users.filter(user => user.idU !== idU));
            toast.success("Utilisateur supprimé !");
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
        setLoading(false);
    };

    const closeModal = () => {
        setModalShow(false);
        setSelectedUser(null);
        setNewUser({ nom: '', emailU: '', type: 'CLIENT', motDePasseU: '' });
    };

    return (
        <div className="container mt-4">

            <h1 className="mb-4">Gestion des utilisateurs</h1>

            <button className="btn btn-primary mb-3" onClick={() => setModalShow(true)}>
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
            {loading && <div className="text-center">Chargement en cours...</div>}
            <ToastContainer position="top-right" autoClose={3000} />
            <table className="table table-striped">
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
                                    <button onClick={() => handleDelete(user.idU)} className="btn btn-danger ms-2">
                                        <i className="bx bx-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <AnimatePresence>
                {modalShow && (
                    <motion.div 
                        className="modal show" 
                        style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {selectedUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
                                    </h5>
                                    <button type="button" className="close" onClick={closeModal} style={{ marginLeft: 'auto', color: 'red' }}>
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
                                    <button className="btn btn-primary" onClick={selectedUser ? handleEditUser : handleAddUser}>
                                        {selectedUser ? 'Modifier' : 'Ajouter'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GestionUsers;
