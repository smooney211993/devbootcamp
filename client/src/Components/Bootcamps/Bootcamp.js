import React, { useEffect } from 'react';
import { Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Spinner from '../Layout/Spinner';
import Rating from '../Layout/Rating';
import CourseCard from '../Courses/CourseCard';
import LocationMap from '../Map/LocationMap';
import { useDispatch, useSelector } from 'react-redux';
import { getBootcamp, getBootCampReview } from '../../actions/bootcampActions';

const Bootcamp = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const {
    bootcamp,
    bootcamp: {
      careers,
      photo,
      website,
      email,
      name,
      description,
      averageRating,
      averageCost,
      location,
    },
    state,
    city,
    loading,
    courses,
  } = useSelector((state) => state.bootcamp);

  const { reviews, loading: loadingReviews, error: errorReviews } = useSelector(
    (state) => state.bootcampReviews
  );
  const { isAuthenticated } = useSelector((state) => state.userLoginRegister);
  useEffect(() => {
    dispatch(getBootcamp(id));
    dispatch(getBootCampReview(id));
  }, [dispatch, id]);
  return loading || loadingReviews ? (
    <Spinner />
  ) : (
    <>
      <Row>
        <Col md={5}>
          <Card className='m-2'>
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
                <ListGroup.Item className='d-flex'>
                  {bootcamp && (
                    <>
                      {averageRating}
                      <Rating className='my-2' value={averageRating} />
                    </>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {bootcamp && <> Average Cost: ${averageCost}</>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to={`/bootcamp/${id}/reviews`}>View Reviews</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  {bootcamp && location && (
                    <LocationMap
                      style={{ height: '20vh' }}
                      location={{
                        address: location.formattedAddress,
                        lat: location.coordinates[1],
                        lng: location.coordinates[0],
                      }}
                      zoomLevel={10}
                    />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          {isAuthenticated && (
            <Card className='m-2 p-2'>
              <Card.Header>
                <i className='fas fa-pen m-2'></i> Write A Review
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Please Leave A Review</Form.Label>
                    <Form.Control as='textarea' rows={6}></Form.Control>
                  </Form.Group>
                  <Button type='submit' block>
                    Submit Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={7}>
          <Card className='m-2'>
            <Card.Header>
              <h3>Description</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Card>
          <Card className='m-2 '>
            <Card.Header>
              <h3>Careers</h3>
            </Card.Header>
            <Card.Body>
              {careers &&
                careers.length > 0 &&
                careers.map((career, i) => (
                  <Row key={i}>
                    <ul id='careers-list'>
                      <li>{career}</li>
                    </ul>
                  </Row>
                ))}
            </Card.Body>
          </Card>
          <Card className='m-2 '>
            <Card.Header>
              <h3>Featured Review</h3>
            </Card.Header>
            <Card.Body>
              <Card.Title className='my-2'>
                {reviews && (
                  <>
                    {reviews[0].title} <Rating value={reviews[0].rating} />
                  </>
                )}
              </Card.Title>
              {reviews && reviews[0].text}
            </Card.Body>
            <Card.Footer>
              {reviews && (
                <>
                  <i className='fas fa-user m-2'> </i>
                  {reviews[0].user.name}
                </>
              )}
            </Card.Footer>
          </Card>
          <Card className='m-2 p-2'>
            <Card.Header>
              <h3>Courses</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                {courses.length > 0 &&
                  courses.map((course) => (
                    <Col md={6} key={course._id} className='my-2'>
                      <CourseCard course={course} bootcampId={id} />
                    </Col>
                  ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Bootcamp;
