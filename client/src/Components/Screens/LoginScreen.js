import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userLogin } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../Layout/Message';
import Spinner from '../Layout/Spinner';

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.userLoginRegister
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  return (
    <Container className='my-2'>
      {error && <Message className='my-2 p-2'>{error.msg}</Message>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Form onSubmit={onSubmitHandler} className='my-2'>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer <Link to={'/register'}>Register</Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default LoginScreen;
