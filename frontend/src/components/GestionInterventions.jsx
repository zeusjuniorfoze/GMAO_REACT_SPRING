import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";

const GestionInterventions = () => {
    const [interventions, setInterventions] = useState([]);
    const [equipements, setEquipements] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [newIntervention, setNewIntervention] = useState({
        idE: '', idU: '', typeI: '', dateDeb: '', duree: '', descriptionI: '', statutI: 'En cours'
    });
    const [selectedIntervention, setSelectedIntervention] = useState(null);

    useEffect(() => {
        fetchInterventions();
        fetchEquipements();
        fetchUtilisateurs();
    }, []);

    const fetchInterventions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/interventions');
            setInterventions(response.data);
        } catch (error) {
            toast.error('Erreur lors du chargement des interventions');
        } finally {
            setLoading(false);
        }
    };

    const fetchEquipements = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/equipements');
            setEquipements(response.data);
        } catch (error) {
            toast.error('Erreur lors du chargement des équipements');
        }
    };

    const fetchUtilisateurs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUtilisateurs(response.data);
        } catch (error) {
            toast.error('Erreur lors du chargement des utilisateurs');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        selectedIntervention
            ? setSelectedIntervention({ ...selectedIntervention, [name]: value })
            : setNewIntervention({ ...newIntervention, [name]: value });
    };

    const handleAddIntervention = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8080/api/interventions?equipementId=${newIntervention.idE}&userId=${newIntervention.idU}`,
                { typeI: newIntervention.typeI, dateDeb: newIntervention.dateDeb, duree: newIntervention.duree, descriptionI: newIntervention.descriptionI, statutI: newIntervention.statutI }
            );
            setInterventions([...interventions, response.data]);
            toast.success('Intervention ajoutée avec succès !');
            closeModal();
        } catch (error) {
            toast.error("Erreur lors de l'ajout de l'intervention");
        }
    };

    const handleEditIntervention = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/interventions/${selectedIntervention.idI}`, selectedIntervention);
            setInterventions(interventions.map(intv => intv.idI === selectedIntervention.idI ? response.data : intv));
            toast.success('Intervention modifiée avec succès !');
            closeModal();
        } catch (error) {
            toast.error('Erreur lors de la modification de l\'intervention');
        }
    };

    const handleDelete = async (idI) => {
        try {
            await axios.delete(`http://localhost:8080/api/interventions/${idI}`);
            setInterventions(interventions.filter(intv => intv.idI !== idI));
            toast.success('Intervention supprimée avec succès !');
        } catch (error) {
            toast.error('Erreur lors de la suppression de l\'intervention');
        }
    };

    const closeModal = () => {
        setModalShow(false);
        setSelectedIntervention(null);
        setNewIntervention({ idE: '', idU: '', typeI: '', dateDeb: '', duree: '', descriptionI: '', statutI: 'En cours' });
    };
    // Fonction pour appliquer les styles conditionnels à la durée
    const getDureeStyle = (duree) => {
        const dureeValue = parseFloat(duree); // On assure qu'il s'agit bien d'un nombre

        if (dureeValue >= 0 && dureeValue <= 5) {
            return { color: 'red' }; // Rouge si la durée est entre 0 et 5
        } else if (dureeValue > 5 && dureeValue <= 20) {
            return { color: 'orange' }; // Orange si la durée est entre 5 et 20
        } else if (dureeValue > 20) {
            return { color: 'green' }; // Vert si la durée est plus grande que 20
        }

        return {}; // Pas de style si la durée n'entre dans aucune des plages
    };

    // Fonction pour appliquer les styles conditionnels au statut
    const getStatutStyle = (statut) => {
        switch (statut) {
            case 'Annulée':
                return { color: 'red' };
            case 'En cours':
                return { color: 'orange' };
            case 'Terminée':
                return { color: 'green' };
            default:
                return {};
        }
    };



    return (
        <div>
            <h1>Gestion des interventions</h1>
            <button className="btn btn-primary" onClick={() => setModalShow(true)}>Ajouter une intervention</button>
            <div className="search-container">
                <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {loading && <div className="text-center">Chargement en cours...</div>}
            <ToastContainer position="top-right" autoClose={3000} />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Équipement</th>
                        <th>Utilisateur</th>
                        <th>Type</th>
                        <th>Date début</th>
                        <th>Durée</th>
                        <th>Description</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {interventions.map(intv => (
                        <tr key={intv.idI}>
                            <td>{intv.idI}</td>
                            <td>{equipements.find(eq => eq.idE === intv.idE)?.nom || 'N/A'}</td>
                            <td>{utilisateurs.find(ut => ut.idU === intv.idU)?.nom || 'N/A'}</td>
                            <td>{intv.typeI}</td>
                            <td>{intv.dateDeb}</td>
                            <td style={getDureeStyle(intv.duree)}>{intv.duree}</td>{/* Style conditionnel pour la durée */}
                            <td>{intv.descriptionI}</td>
                            <td style={getStatutStyle(intv.statutI)}>{intv.statutI}</td>{/* Style conditionnel pour le statut */}
                            <td>
                                <button onClick={() => { setSelectedIntervention(intv); setModalShow(true); }} className="btn btn-primary">
                                    <i className="bx bx-edit-alt"></i>
                                </button>
                                <button onClick={() => handleDelete(intv.idI)} className="btn btn-danger" style={{ marginLeft: '10px' }}>
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
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>{selectedIntervention ? 'Modifier' : 'Ajouter'} une intervention</h5>
                                    <button type="button" className="close" onClick={closeModal} style={{ marginLeft: 'auto', color: 'red' }}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* Formulaire */}
                                    <select name="idE" value={selectedIntervention?.idE || newIntervention.idE} onChange={handleChange} className="form-control mb-3">
                                        <option value="">Sélectionner un équipement</option>
                                        {equipements.map(eq => <option key={eq.idE} value={eq.idE}>{eq.nom}</option>)}
                                    </select>

                                    <select name="idU" value={selectedIntervention?.idU || newIntervention.idU} onChange={handleChange} className="form-control mb-3">
                                        <option value="">Sélectionner un utilisateur</option>
                                        {utilisateurs.map(ut => <option key={ut.idU} value={ut.idU}>{ut.nom}</option>)}
                                    </select>

                                    <input type="text" name="typeI" placeholder="Type d'intervention" value={selectedIntervention?.typeI || newIntervention.typeI} onChange={handleChange} className="form-control mb-3" />
                                    <input type="date" name="dateDeb" value={selectedIntervention?.dateDeb || newIntervention.dateDeb} onChange={handleChange} className="form-control mb-3" />
                                    <input type="number" name="duree" placeholder="Durée (en heures)" value={selectedIntervention?.duree || newIntervention.duree} onChange={handleChange} className="form-control mb-3" />
                                    <textarea name="descriptionI" placeholder="Description de l'intervention" value={selectedIntervention?.descriptionI || newIntervention.descriptionI} onChange={handleChange} className="form-control mb-3" />
                                    <select name="statutI" value={selectedIntervention?.statutI || newIntervention.statutI} onChange={handleChange} className="form-control mb-3">
                                        <option value="En cours">En cours</option>
                                        <option value="Terminée">Terminée</option>
                                        <option value="Annulée">Annulée</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={selectedIntervention ? handleEditIntervention : handleAddIntervention} className="btn btn-primary">
                                        {selectedIntervention ? 'Modifier' : 'Ajouter'}
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

export default GestionInterventions;
