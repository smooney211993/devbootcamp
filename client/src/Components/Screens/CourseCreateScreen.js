import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { apiCaller } from '../../utils/api';

import { Col, Row, Button, Container, Form } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { createCourse, createCourseReset } from '../../actions/courseActions';

import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';

const CourseCreateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { data: course, loading, error, success } = useSelector(
    (state) => state.createCourse
  );
  const [bootcamps, setBootcamps] = useState([]);
  const [formData, setFormData] = useState({
    bootcamp: '',
    title: '',
    description: '',
    weeks: '',
    tuition: '',
    minimumSkill: '',
    scholarhipsAvailable: null,
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(createCourseReset());
    if ((course && course._id) || success) {
      history.push(`/admin/course/${course._id}`);
    }
  }, [dispatch, course, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      bootcamp: bootcamps.find(
        (bootcamp) => bootcamp.name === formData.bootcamp
      ).id,
    };
    console.log(body);
    // dispatch(createCourse(formData));
  };

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
            {loading && <Spinner />}
            {error && <Message>{error.msg}</Message>}
            <Form onSubmit={submitHandler}>
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
                  <option defaultValue='none'>Select an Option</option>
                  {bootcamps.length > 0 &&
                    bootcamps.map((bootcamp) => (
                      <option key={bootcamp.id} value={bootcamp.name}>
                        {bootcamp.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Please Enter Title Of Course'
                  value={formData.title}
                  name='title'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Please Enter Description Of Course'
                  rows={6}
                  name='description'
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>
              <Form.Group controlId='weeks'>
                <Form.Label>Weeks</Form.Label>
                <Form.Control
                  type='number'
                  value={formData.weeks}
                  name='weeks'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>
              <Form.Group controlId='tuition'>
                <Form.Label>Tuition Cost</Form.Label>
                <Form.Control
                  type='number'
                  value={formData.tuition}
                  name='tuition'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }></Form.Control>
              </Form.Group>
              <Form.Group controlId='minimumskill'>
                <Form.Label>Skill Level Required</Form.Label>
                <Form.Control
                  as='select'
                  name='minimumSkill'
                  value={formData.minimumSkill}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }>
                  {['beginner', 'intermediate', 'advanced'].map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Scholarship Available</Form.Label>
                <Form.Check
                  label='True'
                  type='radio'
                  id='True'
                  name='scholarhipsAvailable'
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: true })
                  }
                  checked={
                    formData.scholarhipsAvailable ? true : false
                  }></Form.Check>
                <Form.Check
                  label='False'
                  type='radio'
                  id='False'
                  name='scholarhipsAvailable'
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: false })
                  }
                  checked={
                    !formData.scholarhipsAvailable ? true : false
                  }></Form.Check>
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseCreateScreen;
