import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  Jumbotron,
  ListGroup,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { getBootcamp } from '../../actions/bootcampActions';

const Bootcamp = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const {
    bootcamp: {
      location: { city, state },
      careers,
      photo,
      housing,
      website,
      email,
      name,
    },
  } = useSelector((state) => state.bootcamp);
  useEffect(() => {
    dispatch(getBootcamp(id));
  }, [dispatch, id]);
  return (
    <>
      <Jumbotron className='my-4'>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant='top' src={photo} />
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{name}</ListGroup.Item>
                  <ListGroup.Item>{website}</ListGroup.Item>
                  <ListGroup.Item>{email}</ListGroup.Item>
                  <ListGroup.Item>{`${city}, ${state}`}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
};

export default Bootcamp;
