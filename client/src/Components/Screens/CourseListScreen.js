import React, { useEffect, useState } from 'react';
import { getCourses } from '../../actions/courseActions';

import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Container, Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';
import AdminCoursePaginate from '../Layout/AdminCoursePaginate';

const CourseListScreen = ({ match, history }) => {
  const keyword = match.params.keyword || '';
  const pageNumber = match.params.pageNumber || 1;
  const averageCost = match.params.averageCost || 150000;
  const [budget, setBudget] = useState(15000);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { courses, loading, error, page, pages } = useSelector(
    (state) => state.courseList
  );

  const clearSearch = () => {
    history.push('/admin/courses');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/admin/courses/search/${search}/averageCost/${budget}/`);
    }
  };

  useEffect(() => {
    dispatch(getCourses(keyword, budget, pageNumber));
  }, [dispatch, budget, pageNumber, keyword]);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3 className='my-2'>
              <i className='fas fa-book'></i>Bootcamps
            </h3>
          </Col>
          <Col className='text-right'>
            <Link to='/admin'>
              {' '}
              <Button variant='light' className='m-2'>
                Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Form onSubmit={submitHandler} inline className='ml-3'>
            <Form.Group controlId='search'>
              <Form.Control
                type='text'
                value={search}
                name='search'
                onChange={(e) => setSearch(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' size='sm' className='ml-2 '>
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
          <Table striped bordered hover variant='light' className='my-2'>
            <thead>
              <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Bootcamp</td>
                <td>Publisher</td>
                <td>CreatedAt</td>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.length > 0 &&
                courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course._id}</td>
                    <td>{course.title}</td>
                    <td>{course.bootcamp.name}</td>
                    <td>{course.user.name}</td>
                    <td>{course.createdAt.substring(0, 10)}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
        <AdminCoursePaginate
          pages={pages}
          page={page}
          keyword={keyword}
          averageCost={averageCost}
        />
      </Container>
    </>
  );
};

export default CourseListScreen;
