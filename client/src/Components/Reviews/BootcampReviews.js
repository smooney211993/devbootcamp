import React, { useEffect } from 'react';
import { getBootCampReview } from '../../actions/bootcampActions';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../Layout/Rating';

import { Container, Row, Card, Col, ListGroup } from 'react-bootstrap';

import Message from '../Layout/Message';
import Spinner from '../Layout/Spinner';

const BootcampReviews = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.bootcampReviews
  );

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
            <Row id={review._id} className='my-2 py-2'>
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
                    <Card.Text>
                      <span>
                        <p>{`"${review.text}"`}</p>
                      </span>
                    </Card.Text>
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
      </Container>
    </>
  );
};

export default BootcampReviews;
