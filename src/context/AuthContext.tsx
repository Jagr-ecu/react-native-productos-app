import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cafeApi from '../api/cafeApi';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'non-authenticated';
    signUp: ( obj: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');

        if ( !token ) return dispatch({ type:'notAuthenticated' });

        const resp = await cafeApi.get('/auth');
        if ( resp.status !== 200 ){
            return dispatch({ type: 'notAuthenticated' });
        }

        //guarda de nuevo un token por jws tiene una vigencia
        await AsyncStorage.setItem('token', resp.data.token);
        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.user,
            },
        });

    };

    const signIn = async( { correo, password }: LoginData ) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                },
            });
            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error: any){
            
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Informacion incorrecta',
            });
        }
    };

    const signUp = async({ nombre, correo, password }:RegisterData ) => {
        try {
            const resp = await cafeApi.post<LoginResponse>(
                '/usuarios',
                { nombre, correo, password }  
            );

            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                },
            });

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error:any){
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Informacion incorrecta',
            });
        }
    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    );
};
