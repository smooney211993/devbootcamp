import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { getBootcamps } from '../../actions/bootcampActions';
import Spinner from './Spinner';
import Message from './Message';
import BootcampCard from '../Bootcamps/BootcampCard';
import Paginate from './Paginate';

import { useDispatch, useSelector } from 'react-redux';

const Landing = ({ match, history }) => {
  const keyword = match.params.keyword || '';
  const pageNumber = match.params.pageNumber || 1;
  const averageCost = match.params.averageCost || 150000;
  const averageRating = match.params.averageRating || 10;
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(10);
  const [budget, setBudget] = useState(15000);
  const dispatch = useDispatch();
  const { bootcampList, loading, error, page, pages } = useSelector(
    (state) => state.bootcampList
  );
  useEffect(() => {
    dispatch(getBootcamps(keyword, averageCost, averageRating, pageNumber));
  }, [dispatch, keyword, pageNumber, averageCost, averageRating]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(
        `/search/${search}/averageCost/${budget}/averageRating/${rating}`
      );
    } else {
      history.push(`/averageCost/${budget}/averageRating/${rating}`);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={4} className='my-2'>
          <Card className='my-4'>
            <Card.Body>
              <Card.Title>By Keyword</Card.Title>
              <Row>
                <Col className='my-2'>
                  <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                      <Form.Control
                        type='text'
                        placeholder='Search'
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }></Form.Control>
                    </Form.Group>
                    <Button
                      variant='primary'
                      size='sm'
                      className='my-2'
                      block
                      type='submit'>
                      <i className='fas fa-search my-2'></i>
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Row></Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Filter</Card.Title>
              <Row>
                <Container>
                  <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Budget</Form.Label>
                      <Form.Control
                        as='select'
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}>
                        <option value={15000}>$15000</option>
                        <option value={10000}>$10000</option>
                        <option value={5000}>$5000</option>
                      </Form.Control>
                    </Form.Group>
                    <Button
                      variant='primary'
                      size='sm'
                      className='my-2'
                      block
                      type='submit'>
                      <i className='fas fa-search my-2'></i>
                    </Button>
                  </Form>
                </Container>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Message variant='danger' className='my-2'>
              {error.msg}
            </Message>
          ) : (
            <>
              {bootcampList.length === 0 ? (
                <Message className='my-2'>No Results Found</Message>
              ) : (
                bootcampList.map((bootcamp) => (
                  <Row key={bootcamp._id} className='my-2 p-2'>
                    <BootcampCard bootcamp={bootcamp} />
                  </Row>
                ))
              )}
            </>
          )}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword}
            averageCost={averageCost}
            averageRating={averageRating}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
