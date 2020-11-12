import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';

import Spinner from '../Layout/Spinner';

import { getBootcamp } from '../../actions/bootcampActions';

const BootcampEditScreen = ({ match, history }) => {
  const id = match.params.bootcampId;
  const dispatch = useDispatch();

  const { bootcamp, loading, error } = useSelector((state) => state.bootcamp);

  const [formData, setFormData] = useState({
    name: '',
    formattedAddress: '',
  });
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (bootcamp === null || id !== bootcamp._id) {
      dispatch(getBootcamp(id));
    } else {
      setFormData({
        name: bootcamp.name,
        formattedAddress: bootcamp.location.formattedAddress,
      });
    }
  }, [dispatch, id, bootcamp]);
  return (
    <>
      <Container>
        <Row className='text-align-center'>
          <Col>
            <h3>
              <i className='fas fa-edit '></i> Edit Bootcamp
            </h3>
          </Col>
          <Col className='text-right'>
            <Link to='/admin/bootcamps'>
              <Button variant='light'>Back</Button>
            </Link>
          </Col>
        </Row>
        {loading ? (
          <Spinner />
        ) : (
          <Row className='justify-content-md-center'>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    name='name'
                    value={formData.name}
                    onChange={handleFormData}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Address'
                    name='formattedAddress'
                    value={formData.formattedAddress}
                    onChange={handleFormData}></Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default BootcampEditScreen;
