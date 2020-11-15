import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminScreen = ({ history }) => {
  const { user } = useSelector((state) => state.userLoginRegister);
  useEffect(() => {
    if (user && user.role !== 'admin') {
      history.pushState('/');
    }
  }, [user]);
  return (
    <>
      <Container>
        <Row className='my-2'>
          <Col>
            <h4>
              <i className='fas fa-users-cog'></i> Dashboard
            </h4>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Link to='/admin/bootcamps'>
              <Button className='m2' variant='success' block>
                <i className='fas fa-campground'></i> Bootcamps
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to='/admin/courses'>
              <Button className='m2' variant='warning' block>
                <i className='fas fa-book'></i> Courses
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to='/admin/users'>
              <Button className='m2' variant='danger' block>
                <i className='fas fa-users'></i> Users
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminScreen;
