import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Spinner from '../Layout/Spinner';
import Rating from '../Layout/Rating';
import AddRating from '../Layout/AddRating';
import CourseCard from '../Courses/CourseCard';
import LocationMap from '../Map/LocationMap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBootcamp,
  getBootCampReview,
  createBootcampReview,
} from '../../actions/bootcampActions';

const Bootcamp = ({ match }) => {
  const id = match.params.id;

  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    title: '',
    text: '',
  });
  const [rating, setRating] = useState(1);
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

  const { reviews, loading: loadingReviews } = useSelector(
    (state) => state.bootcampReviews
  );
  const { isAuthenticated, user } = useSelector(
    (state) => state.userLoginRegister
  );

  const { success: createReviewSuccess } = useSelector(
    (state) => state.createBootcampReview
  );

  const alreadyReviewed =
    isAuthenticated && user && reviews
      ? reviews.find((review) => review.user._id === user._id)
      : false;

  useEffect(() => {
    dispatch(getBootcamp(id));
    dispatch(getBootCampReview(id));
    if (createReviewSuccess) {
      dispatch(getBootcamp(id));
      dispatch(getBootCampReview(id));
    }
  }, [dispatch, id, createReviewSuccess]);

  const formHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const reviewHandler = (e) => {
    e.preventDefault();
    const body = { ...formState, rating };
    dispatch(createBootcampReview(id, body));
  };
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
          {isAuthenticated ? (
            alreadyReviewed ? (
              <Card>
                <Card.Body>
                  <Alert className='m0 text-center' variant='primary'>
                    {' '}
                    Thanks For Reviewing
                  </Alert>
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Header>
                  <i className='fas fa-pen m-2'></i> Write A Review
                </Card.Header>
                <Card.Body>
                  Please Rate
                  <AddRating
                    className='m-2'
                    value={rating}
                    setRating={(rating) => setRating(rating)}
                  />
                  <Form className='my-2' onSubmit={reviewHandler}>
                    <Form.Group>
                      <Form.Label>Please Leave A Review</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Please Add A Title'
                        name='title'
                        onChange={formHandler}
                        disabled={
                          alreadyReviewed ? true : false
                        }></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        as='textarea'
                        rows={6}
                        name='text'
                        onChange={formHandler}
                        disabled={
                          alreadyReviewed ? true : false
                        }></Form.Control>
                    </Form.Group>
                    <Button type='submit' block>
                      {alreadyReviewed
                        ? 'Thanks For Reviewing'
                        : 'Submit Review'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )
          ) : (
            <></>
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
          {reviews !== null && reviews.length > 0 && (
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
          )}
          <Card className='m-2 p-2'>
            <Card.Header>
              <h3>Courses</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                {courses.length > 0
                  ? courses.map((course) => (
                      <Col md={6} key={course._id} className='my-2'>
                        <CourseCard course={course} bootcampId={id} />
                      </Col>
                    ))
                  : 'There Are No Courses'}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Bootcamp;
