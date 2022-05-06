import React, {useRef, useState, useEffect} from 'react';
import {Card, Button, Form, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../firebase/reset';
import CenteredContainer from '../CenteredContainer';
import HeadCard from './HeadCard';

function ForgotPassword() {
    const emailRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        try {
            const {error} = await resetPassword(emailRef.current.value);

            if(error) throw new Error(error);

            setMessage('Check your email for further instructions');
            emailRef.current.value = '';
            
            setLoading(false);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch(err) {
            setError(err.message);
        }

        setLoading(false);
    }

    useEffect(() => {
        document.title = 'ForgotPassword -- Dove';
    }, []);
    
  return (
    <CenteredContainer>
        <Card.Body>
            <HeadCard title='Password Reset' paragrah='Type down your email to restore the password'/>
            {error && !message && <Alert variant='danger' className='text-center'>{error}</Alert>}
            {message && <Alert variant='success' className='text-center'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                </Form.Group>
                <Button disabled={loading} type='submit' className='w-100 mt-2'>Reset Password</Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to='/login'>Login</Link>
            </div>
        </Card.Body>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
    </CenteredContainer>
  );
}

export default ForgotPassword;
