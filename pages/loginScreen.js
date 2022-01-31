import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const loginScreen = () => {

    const loginwithGoogle = () => {
        signInWithPopup(auth, provider);
    }
    return (
        <Container>
            <Login>
                <Image
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                    height={100}
                    width={100}
                />
                <Button
                    style={{ color: 'gray' }}
                    startIcon={<GoogleIcon />}
                    onClick={() => loginwithGoogle()}
                >
                    LogIn with google
                </Button>
            </Login>
        </Container>
    );
};

export default loginScreen;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: rgb(0, 150, 136);
    width: 100vw;
`;

const Login = styled.div`
    padding: 30px;
    display: flex;
    gap: 20px;
    background-color: white;
    border-radius: 15px;
`;