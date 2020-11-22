import React, { useEffect, useState } from 'react';

import { updateCourseReset, getCourse } from '../../actions/courseActions';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../Layout/Spinner';
import Message from '../Layout/Message';

const CourseEditScreen = ({ match }) => {
  const courseId = match.params.courseId;
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector((state) => state.course);
  const { loading: updateLoading, success, error: updateError } = useSelector(
    (state) => state.updateCourse
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    weeks: '',
    tuition: '',
    minimumSkill: '',
    scholarhipsAvailable: null,
  });

  useEffect(() => {
    dispatch(updateCourseReset());
    if (!course || course._id !== courseId || success) {
      dispatch(getCourse(courseId));
    } else {
      setFormData({
        title: course.title,
        description: course.description,
        weeks: course.weeks,
        tuition: course.tuition,
        minimumSkill: course.minimumSkill,
        scholarhipsAvailable: course.scholarhipsAvailable,
      });
    }
  }, [dispatch, courseId, course, success]);
  return (
    <>
      <Container>
        <Row className='text-align-center'>
          <Col>
            <h3>
              <i className='fas fa-edit '></i> Edit Course
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
          <Form>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter Title'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter Description'
                rows={6}
                name='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='weeks'>
              <Form.Label>Weeks</Form.Label>
              <Form.Control
                type='number'
                value={formData.weeks}
                name='weeks'
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='tuition'>
              <Form.Label>Tuition Cost</Form.Label>
              <Form.Control
                type='number'
                value={formData.tuition}
                name='tuition'
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='minimumskill'>
              <Form.Label>Skill Level Required</Form.Label>
              <Form.Control
                as='select'
                name='minimumSkill'
                value={formData.minimumSkill}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
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
        )}
      </Container>
    </>
  );
};
export default CourseEditScreen;
