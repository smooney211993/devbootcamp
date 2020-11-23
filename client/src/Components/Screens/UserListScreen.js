import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/userActions';

import { Link } from 'react-router-dom';

import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap';

import AdminUserPaginate from '../Layout/AdminUserPaginate';

const UserListScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword || '';
  const role = match.params.role || '';
  const pageNumber = match.params.pageNumber || 1;
  const { users, loading, error, page, pages } = useSelector(
    (state) => state.userList
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
    dispatch(getUsers(keyword, role, pageNumber));
  }, [dispatch, keyword, role, pageNumber]);
  console.log(`role is ${role}`);
  console.log(`name is ${keyword}`);
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
        </Col>
      </Row>
      <Row>
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
      </Row>
      <Row>
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
