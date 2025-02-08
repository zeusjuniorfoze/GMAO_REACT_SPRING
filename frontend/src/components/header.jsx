import React from 'react';

// Importation des styles (optionnel si vous utilisez un fichier CSS séparé)
import '../assets/css/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <a href="/">RespringBout</a>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="/">Accueil</a>
                    </li>
                    <li className="nav-item">
                        <a href="/produits">Produits</a>
                    </li>
                    <li className="nav-item">
                        <a href="/contact">Contact</a>
                    </li>
                    <li className="nav-item">
                        <a href="/a-propos">À propos</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
