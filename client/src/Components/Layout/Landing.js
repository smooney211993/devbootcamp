import React, { useEffect } from 'react';
import { Container, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { getBootcamps } from '../../actions/bootcampActions';

import { useDispatch } from 'react-redux';

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamps());
  });

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
        <Col md={8}></Col>
      </Row>
    </Container>
  );
};

export default Landing;
