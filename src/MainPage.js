import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';
import { AppRouter } from './routers/AppRouter';

// document.cookie
const init = () => {
  const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
  return userCookie ? JSON.parse(decodeURIComponent(userCookie.split('=')[1])) : { logged: false };
}

export const MainPage = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  // Establecemos la cookie user en el estado del usuario
  useEffect(() => {
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/`;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user, dispatch
    }}>
      <AppRouter />
    </AuthContext.Provider>
  )
}


// Otro ejemplo con LocalStorage
// const init = () => {
//   return JSON.parse(localStorage.getItem('user')) || { logged: false };
// }

// export const MainPage = () => {
//   const [user, dispatch] = useReducer(authReducer, {}, init);

//   useEffect(() => {
//     if (!user) return;
//     localStorage.setItem('user', JSON.stringify(user));
//   }, [user]);

//   return (
//     <AuthContext.Provider value={{
//       user, dispatch
//     }}>
//       <AppRouter />
//     </AuthContext.Provider>
//   )
// }
