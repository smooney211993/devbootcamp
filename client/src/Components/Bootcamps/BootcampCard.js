import React from 'react';
import { Card, Col, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Layout/Rating';

const BootcampCard = ({ bootcamp }) => {
  return (
    <Card>
      <Link to={`/bootcamp/${bootcamp._id}`}>
        <Card.Header>{bootcamp.name}</Card.Header>
      </Link>

      <Card.Body>
        <Card.Title>
          {bootcamp.location.state} {bootcamp.location.city}
        </Card.Title>

        <Row>
          <Col md={4}>
            <Card.Img src={bootcamp.photo} />
          </Col>
          <Col md={8}>
            <Card.Text>{bootcamp.description}</Card.Text>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                Average Cost ${bootcamp.averageCost}
              </ListGroup.Item>
              <ListGroup.Item className='d-flex'>
                <strong className='mr-2'>{bootcamp.averageRating}</strong>{' '}
                <Rating value={bootcamp.averageRating} />
              </ListGroup.Item>
              <ListGroup.Item>{`${bootcamp.courses.length} Courses Available`}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BootcampCard;
