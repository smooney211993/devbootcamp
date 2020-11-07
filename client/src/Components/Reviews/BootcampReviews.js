import React, { useEffect } from 'react';
import { getBootCampReview } from '../../actions/bootcampActions';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../Layout/Rating';

import { Container, Row, Card, Col, Form, Button } from 'react-bootstrap';

import Message from '../Layout/Message';
import Spinner from '../Layout/Spinner';

const BootcampReviews = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.bootcampReviews
  );

  const { isAuthenticated } = useSelector((state) => state.userLoginRegister);

  useEffect(() => {
    dispatch(getBootCampReview(id));
  }, [dispatch, id]);
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
        {isAuthenticated && (
          <Card>
            <Card.Header>
              <i className='fas fa-pen m-2'></i> Write A Review
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className='p-2'>
                  <Form.Label>Please Enter Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Please Add A Title'
                    className='p-2'></Form.Control>
                  <Form.Label>Please Leave A Review</Form.Label>
                  <Form.Control
                    as='textarea'
                    className='p-2'
                    rows={6}></Form.Control>
                </Form.Group>
                <Button type='submit' block>
                  Submit Review
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default BootcampReviews;
