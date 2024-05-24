import { useState } from 'react';

const useModificarPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const modificarPassword = async (id, jwtLogin, newPassword) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/api/usuario/modificarPassword/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${jwtLogin}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                throw new Error('Error al modificar la contraseña');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { modificarPassword, isLoading, error, data };
};

export default useModificarPassword;