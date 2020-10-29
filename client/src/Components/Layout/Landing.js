import React, { useEffect } from 'react';
import { Container, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { getBootcamps } from '../../actions/bootcampActions';
import Spinner from './Spinner';
import Message from './Message';
import BootcampCard from '../Bootcamps/BootcampCard';

import { useDispatch, useSelector } from 'react-redux';

const Landing = () => {
  const dispatch = useDispatch();
  const { bootcampList, loading, error } = useSelector(
    (state) => state.bootcampList
  );
  useEffect(() => {
    dispatch(getBootcamps());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col md={4} className='my-2'>
          <Card className='my-4'>
            <Card.Body>
              <Card.Title>By Keyword</Card.Title>
              <Row>
                <Col className='my-2'>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      placeholder='Search'></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Button variant='primary' size='sm' className='m-2' block>
                  Search
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Message variant='danger'>{error.msg}</Message>
          ) : (
            <>
              {bootcampList.map((bootcamp) => (
                <Row key={bootcamp._id} className='my-2 p-2'>
                  <BootcampCard bootcamp={bootcamp} />
                </Row>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
