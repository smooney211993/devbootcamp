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
    careers: '',
    housing: null,
    description: '',
    jobAssistance: null,
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
        careers: bootcamp.careers.join(', '),
        housing: bootcamp.housing,
        description: bootcamp.description,
        jobAssistance: bootcamp.jobAssistance,
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
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    name='name'
                    value={formData.name}
                    onChange={handleFormData}></Form.Control>
                </Form.Group>
                <Form.Group controlid='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    rows={6}
                    placeholder='Enter Address'
                    name='formattedAddress'
                    value={formData.formattedAddress}
                    onChange={handleFormData}></Form.Control>
                </Form.Group>
                <Form.Group controlId='careers'>
                  <Form.Label>Careers</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Careers'
                    name='careers'
                    value={formData.careers}
                    onChange={handleFormData}></Form.Control>
                </Form.Group>
                <Form.Group controlId='housing'>
                  <Form.Label>Housing Available</Form.Label>
                  <Form.Check
                    label='false'
                    type='radio'
                    id='true'
                    name='housing'
                    onChange={(e) =>
                      setFormData({ ...formData, housing: false })
                    }
                    checked={
                      formData.housing === false ? true : false
                    }></Form.Check>
                  <Form.Check
                    label='true'
                    type='radio'
                    id='true'
                    name='housing'
                    onChange={(e) =>
                      setFormData({ ...formData, housing: true })
                    }
                    checked={
                      formData.housing === true ? true : false
                    }></Form.Check>
                </Form.Group>
                <Form.Group controlId='jobassistance'>
                  <Form.Label>Job Assistance</Form.Label>
                  <Form.Check
                    label='true'
                    type='radio'
                    id='true'
                    name='jobAssistance'
                    onChange={(e) =>
                      setFormData({ ...formData, jobAssistance: true })
                    }
                    checked={
                      formData.jobAssistance === true ? true : false
                    }></Form.Check>
                  <Form.Check
                    label='false'
                    type='radio'
                    id='true'
                    name='jobAssistance'
                    onChange={(e) =>
                      setFormData({ ...formData, jobAssistance: false })
                    }
                    checked={
                      formData.jobAssistance === false ? true : false
                    }></Form.Check>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    placeholder='Enter Description'
                    rows={6}
                    name='description'
                    value={formData.description}
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
