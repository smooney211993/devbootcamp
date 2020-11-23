import React, { useEffect } from 'react';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';
import { Link } from 'react-router-dom';

import { getUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const UserEditScreen = ({ match }) => {
  const userId = match.params.userId;
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

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
            <Link to='/admin'>
              {' '}
              <Button variant='light' className='m-2'>
                Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserEditScreen;
