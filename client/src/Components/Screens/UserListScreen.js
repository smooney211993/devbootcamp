import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/userActions';

import { Link } from 'react-router-dom';

import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap';

import AdminUserPaginate from '../Layout/AdminUserPaginate';

const UserListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword || '';
  const role = match.params.role || '';
  const pageNumber = match.params.pageNumber || 1;
  const { users, loading, error, page, pages } = useSelector(
    (state) => state.userList
  );
  useEffect(() => {
    dispatch(getUsers(keyword, role, pageNumber));
  }, [dispatch, keyword, role, pageNumber]);
  console.log(`role is ${role}`);
  return (
    <Container>
      <Row>
        <Col>hello</Col>
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
