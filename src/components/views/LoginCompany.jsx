import React from 'react';
import axios from 'axios';
import DenseAppBar from '../headers/DenseAppBar';
import LoginCard from '../cards/LoginCard';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export function LoginCompany() {

    const {loginEnterprise} = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/api/login/empresa`, {
                correo: email,
                contrasena: password
            });

            const idEmpresa = response.data;
            console.log('ID Persona:', idEmpresa);


            if (idEmpresa !== 0) {
                localStorage.setItem('idEmpresa', idEmpresa);
                loginEnterprise();
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
