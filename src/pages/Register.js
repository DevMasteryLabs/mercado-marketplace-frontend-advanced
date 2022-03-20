import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Form from '../components/Form';
import Input from '../components/Input';
import { alertError } from '../utils/feedback';
import { requestRegister } from '../redux/actions/userActionCreators';

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();       
        const {firstName, lastName, email, password, confirmPassword} = registerData
        if (!firstName) {
            return alertError('First name is required')
        }
        if (!lastName) {
            return alertError('Last name is required')
        }
        if (!email) {
            return alertError('Email is required')
        }
        if (!password) {
            return alertError('Password is required')
        }
        if (!confirmPassword) {
            return alertError('You have to confirm your password')
        }
        if (password !== confirmPassword) {
            return alertError('Passwords mismatch')
        }
        dispatch(requestRegister({ firstName, lastName, email, password }, history))       
    }
    function handleChange(e) {
        setRegisterData(prevItemData => ({...prevItemData, [e.target.name]: e.target.value}))
    }
    return (
        <Form handleSubmit={handleSubmit} title='Sign up'>
            <Input 
                id='sign-up-first-name'
                type='text'
                label='First name'
                placeholder='Jane' 
                value={registerData.firstName}
                onChange={handleChange}
                name='firstName'
            />
            <Input 
                id='sign-up-last-name'
                type='text'
                label='Last name'
                placeholder='Doe' 
                value={registerData.lastName}
                onChange={handleChange}
                name='lastName'
            />
            <Input 
                id='sign-up-email'
                type='email'
                label='Email address'
                placeholder='name@example.com' 
                value={registerData.email}
                onChange={handleChange}
                name='email'
            />
            <Input 
                id='sign-up-password'
                type='password'
                label='Password'
                placeholder='Password'
                value={registerData.password}
                onChange={handleChange}
                name='password'
            />
            <Input 
                id='sign-up-confirm-password'
                type='password'
                label='Confirm Password'
                placeholder='Confirm Password'
                value={registerData.confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
            />
        </Form>
    )
}

export default Login;