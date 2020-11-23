import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  deleteUser,
  deleteUserReset,
} from '../../actions/userActions';

import { Link } from 'react-router-dom';

import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap';

import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';

import AdminUserPaginate from '../Layout/AdminUserPaginate';

const UserListScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword || '';
  const role = match.params.role || '';
  const pageNumber = match.params.pageNumber || 1;
  const { users, loading, error, page, pages } = useSelector(
    (state) => state.userList
  );

  const { loading: deleteLoading, error: deleteError, success } = useSelector(
    (state) => state.deleteUser
  );

  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });

  const clearSearch = () => {
    history.push(`/admin/users`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.role.trim()) {
      history.push(
        `/admin/users/keyword/${formData.name}/role/${formData.role}`
      );
    } else if (
      formData.name.trim().length > 0 &&
      formData.role.trim().length === 0
    ) {
      history.push(`/admin/users/keyword/${formData.name}`);
    } else if (
      formData.name.trim().length === 0 &&
      formData.role.trim().length > 0
    ) {
      history.push(`/admin/users/role/${formData.role}`);
    }
  };
  useEffect(() => {
    dispatch(deleteUserReset());
    dispatch(getUsers(keyword, role, pageNumber));
    if (success) {
      dispatch(getUsers(keyword, role, pageNumber));
    }
  }, [dispatch, keyword, role, pageNumber, success]);

  return (
    <Container>
      <Row className='text-align-center'>
        <Col>
          <h3 className='my-2'>
            {' '}
            <i className='fas fa-users'></i> Users
          </h3>
        </Col>
        <Col className='text-right'>
          <Link to='/admin'>
            {' '}
            <Button variant='light' className='m-2'>
              Dashboard
            </Button>
          </Link>
          <Link to='/admin/user/create'>
            {' '}
            <Button variant='light' className='m-2'>
              Create User
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form inline className='ml-3' onSubmit={submitHandler}>
            <Form.Group className='mr-2'>
              <Form.Control
                type='text'
                name='name'
                value={formData.name}
                placeholder='Search Name'
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='text'
                name='role'
                value={formData.role}
                placeholder='Search Role'
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }></Form.Control>
            </Form.Group>
            <Button variant='primary' size='sm' className='ml-2 ' type='submit'>
              Search
            </Button>
            <Button
              variant='primary'
              size='sm'
              className='ml-2 '
              type='button'
              onClick={clearSearch}>
              Clear
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Message>{error.msg}</Message>
          ) : (
            <Table striped bordered hover variant='light' className='my-2'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.length > 0 &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>{user.createdAt.substring(0, 10)}</td>
                      <td>
                        <Link to={`/admin/user/${user._id}`}>
                          <Button type='button' className='m-2 '>
                            <i className='fas fa-edit '></i>
                          </Button>
                        </Link>
                        <Button
                          type='button'
                          className='m-2 '
                          onClick={() => dispatch(deleteUser(user._id))}>
                          <i className='fas fa-trash-alt '></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row className='my-2'>
        <AdminUserPaginate
          page={page}
          pages={pages}
          keyword={keyword}
          role={role}
        />
      </Row>
    </Container>
  );
};

export default UserListScreen;
