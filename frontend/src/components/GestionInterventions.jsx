import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestionInterventions = () => {
    const [interventions, setInterventions] = useState([]);
    const [equipements, setEquipements] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newIntervention, setNewIntervention] = useState({
        idE: '',
        idU: '',
        typeI: '',
        dateDeb: '',
        duree: '',
        descriptionI: '',
        statutI: 'En cours'
    });
    const [selectedIntervention, setSelectedIntervention] = useState(null);

    useEffect(() => {
        fetchInterventions();
        fetchEquipements();
        fetchUtilisateurs();
    }, []);

    const fetchInterventions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/interventions');
            setInterventions(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des interventions', error);
        }
    };

    const fetchEquipements = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/equipements');
            setEquipements(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des équipements', error);
        }
    };

    const fetchUtilisateurs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUtilisateurs(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (selectedIntervention) {
            setSelectedIntervention({ ...selectedIntervention, [name]: value });
        } else {
            setNewIntervention({ ...newIntervention, [name]: value });
        }
    };

    const handleAddIntervention = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8080/api/interventions?equipementId=${newIntervention.idE}&userId=${newIntervention.idU}`, // URL avec les IDs
                { // Corps de la requête (sans les IDs)
                    typeI: newIntervention.typeI,
                    dateDeb: newIntervention.dateDeb,
                    duree: newIntervention.duree,
                    descriptionI: newIntervention.descriptionI,
                    statutI: newIntervention.statutI
                }
            );
            setInterventions([...interventions, response.data]);
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'intervention", error);
        }
    };

    const handleEditIntervention = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/interventions/${selectedIntervention.idI}`, selectedIntervention);
            setInterventions(interventions.map(intv => intv.idI === selectedIntervention.idI ? response.data : intv));
            closeModal();
        } catch (error) {
            console.error("Erreur lors de la modification de l'intervention", error);
        }
    };

    const handleDelete = async (idI) => {
        try {
            await axios.delete(`http://localhost:8080/api/interventions/${idI}`);
            setInterventions(interventions.filter(intv => intv.idI !== idI));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'intervention", error);
        }
    };

    const closeModal = () => {
        setModalShow(false);
        setSelectedIntervention(null);
        setNewIntervention({ idE: '', idU: '', typeI: '', dateDeb: '', duree: '', descriptionI: '', statutI: 'En cours' });
    };

    return (
        <div>
            <h1>Gestion des interventions</h1>
            <button className="btn btn-primary" onClick={() => setModalShow(true)}>
                <i className="bx bx-plus-circle"></i>  Ajouter une intervention
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
                    {interventions
                        .filter(intv => intv.descriptionI.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(intv => (
                            <tr key={intv.idI}>
                                <td>{intv.idI}</td>
                                <td>{equipements.find(eq => eq.idE === intv.idE)?.nom || '1'}</td>
                                <td>{utilisateurs.find(ut => ut.idU === intv.idU)?.nom || '2'}</td>
                                <td>{intv.typeI}</td>
                                <td>{intv.dateDeb}</td>
                                <td>{intv.duree}</td>
                                <td>{intv.descriptionI}</td>
                                <td>{intv.statutI}</td>
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

            {modalShow && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>{selectedIntervention ? 'Modifier' : 'Ajouter'} une intervention</h5>
                                <button className="close" onClick={closeModal}>×</button>
                            </div>
                            <div className="modal-body">
                                {/* Sélection de l'équipement */}
                                <select name="idE" value={selectedIntervention?.idE || newIntervention.idE} onChange={handleChange} className="form-control mb-3">
                                    <option value="">Sélectionner un équipement</option>
                                    {equipements.map(eq => <option key={eq.idE} value={eq.idE}>{eq.nom}</option>)}
                                </select>

                                {/* Sélection de l'utilisateur */}
                                <select name="idU" value={selectedIntervention?.idU || newIntervention.idU} onChange={handleChange} className="form-control mb-3">
                                    <option value="">Sélectionner un utilisateur</option>
                                    {utilisateurs.map(ut => <option key={ut.idU} value={ut.idU}>{ut.nom}</option>)}
                                </select>

                                {/* Type de l'intervention */}
                                <input type="text" name="typeI" placeholder="Type d'intervention" value={selectedIntervention?.typeI || newIntervention.typeI} onChange={handleChange} className="form-control mb-3" />

                                {/* Date de début */}
                                <input type="date" name="dateDeb" value={selectedIntervention?.dateDeb || newIntervention.dateDeb} onChange={handleChange} className="form-control mb-3" />

                                {/* Durée */}
                                <input type="number" name="duree" placeholder="Durée (en heures)" value={selectedIntervention?.duree || newIntervention.duree} onChange={handleChange} className="form-control mb-3" />

                                {/* Description */}
                                <textarea name="descriptionI" placeholder="Description de l'intervention" value={selectedIntervention?.descriptionI || newIntervention.descriptionI} onChange={handleChange} className="form-control mb-3" />

                                {/* Statut */}
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
                                <button className="btn btn-secondary" onClick={closeModal}>Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GestionInterventions;
