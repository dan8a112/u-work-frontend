import React from 'react';
import axios from 'axios';
import DenseAppBar from '../headers/DenseAppBar';
import LoginCard from '../cards/LoginCard';
import { useNavigate } from 'react-router-dom';

export function LoginCompany() {
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5001/api/login/empresa', {
                correo: email,
                contrasena: password
            });

            const idEmpresa = response.data;
            console.log('ID Persona:', idEmpresa);

            if (idEmpresa !== 0) {
                localStorage.setItem('idEmpresa', idEmpresa);
                navigate(`/homeEnterprise/${idEmpresa}`);
            } else {
                console.error('ID de empresa inválido');
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
