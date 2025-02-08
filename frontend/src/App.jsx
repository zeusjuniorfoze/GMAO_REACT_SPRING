import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

import UsersList from './page/admin';
import GestionnaireDashboard from './page/Gestionnaire';
import ClientDashboard from './page/Client';

function App() {
    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        const handleStorageChange = () => {
            setRole(localStorage.getItem('role'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Gérer le cas où role est null */}
                <Route path="/admin" element={<UsersList />} />
               {/* Route par défaut pour les 404 */}

            </Routes>
        </Router>
    );
}

export default App;