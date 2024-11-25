import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useSnackbar } from 'notistack';

export default function ModalLogout({ showConfirm, setShowConfirm, setIsAutenticate }) {

    const navigate = useNavigate()

    const confirm = async () => {
        
        setShowConfirm(false)
        localStorage.clear()
        setIsAutenticate(false);
        navigate('/login');  
    }

    const confirmButtonRef = useRef(null);

    useEffect(() => {

        if (!showConfirm) return
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                confirmButtonRef.current.click();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [showConfirm]);

    return (
        <>

            <Modal
                show={showConfirm}
                centered
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header closeButton>
                    <Modal.Title> ¡Atención! </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {"Tu sesión ha expirado. Para continuar, por favor, inicia sesión nuevamente."}
                </Modal.Body>

                <Modal.Footer>

                    <Button
                        ref={confirmButtonRef}
                        variant="primary"
                        type='submit'
                        onClick={confirm}
                    >
                        Confirmar
                    </Button>

                </Modal.Footer>

            </Modal>
        </>
    );
}
