import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState} from 'react';
import {Card, Button, Form, Alert} from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { auth } from '../../firebase/initialize';
import { signUp } from '../../firebase/signUp';
import CenteredContainer from '../CenteredContainer';
import HeadCard from './HeadCard';

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const regexPassword = /^.{4,12}$/;

        if(!regexPassword.test(passwordRef.current.value)) {
            return setError('Length of the password wrong');
        } else if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            const res = await signUp(emailRef.current.value, passwordRef.current.value);
            if(res) throw new Error(res);
        } catch(err) {
            setError(err.message);
        }
        
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'SignUp -- Dove';

        return onAuthStateChanged(auth, (user) => {
            if(user)  navigate('/');
        });
    }, [navigate]);

  return (
    <CenteredContainer>
        <Card.Body>
            <HeadCard title='SignUp' paragrah='Register to use Dove manager'/>
            {error && <Alert variant='danger' className='text-center'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef}/>
                </Form.Group>
                <Form.Group id='password-confirm'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef}/>
                </Form.Group>
                <Button disabled={loading} type='submit' className='w-100 mt-2'>Sign Up</Button>
            </Form>
        </Card.Body>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log In</Link>
        </div>
    </CenteredContainer>
  );
}

export default Signup;
