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
    bootcamp: { careers, photo, housing, website, email, name, description },
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
      <Row>
        <Col md={4}>
          <Card className='my-2'>
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
        <Col>
          <ListGroup className='my-2'>
            <ListGroup.Item>
              <h3>Description</h3>
              <p>{description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 className='my-2'>Careers</h3>
              <Row>
                {careers.map((career, i) => (
                  <Col key={i} md={3}>
                    <ul>
                      <li>{career}</li>
                    </ul>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default Bootcamp;
