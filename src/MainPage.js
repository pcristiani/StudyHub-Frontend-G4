import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './context/AuthContext';
import { authReducer } from './context/authReducer';
import { AppRouter } from './routers/AppRouter';


const init = () => {
  const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
  return userCookie ? JSON.parse(decodeURIComponent(userCookie.split('=')[1])) : { logged: false };
}

export const MainPage = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/`;
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={{
        user, dispatch
      }}>
        <AppRouter />
      </AuthContext.Provider>
     </>
  )

}