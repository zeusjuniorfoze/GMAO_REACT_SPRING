import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const GestionEquipements = () => {
    const [equipements, setEquipements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newEquipement, setNewEquipement] = useState({
        numE: '',
        nom: '',
        dateEnr: '',
        description: '',
        statu: 'Actif',  // Valeur par défaut
        etat: 'Disponible' // Valeur par défaut
    });
    const [selectedEquipement, setSelectedEquipement] = useState(null);

    // Charger les équipements au montage
    useEffect(() => {
        fetchEquipements();
    }, []);

    const fetchEquipements = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/equipements');
            setEquipements(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des équipements', error);
            toast.error('Erreur lors du chargement des équipements.');
        }
        finally {
            setLoading(false);
        }
    };

    // Fonction pour appliquer les couleurs aux statuts
    const getStatutStyle = (statu) => {
        return statu === 'Actif' ? { color: 'green' } : { color: 'red' };
    };



    // Gestion des inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (selectedEquipement) {
            setSelectedEquipement({ ...selectedEquipement, [name]: value });
        } else {
            setNewEquipement({ ...newEquipement, [name]: value });
        }
    };

    // Ajouter un équipement (POST)
    const handleAddEquipement = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/equipements', newEquipement);
            setEquipements([...equipements, response.data]);
            toast.success('Équipement ajouté avec succès.');
            closeModal();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'équipement', error);
            toast.error('Erreur lors de l\'ajout de l\'équipement.');
        }
        finally {
            setLoading(false);
        }
    };

    // Modifier un équipement (PUT)
    const handleEditEquipement = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/equipements/${selectedEquipement.idE}`, selectedEquipement);
            setEquipements(equipements.map(eq => eq.idE === selectedEquipement.idE ? response.data : eq));
            toast.success('Équipement modifié avec succès.');
            closeModal();
        } catch (error) {
            console.error('Erreur lors de la modification de l\'équipement', error);
            toast.error('Erreur lors de la modification de l\'équipement.');
        }
        finally {
            setLoading(false);
        }
    };

    // Supprimer un équipement (DELETE)
    const handleDelete = async (idE) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8080/api/equipements/${idE}`);
            setEquipements(equipements.filter(eq => eq.idE !== idE));
            toast.success('Équipement supprimé avec succès.');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'équipement', error);
            toast.error('Erreur lors de la suppression de l\'équipement.');
        }
        finally {
            setLoading(false);
        }
    };

    // Fermer la modal
    const closeModal = () => {
        setModalShow(false);
        setSelectedEquipement(null);
        setNewEquipement({ numE: '', nom: '', dateEnr: '', description: '', statu: 'Actif', etat: 'Disponible' });
    };

    return (
        <div>
            <h1>Gestion des équipements</h1>
            <button className="btn btn-primary" onClick={() => setModalShow(true)}>
                <i className="bx bx-plus-circle"></i> Ajouter un équipement
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
                        <th>Numéro</th>
                        <th>Nom</th>
                        <th>Date d'enregistrement</th>
                        <th>Description</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {equipements
                        .filter(eq => eq.nom.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(eq => (
                            <tr key={eq.idE}>
                                <td>{eq.idE}</td>
                                <td>{eq.numE}</td>
                                <td>{eq.nom}</td>
                                <td>{eq.dateEnr}</td>
                                <td>{eq.description}</td>
                                <td style={getStatutStyle(eq.statu)}>{eq.statu}</td>
                                <td>
                                    <button onClick={() => { setSelectedEquipement(eq); setModalShow(true); }} className="btn btn-primary">
                                        <i className="bx bx-edit-alt"></i>
                                    </button>
                                    <button onClick={() => handleDelete(eq.idE)} className="btn btn-danger" style={{ marginLeft: '10px' }}>
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
                                        {selectedEquipement ? 'Modifier un équipement' : 'Ajouter un équipement'}
                                    </h5>

                                    <button type="button" className="close" onClick={closeModal} style={{ marginLeft: 'auto', color: 'red' }}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input type="text" className="form-control mb-3" placeholder="Numéro" name="numE" value={selectedEquipement ? selectedEquipement.numE : newEquipement.numE} onChange={handleChange} />
                                    <input type="text" className="form-control mb-3" placeholder="Nom" name="nom" value={selectedEquipement ? selectedEquipement.nom : newEquipement.nom} onChange={handleChange} />
                                    <input type="date" className="form-control mb-3" name="dateEnr" value={selectedEquipement ? selectedEquipement.dateEnr : newEquipement.dateEnr} onChange={handleChange} />
                                    <input type="text" className="form-control mb-3" placeholder="Description" name="description" value={selectedEquipement ? selectedEquipement.description : newEquipement.description} onChange={handleChange} />
                                    <select className="form-control mb-3" name="statu" value={selectedEquipement ? selectedEquipement.statu : newEquipement.statu} onChange={handleChange}>
                                        <option>Actif</option>
                                        <option>Inactif</option>
                                    </select>
                                    <select className="form-control mb-3" name="etat" value={selectedEquipement ? selectedEquipement.etat : newEquipement.etat} onChange={handleChange}>
                                        <option>Disponible</option>
                                        <option>Hors service</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" onClick={selectedEquipement ? handleEditEquipement : handleAddEquipement}>
                                        {selectedEquipement ? 'Modifier' : 'Ajouter'}
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

export default GestionEquipements;
