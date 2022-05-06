import React, {useRef, useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {Card, Button, Form, Alert} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { auth } from '../../firebase/initialize';
import { login } from '../../firebase/login';
import CenteredContainer from '../CenteredContainer';
import HeadCard from './HeadCard';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        try {
            const {error} = await login(emailRef.current.value, passwordRef.current.value);
            
            if(error) throw new Error(error);

        } catch(err) {
            setError(err.message);
        }

        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Login -- Dove';
        
        return onAuthStateChanged(auth, (user) => {
            if(user)  navigate('/principal');
        });
    }, [navigate]);

  return (
    <CenteredContainer>
        <Card.Body>
            <HeadCard title='Log In' paragrah='Go to Dove manager'/>
            {error && <Alert variant='danger' className='text-center'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required/>
                </Form.Group>
                <Button disabled={loading} type='submit' className='w-100 mt-2'>Log In</Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
        </Card.Body>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
    </CenteredContainer>
  );
}

export default Login;
