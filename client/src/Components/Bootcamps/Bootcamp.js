import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  Jumbotron,
  ListGroup,
} from 'react-bootstrap';

import Spinner from '../Layout/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { getBootcamp } from '../../actions/bootcampActions';

const Bootcamp = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const {
    bootcamp: { careers, photo, housing, website, email, name },
    state,
    city,
    loading,
  } = useSelector((state) => state.bootcamp);
  useEffect(() => {
    dispatch(getBootcamp(id));
  }, [dispatch, id]);
  return loading ? (
    <Spinner />
  ) : (
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
                  <ListGroup.Item>
                    <i className='far fa-envelope p-2'></i>
                    {email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className='fas fa-location-arrow p-2'></i>
                    {`${state}, ${city}`}
                  </ListGroup.Item>
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
