import React from 'react';
import axios from 'axios';
import DenseAppBar from '../headers/DenseAppBar';
import LoginCard from '../cards/LoginCard';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export function Login() {
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/api/login/solicitante`, {
                correo: email,
                contrasena: password
            });

            const idPersonaSoli = response.data;
            console.log('ID Persona:', idPersonaSoli);

            if (idPersonaSoli !== 0) {
                navigate(`/home`);
            } else {
                console.error('ID de solicitante inválido');
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
