import React, {useState} from 'react';
import {Button, Form, Alert, Container, Row} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { auth } from '../../firebase/initialize';
import { profileUpdate } from '../../firebase/update';
import Col from './Col';

function UpdateProfile() {
    const currentUser = auth.currentUser;
    const {displayName, email} = currentUser;
    const initialState = {
        name: {
            value: displayName ? displayName : '',
            border: ''
        },
        email: {
            value: email,
            border: ''
        },
        photo: {
            value: '',
            files: {},
            border: ''
        },
        password: {
            value: '',
            border: ''
        },
        passwordConfirm: {
            value: '',
            border: ''
        },
        
    }
    const [updateProfile, setUpdateProfile] = useState(initialState);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const {name, value, files} = e.target;
        const newValue = name === 'photo' ? {
            value,
            files: files[0],
            border: ''
        } : {
            value,
            border: ''
        };

        setUpdateProfile(prevState => ({
            ...prevState,
            [name]: newValue
        }))
    }

    const setBorder = (name, state, border) => {
        setUpdateProfile(prevState => ({
            ...prevState,
            [name]: {
                ...state,
                border
            }
        }));
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        let data = {};
        const promises = [];

        const {email, name, password, passwordConfirm, photo: {files, value}} = updateProfile;

        const regex = {
            name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
            password: /^.{4,12}$/, 
            email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            photo: /image\/(jpg|jpeg|png|)$/
        }


        if(password.value) {
            if(regex.password.test(password.value)) {
                setBorder('password', password, 'success');
                if(password.value === passwordConfirm.value) {
                    setBorder('passwordConfirm', passwordConfirm, 'success');
                    data = {
                        ...data,
                        password: password.value
                    }
                } else {
                    return setBorder('passwordConfirm', passwordConfirm, 'danger');
                }   
            } else {
                setBorder('passwordConfirm', passwordConfirm, 'danger');
                return setBorder('password', password, 'danger');
            }       
        }
        if(passwordConfirm.value) {
            if(password.value && regex.password.test(password.value) && password.value === passwordConfirm.value) {
                setBorder('password', password, 'success');
                setBorder('passwordConfirm', passwordConfirm, 'success');
                data = {
                    ...data,
                    password: password.value
                }  
            } else {
                return setBorder('passwordConfirm', passwordConfirm, 'danger');
            }  
        }
        if(email.value !== currentUser.email) {
            if(regex.email.test(email.value)) {
                setBorder('email', email, 'success');
                data = {
                    ...data,
                    email: email.value
                }
            } else {
                return setBorder('email', email, 'danger');
            }
        }
        if(name.value && displayName) {
            if(name.value !== displayName) {
                if(name.value.length > 2 && name.value !== displayName && regex.name.test(name.value)) {
                    setBorder('name', name, 'success');
                    data = {
                        ...data,
                        profile: {
                            ...data.profile,
                            displayName: name.value
                        }
                    }
                } else {
                    return setBorder('name', name, 'danger');
                }
            }
        } else {
            if(name.value) {
                if(regex.name.test(name.value)) {
                    setBorder('name', name, 'success');
                    data = {
                        ...data,
                        profile: {
                            ...data.profile,
                            displayName: name.value
                        }
                    }
                } else {
                    return setBorder('name', name, 'danger');
                }
            }
        }
        if(value) {
            if(regex.photo.test(files.type) && (files.size / 1024) > 45.500) {
                setBorder('photo', updateProfile.photo, 'success');
                data = {
                    ...data,
                    profile: {
                        ...data.profile,
                        photoURL: files
                    }
                }
            } else {
                return setBorder('photo', updateProfile.photo, 'danger');
            }
        }
        
        for(let item in data) {
            promises.push(profileUpdate[item](data[item]));
        };
        
        setLoading(true);
        Promise.all(promises)
        .then(() =>  {
            setLoading(false);
            window.location.reload()
        })
        .catch(err => setError('Failed to update the account'))
    
    }

  return (
    <Container className='w-50:sm'>
        <Row className='mt-2'>
            <h2 className="text-center mb-4 fs-3">Update Profile</h2>
        </Row>
        <Row>
            {error && (
                <div className='w-100 px-3'><Alert variant='danger' className='text-center'>{error}</Alert></div>
            )}
        </Row>
        <Row>
            <Form onSubmit={handleSubmit}>
                <Row className='mb-2 mb-sm-3'>
                    <Col id='photo' label='Profile photo' type='file' updateProfile={updateProfile} handleChange={handleChange}/>

                    <Col id='name' label='Name' type='text' updateProfile={updateProfile} handleChange={handleChange} placeholder='Type your name'/>
                </Row>

                <Row className='mb-2 mb-sm-3'>
                    <Col id='email' label='Email' type='email' updateProfile={updateProfile} handleChange={handleChange}/>
                    <Col id='password' label='Password' type='password' updateProfile={updateProfile} handleChange={handleChange} placeholder='Leave blank to keep the same'/>
                </Row>
                <Row className='mb-2 mb-sm-3'>
                    <Col id='passwordConfirm' label='Password Confirmation' type='password' updateProfile={updateProfile} handleChange={handleChange} placeholder='Leave blank to keep the same'/>
                </Row>
                <Row className="mt-3 row d-flex justify-content-center">
                    <Button disabled={loading} type='submit' className='col-4 mt-2'>Update</Button>
                </Row>
            </Form>
        </Row>
        <Row className='w-100 my-2 text-center'>
            <div className='col'>
                <Link to='/principal' className='link-danger text-decoration-none'>Cancel</Link>
            </div>
        </Row>
    </Container>
  );
}

export default UpdateProfile;
