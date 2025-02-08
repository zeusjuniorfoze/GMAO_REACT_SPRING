import React from 'react';
import TypingAnimation from '../components/TypingAnimation';
import '../assets/css/home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Bouton de connexion */}
            <div className="login-button">
                <button className="styled-button">Connexion</button>
            </div>

            {/* Texte principal avec animation */}
            <div className="home-content">
                {/* Utiliser TypingAnimation avec un tag h1 */}
                <TypingAnimation text="Bienvenue sur RespringBout" speed={100} as="h1" />
                <p>Découvrez nos derniers produits et offres exceptionnelles.</p>
            </div>
        </div>
    );
};

export default Home;
