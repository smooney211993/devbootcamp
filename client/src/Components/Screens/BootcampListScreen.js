import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import {
  getBootcamps,
  deleteBootcamp,
  resetDeleteBootcamp,
} from '../../actions/bootcampActions';

import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';
import AdminBootcampPaginate from '../Layout/AdminBootcampPaginate';

const BootcampListScreen = ({ match, history }) => {
  const keyword = match.params.keyword || '';
  const pageNumber = match.params.pageNumber || 1;
  const averageCost = match.params.averageCost || 150000;
  const averageRating = match.params.averageRating || 10;
  const dispatch = useDispatch();
  const { bootcampList, loading, error, page, pages } = useSelector(
    (state) => state.bootcampList
  );

  const { loading: deleteLoading, success, error: deleteError } = useSelector(
    (state) => state.deleteBootcamp
  );

  const [search, setSearch] = useState('');
  const [rating, setRating] = useState(10);
  const [budget, setBudget] = useState(15000);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(
        `/admin/bootcamps/search/${search}/averageCost/${budget}/averageRating/${rating}`
      );
    }
  };

  const clearSearch = () => {
    history.push('/admin/bootcamps');
  };

  useEffect(() => {
    dispatch(resetDeleteBootcamp());
    dispatch(getBootcamps(keyword, averageCost, averageRating, pageNumber));
    if (success) {
      dispatch(getBootcamps(keyword, averageCost, averageRating, pageNumber));
    }
  }, [dispatch, keyword, pageNumber, averageCost, averageRating, success]);
  return (
    <>
      <Container>
        <Row className='text-align-center'>
          <Col>
            <h3 className='my-2'>
              <i className='fas fa-campground'></i>Bootcamps
            </h3>
          </Col>
          <Col className='text-right'>
            <Link to='/admin'>
              {' '}
              <Button variant='light'>Dashboard</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Form onSubmit={onSubmitHandler} inline className='ml-3'>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='primary' size='sm' className='ml-2 ' type='submit'>
              Search
            </Button>
            <Button
              variant='primary'
              size='sm'
              className='ml-2 '
              type='button'
              onClick={clearSearch}>
              Clear
            </Button>
          </Form>
        </Row>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message>{error.msg}</Message>
        ) : (
          <>
            <Table striped bordered hover variant='light' className='my-2'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th> Name</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {bootcampList !== null &&
                  bootcampList.length > 0 &&
                  bootcampList.map((bootcamp) => (
                    <tr key={bootcamp._id}>
                      <td>{bootcamp._id}</td>
                      <td>{bootcamp.name}</td>
                      <td>{bootcamp.createdAt.substring(0, 10)}</td>
                      <td>
                        <Button type='button' className='m-2 '>
                          <i className='fas fa-edit '></i>
                        </Button>
                        <Button
                          type='button'
                          className='m-2 '
                          onClick={() =>
                            dispatch(deleteBootcamp(bootcamp._id))
                          }>
                          <i className='fas fa-trash-alt '></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        )}
        <AdminBootcampPaginate
          pages={pages}
          page={page}
          keyword={keyword}
          averageCost={averageCost}
          averageRating={averageRating}
        />
      </Container>
    </>
  );
};

export default BootcampListScreen;
