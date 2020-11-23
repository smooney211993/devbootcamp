import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  adminUserCreate,
  adminUserCreateReset,
} from '../../actions/userActions';

const UserCreateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { user, success, error, loading } = useSelector(
    (state) => state.userCreate
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords Do Not Match');
    } else {
      dispatch(
        adminUserCreate({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(adminUserCreateReset());
    if ((user !== null && user._id) || success) {
      history.push(`/admin/user/${user._id}`);
    }
  }, [dispatch, history, user, success]);
  return (
    <>
      <Container>
        <Row className='text-align-center'>
          <Col>
            <h3>
              <i className='fas fa-edit '></i> Create User
            </h3>
          </Col>
          <Col className='text-right'>
            <Link to='/admin/users'>
              {' '}
              <Button variant='light' className='m-2'>
                Back
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={formData.name}
                  name='name'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={formData.email}
                  name='email'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as='select'
                  name='role'
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }>
                  {['user', 'publisher', 'admin'].map((role, i) => (
                    <option key={i} value={role}>
                      {role}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={formData.password}
                  minLength={6}
                  name='password'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmpassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Please Confirm Password'
                  minLength={6}
                  value={formData.confirmPassword}
                  name='confirmPassword'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserCreateScreen;
