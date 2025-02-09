import React, { useState } from 'react';
import '../assets/css/AuthPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';


const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="auth-page">
            <header className="header">
                <nav className="nav">
                    <a href="#" className="nav_logo">
                        Gestion Des Maintenances Assister Par Ordinateur
                    </a>
                </nav>
            </header>

            <section className="home show">
                <div className="form_container">
                    {showLogin ? (
                        <LoginForm />
                    ) : null}
                </div>
                {!showLogin && (
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                )}
            </section>
        </div>
    );
};

const InputField = ({ label, type, value, onChange, error }) => (
    <div className="mb-3">
        <input
            type={type}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder={label}
            value={value}
            onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
);


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState({});
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!validateEmail(email)) errors.email = 'Email invalide';
        if (!password) errors.password = 'Mot de passe requis';

        if (Object.keys(errors).length > 0) {
            setMessages(errors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('role', data.role);

                alert('Connexion réussie !');

                const role = localStorage.getItem('role');
                switch (role) {
                    case 'ADMIN':
                        window.location.href = '/admin';
                        break;
                    case 'GESTIONNAIRE':
                        window.location.href = '/gestionnaire';
                        break;
                    case 'CLIENT':
                        window.location.href = '/client';
                        break;
                    default:
                        break;
                }
            } else {
                const data = await response.json();
                setMessages({ serverError: data.message || 'Erreur de connexion' });
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            setMessages({ serverError: 'Erreur de connexion' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            <InputField
                label="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={messages.email}
            />
            <InputField
                label="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={messages.password}
            />
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Connexion en cours...' : 'Login Now'}
            </button>

            {messages.serverError && <div className="invalid-feedback d-block">{messages.serverError}</div>}

        </form>
    );
};

export default AuthPage;