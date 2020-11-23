import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';
import { Link } from 'react-router-dom';

import {
  getUser,
  adminUserUpdateReset,
  adminUserUpdate,
} from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const UserEditScreen = ({ match }) => {
  const userId = match.params.userId;
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, success, error: updateError } = useSelector(
    (state) => state.adminUserUpdate
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  useEffect(() => {
    dispatch(adminUserUpdateReset());
    if (!user || user._id !== userId || success) {
      dispatch(getUser(userId));
    } else {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [dispatch, userId, success, user]);

  return (
    <>
      <Container>
        <Row className='text-align-center'>
          <Col>
            <h3>
              <i className='fas fa-edit '></i> Edit User
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
            {error && <Message>{error.msg}</Message>}
            {updateError && <Message>{updateError.msg}</Message>}
            {loading || updateLoading ? (
              <Spinner />
            ) : (
              <>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(adminUserUpdate(userId, formData));
                  }}>
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
                      type='text'
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
                  <Button variant='primary' type='submit'>
                    Submit
                  </Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserEditScreen;
