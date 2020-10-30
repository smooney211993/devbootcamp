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
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { bootcampList, loading, error, page, pages } = useSelector(
    (state) => state.bootcampList
  );
  useEffect(() => {
    dispatch(getBootcamps(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/search/${search}`);
    } else {
      history.push('/');
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
                      className='m-2'
                      block
                      type='submit'>
                      Search
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Row></Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Message variant='danger'>{error.msg}</Message>
          ) : (
            <>
              {bootcampList.map((bootcamp) => (
                <Row key={bootcamp._id} className='my-2 p-2'>
                  <BootcampCard bootcamp={bootcamp} />
                </Row>
              ))}
            </>
          )}
          <Paginate pages={pages} page={page} keyword={keyword} />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
