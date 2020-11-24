import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { apiCaller } from '../../utils/api';

import { Col, Row, Button, Container, Form } from 'react-bootstrap';

const CourseCreateScreen = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [formData, setFormData] = useState({
    bootcamp: '',
  });

  useEffect(() => {
    const getBootcamps = async () => {
      try {
        const { data } = await apiCaller({
          method: 'get',
          url: `/api/v1/bootcamps/all`,
        });
        console.log(data);
        setBootcamps(
          data.data.map((bootcamp) => ({
            id: bootcamp._id,
            name: bootcamp.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    getBootcamps();
  }, []);

  return (
    <>
      <Container>
        <Row className='text-align-center'>
          <Col>
            <h3>
              <i className='fas fa-campground'></i> Create Course
            </h3>
          </Col>
          <Col className='text-right'>
            <Link to='/admin/courses'>
              <Button variant='light'>Back</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Bootcamp</Form.Label>
              <Form.Control
                as='select'
                name='bootcamp'
                value={formData.bootcamp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }>
                {bootcamps.length > 0 &&
                  bootcamps.map((bootcamp) => (
                    <option key={bootcamp.id} value={bootcamp.name}>
                      {bootcamp.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseCreateScreen;
