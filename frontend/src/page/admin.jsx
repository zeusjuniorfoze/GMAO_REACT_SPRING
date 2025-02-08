import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../assets/css/admin.css';
import Navbar from "../components/navbar";
import GestionEquipements from '../components/GestionEquipements';
import GestionInterventions from '../components/GestionInterventions';
import GestionUsers from '../components/GestionUsers';

const Sidebar = ({ activePage, setActivePage }) => (
    <div className="sidebar">
        <ul className="menu">
            {[{ id: "page1", label: "Accueil", icon: "bx-home" },
            { id: "page2", label: "Gestion Des Utilisateurs", icon: "bx-user-circle" },
            { id: "page3", label: "Gestion Des Equipements", icon: "bx-wrench" },
            { id: "page4", label: "Planifier Des Interventions", icon: "bx-bell" },
            { id: "page5", label: "Paramètre", icon: "bx-cog" },
            { id: "page6", label: "Aide", icon: "bx-help-circle" }].map(({ id, label, icon }) => (
                <li key={id} className={activePage === id ? "active" : ""}>
                    <a href={`#${id}`} onClick={(e) => { e.preventDefault(); setActivePage(id); }}>
                        <i className={`bx ${icon}`}></i> {label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);
const Admin = () => {
    const [activePage, setActivePage] = useState("page1"); // Définition de l'état

    return (
        <div>
            <Navbar />
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="content">
                <div id="page1" className={`page ${activePage === "page1" ? "active" : ""}`}>
                    <p className="home" style={{ textAlign: "center", fontSize: "30px" }}>BIENVENUE SUR LA GMAO</p>
                </div>
                <div id="page2" className={`page ${activePage === "page2" ? "active" : ""}`}>
                    <GestionUsers />
                </div>
                <div id="page3" className={`page ${activePage === "page3" ? "active" : ""}`}>
                    <GestionEquipements />
                </div>
                <div id="page4" className={`page ${activePage === "page4" ? "active" : ""}`}>
                    <GestionInterventions />
                </div>
                <div id="page5" className={`page ${activePage === "page5" ? "active" : ""}`}>
                    <h1>Paramètres</h1>
                </div>
                <div id="page6" className={`page ${activePage === "page6" ? "active" : ""}`}>
                    <h1>Aide</h1>
                </div>
            </div>
        </div>
    );
};
export default Admin;