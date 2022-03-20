import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/Form';
import Input from '../components/Input';
import { requestLogin } from '../redux/actions/userActionCreators';
import { alertError } from '../utils/feedback';

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        console.log({email, password});
        e.preventDefault();
        if (!email) {
            return alertError('Email is required')
        }
        if (!password) {
            return alertError('Password is required')
        }
        dispatch(requestLogin(email, password))        
    }

    return (
        <Form handleSubmit={handleSubmit} title='Sign in'>
            <Input 
                id='floatingInput'
                type='email'
                label='Email address'
                placeholder='name@example.com' 
                value={email} 
                onChange={(event) => setEmail(event.target.value)}
            />
            <Input 
                id='floatingPassword'
                type='password'
                label='Password'
                placeholder='Password'
                value={password} 
                onChange={(event) => setPassword(event.target.value)}
            />
        </Form>
    )
}

export default Login;