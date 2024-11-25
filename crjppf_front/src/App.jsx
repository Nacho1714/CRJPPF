import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import './App.css'

import RoutePrivate from './components/RoutePrivate'

import Login from './pages/Login';
import Detail from './pages/Detail';
import Summary from './pages/Summary'

import Dashboard from './pages/Dashboard';
import ModalLogout from './components/modal/ModalLogout';

function App() {

    const navigate = useNavigate()
    const [isAutenticate, setIsAutenticate] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem('token')

        token
            ? setIsAutenticate(true)
            : setIsAutenticate(false)

    }, [])

    function onLogin(token) {

        if (token) {
            localStorage.setItem('token', token)
            setIsAutenticate(true)
            navigate('/')
        } else {
            localStorage.removeItem('token')
            setIsAutenticate(false)
        }
    }

    useEffect(() => {

        const token = localStorage.getItem('token');

        if (!token) return 

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;  // Convertir a segundos
        if (decodedToken.exp < currentTime) setShowConfirm(true)

    }, [navigate, setIsAutenticate]);

    return (

        <>
        <ModalLogout 
            setShowConfirm={setShowConfirm} 
            showConfirm={showConfirm}
            setIsAutenticate={setIsAutenticate}
        />

        <Routes>

            <Route path="/login" exact={true} element={<Login onLogin={onLogin} />} />

            <Route path="/" exact={true} element={
                <RoutePrivate isAutenticate={isAutenticate} setIsAutenticate={setIsAutenticate}>
                    <Dashboard />
                </RoutePrivate>
            } />

            <Route path="/visitor/:id" exact={true} element={
                <RoutePrivate isAutenticate={isAutenticate} setIsAutenticate={setIsAutenticate}>
                    <Detail />
                </RoutePrivate>
            } />
            
            <Route path="/summary" exact={true} element={
                <RoutePrivate isAutenticate={isAutenticate} setIsAutenticate={setIsAutenticate}>
                    <Summary />
                </RoutePrivate>
            } />

        </Routes>

        </>

    )
}

export default App
