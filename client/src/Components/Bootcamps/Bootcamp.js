import React, { useEffect } from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

import Spinner from '../Layout/Spinner';
import Rating from '../Layout/Rating';
import CourseCard from '../Courses/CourseCard';

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
    },
    state,
    city,
    loading,
    courses,
  } = useSelector((state) => state.bootcamp);
  const { reviews, loading: loadingReviews, error: errorReviews } = useSelector(
    (state) => state.bootcampReviews
  );
  useEffect(() => {
    dispatch(getBootcamp(id));
    dispatch(getBootCampReview(id));
  }, [dispatch, id]);
  console.log(id);
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
              {careers &&
                careers.length > 0 &&
                careers.map((career, i) => (
                  <Row key={i}>
                    <ul id='careers-list'>
                      <li>{career}</li>
                    </ul>
                  </Row>
                ))}
            </ListGroup.Item>
          </ListGroup>
          <Card>
            <Card.Header>Featured Review</Card.Header>
            <Card.Body>
              <Card.Title className='my-2'>
                {reviews && (
                  <>
                    {reviews[0].title} <Rating value={reviews[0].rating} />
                  </>
                )}
              </Card.Title>
              <p>{reviews && reviews[0].text}</p>
            </Card.Body>
            <Card.Footer>
              {reviews && (
                <>
                  <i className='fas fa-user'> {reviews[0].user.name}</i>
                </>
              )}
            </Card.Footer>
          </Card>
          <Card className='my-2'>
            <Card.Header>Courses</Card.Header>
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
