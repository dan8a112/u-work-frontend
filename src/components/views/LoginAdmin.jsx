import React from 'react';
import axios from 'axios';
import DenseAppBar from '../headers/DenseAppBar';
import LoginCard from '../cards/LoginCard';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export function LoginAdmin() {
    const navigate = useNavigate();

    const {loginAdmin} = useAuth();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/api/login/admin`, {
                correo: email,
                contrasena: password
            });

            const idAdmin = response.data;
            console.log('ID Admin:', idAdmin);

            if (idAdmin !== 0) {
                localStorage.setItem('idAdmin', idAdmin);
                loginAdmin();
                navigate(`/homeAdmin`);
            } else {
                console.error('ID de administrador inválido');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };

    return (
        <div>
            <DenseAppBar />
            <LoginCard onLogin={handleLogin} />
        </div>
    );
}
