import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  loadUser,
  userUpdate,
  userUpdateReset,
} from '../../actions/userActions';
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  ListGroup,
  Card,
} from 'react-bootstrap';

import Spinner from '../Layout/Spinner';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userLoginRegister);
  const { success } = useSelector((state) => state.userUpdate);
  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(userUpdateReset());
    if (!user.name || success) {
      dispatch(loadUser());
    } else {
      setFormData({
        ...formData,
        name: user.name,
        email: user.email,
      });
    }
  }, [dispatch, user, success]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Row>
            <Col>
              <Link to='/'>
                <Button variant='light' type='button' className='my-2'>
                  Back
                </Button>
              </Link>
              <h3>
                <i className='fas fa-user-circle m-2'></i>
                General Account Settings
              </h3>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Name</Col>
                    <Col xs={6}>
                      <Row>
                        <Col>
                          <div hidden={showName}>{user.name}</div>
                          <Card hidden={!showName}>
                            <Card.Body>
                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  dispatch(userUpdate({ name: formData.name }));
                                }}>
                                <Form.Group controlId='name'>
                                  <Form.Label>Name</Form.Label>
                                  <Form.Control
                                    name='name'
                                    type='text'
                                    value={formData.name}
                                    onChange={formHandler}></Form.Control>
                                </Form.Group>

                                <Button
                                  type='submit'
                                  variant='light'
                                  className='m-2'>
                                  Submit
                                </Button>
                                <Button
                                  className='m-2'
                                  type='button'
                                  variant='light'
                                  onClick={(e) => setShowName(!showName)}>
                                  Cancel
                                </Button>
                              </Form>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='text-right'>
                      <i
                        className='fas fa-edit'
                        onClick={(e) => setShowName(!showName)}></i>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Email</Col>
                    <Col xs={6}>
                      <Row>
                        <Col>
                          <div hidden={showEmail}>{user.email}</div>
                          <Card hidden={!showEmail}>
                            <Card.Body>
                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  if (
                                    formData.email !== formData.confirmEmail
                                  ) {
                                    alert('Emails Do Not Match');
                                  } else {
                                    dispatch(
                                      userUpdate({ email: formData.email })
                                    );
                                  }
                                }}>
                                <Form.Group controlId='email'>
                                  <Form.Label>Enter New Email</Form.Label>
                                  <Form.Control
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={formHandler}></Form.Control>
                                </Form.Group>
                                <Form.Group controld='confirmemail'>
                                  <Form.Label>Confirm Email</Form.Label>
                                  <Form.Control
                                    type='email'
                                    value={formData.confirmEmail}
                                    name='confirmEmail'
                                    onChange={formHandler}></Form.Control>
                                </Form.Group>

                                <Button
                                  type='submit'
                                  variant='light'
                                  className='m-2'>
                                  Submit
                                </Button>
                                <Button
                                  onClick={(e) => setShowEmail(!showEmail)}
                                  type='button'
                                  variant='light'
                                  className='m-2'>
                                  Cancel
                                </Button>
                              </Form>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='text-right'>
                      {' '}
                      <i
                        className='fas fa-edit'
                        onClick={(e) => setShowEmail(!showEmail)}></i>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Password</Col>
                    <Col xs={6}>
                      <div hidden={showPassword}>xxxxxxxxxxxx</div>
                      <Card hidden={!showPassword}>
                        <Card.Body>
                          {' '}
                          <Form>
                            <Form.Group>
                              <Form.Label>Enter Current Password</Form.Label>
                              <Form.Control
                                type='password'
                                name='currentPassword'
                                value={formData.currentPassword}
                                onChange={formHandler}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Enter New Password</Form.Label>
                              <Form.Control
                                type='password'
                                name='newPassword'
                                value={formData.newPassword}
                                onChange={formHandler}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Confirm New Password</Form.Label>
                              <Form.Control
                                type='password'
                                name='confirmNewPassword'
                                value={formData.confirmNewPassword}
                                onChange={formHandler}></Form.Control>
                            </Form.Group>
                            <Button
                              type='submit'
                              variant='light'
                              className='m-2'>
                              Submit
                            </Button>
                            <Button
                              onClick={(e) => setShowPassword(!showPassword)}
                              type='button'
                              variant='light'
                              className='m-2'>
                              Cancel
                            </Button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col className='text-right'>
                      {' '}
                      <i
                        className='fas fa-edit'
                        onClick={(e) => setShowPassword(!showPassword)}></i>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProfileScreen;
