import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  Jumbotron,
  ListGroup,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

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
                  <ListGroup.Item>
                    <i className='fas fa-campground m-2'></i>
                    {name}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <a className='m-2' href={website}>
                      {website}{' '}
                    </a>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <i className='far fa-envelope m-2'></i>
                    {email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className='fas fa-location-arrow m-2'></i>
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
