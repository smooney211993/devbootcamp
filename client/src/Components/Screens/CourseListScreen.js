import React, { useEffect, useState } from 'react';
import { getCourses } from '../../actions/courseActions';

import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';
import AdminCoursePaginate from '../Layout/AdminCoursePaginate';

const CourseListScreen = ({ match }) => {
  const keyword = match.params.keyword || '';
  const pageNumber = match.params.pageNumber || 1;
  const averageCost = match.params.averageCost || 150000;
  const [budget, setBudget] = useState(15000);
  const dispatch = useDispatch();
  const { courses, loading, error, page, pages } = useSelector(
    (state) => state.courseList
  );
  useEffect(() => {
    dispatch(getCourses(keyword, budget, pageNumber));
  }, [dispatch, budget, pageNumber]);
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

        {loading ? (
          <Spinner />
        ) : error ? (
          <Message>{error.msg}</Message>
        ) : (
          'Hello'
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
