import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '..styles.css';

const Login = () => {
  return (
    <div className='container'>
        <div className='form'>
            <h1>Login Page</h1>
            <form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Your username' size='sm' className='small-input' />
                </Form.Group>
                {/* Add more form controls with size='sm' if needed */}
            </form>
        </div>
    </div>
  )
}

export default Login;
