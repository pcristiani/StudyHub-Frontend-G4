import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams();
    const [resetToken, setResetToken] = useState(null);

    useEffect(() => {
        if (token) {
            setResetToken(token);
        }
    }, [token]);

    // Ahora puedes usar resetToken en tu componente
    // ...

    return (

        console.log("token: ", token)
    );
}

export default ResetPassword;