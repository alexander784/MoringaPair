import React from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import '../styles.css';


const Login = () => {
  return (
    <div className='container'>
        <div className='form'>
            <h1>Login Page</h1>
            <form>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type='text' placeholder='Your username' size='sm' className='small-input' />
                </Form.Group>

                <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Your Password..'size />

            </Form.Group>
            


            </form>
        </div>
    </div>
  )
}

export default Login;
