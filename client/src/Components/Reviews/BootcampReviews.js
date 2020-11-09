import React, { useEffect, useState } from 'react';
import {
  getBootCampReview,
  resetCreatebootcampReview,
  createBootcampReview,
} from '../../actions/bootcampActions';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../Layout/Rating';
import AddRating from '../Layout/AddRating';

import {
  Container,
  Row,
  Card,
  Col,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

import Message from '../Layout/Message';
import Spinner from '../Layout/Spinner';

const BootcampReviews = ({ match }) => {
  const id = match.params.id;
  const [formState, setFormState] = useState({
    title: '',
    text: '',
  });
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.bootcampReviews
  );

  const {
    loading: createReviewLoading,
    success: createReviewSuccess,
    error: createReviewError,
  } = useSelector((state) => state.createBootcampReview);
  const { isAuthenticated, user } = useSelector(
    (state) => state.userLoginRegister
  );
  const alreadyReviewed =
    isAuthenticated && user && reviews
      ? reviews.find((review) => review.user._id === user._id)
      : false;

  useEffect(() => {
    dispatch(resetCreatebootcampReview());
    dispatch(getBootCampReview(id));
    if (createReviewSuccess) {
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
  return error ? (
    <Message>{error.msg}</Message>
  ) : loading ? (
    <Spinner />
  ) : (
    <>
      <Container>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <Row key={review._id} className='my-2 py-2'>
              <Col>
                <Card>
                  <Card.Header className='d-flex'>
                    <i className='fas fa-quote-left p-2 '></i>{' '}
                    <h3>{review.title}</h3>{' '}
                    <i className='fas fa-quote-right p-2 '></i>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className='d-flex'>
                      Rating <Rating value={review.rating} />
                    </Card.Title>
                    {`"${review.text}"`}
                  </Card.Body>
                  <Card.Footer>
                    <Card.Footer>
                      <small>
                        <i className='fas fa-user'> </i> {review.user.name}
                      </small>
                    </Card.Footer>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          ))
        ) : (
          <Message>There Are No Reviews Posted</Message>
        )}{' '}
        {createReviewLoading && <Spinner />}
        {createReviewError && <Message>{createReviewError.msg}</Message>}
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
                      disabled={alreadyReviewed ? true : false}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as='textarea'
                      rows={6}
                      name='text'
                      onChange={formHandler}
                      disabled={alreadyReviewed ? true : false}></Form.Control>
                  </Form.Group>
                  <Button type='submit' block>
                    {alreadyReviewed ? 'Thanks For Reviewing' : 'Submit Review'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default BootcampReviews;
