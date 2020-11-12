import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Table, Button, Row, Col, Container } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { getBootcamps } from '../../actions/bootcampActions';

import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';

const BootcampListScreen = ({ match, history }) => {
  const keyword = match.params.keyword || '';
  const pageNumber = match.params.pageNumber || 1;
  const averageCost = match.params.averageCost || 150000;
  const averageRating = match.params.averageRating || 10;
  const dispatch = useDispatch();
  const { bootcampList, loading, error, page, pages } = useSelector(
    (state) => state.bootcampList
  );

  useEffect(() => {
    dispatch(getBootcamps(keyword, averageCost, averageRating, pageNumber));
  }, [dispatch, keyword, pageNumber, averageCost, averageRating]);
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
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message>{error.msg}</Message>
        ) : (
          <>
            <Table striped bordered hover variant='light'>
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
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
};

export default BootcampListScreen;
