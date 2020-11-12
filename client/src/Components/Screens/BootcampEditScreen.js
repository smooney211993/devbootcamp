import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

import Spinner from '../Layout/Spinner';

import { getBootcamp } from '../../actions/bootcampActions';

const BootcampEditScreen = ({ match, history }) => {
  const id = match.params.bootcampId;
  const dispatch = useDispatch();

  const { bootcamp, loading, error } = useSelector((state) => state.bootcamp);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    formattedAddress: '',
    careers: '',
    housing: null,
    description: '',
    jobAssistance: null,
    website: '',
    jobGuarantee: null,
    photo: '',
  });
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setFormData({ ...formData, photo: file });
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const { data } = await axios.put(
        `/api/v1/bootcamps/${id}/photo`,
        formData,
        config
      );
      setFormData({ ...formData, photo: data.data });
      setUploading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
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
        website: bootcamp.website,
        jobGuarantee: bootcamp.jobGuarantee,
        photo: bootcamp.photo,
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
                <Form.Group controlId='website'>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Website'
                    name='website'
                    value={formData.website}
                    onChange={handleFormData}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Image'
                    value={formData.photo}
                    name='photo'
                    onChange={handleFormData}></Form.Control>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}></Form.File>
                  {uploading && <Spinner />}
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
                    id='false'
                    name='jobAssistance'
                    onChange={(e) =>
                      setFormData({ ...formData, jobAssistance: false })
                    }
                    checked={
                      formData.jobAssistance === false ? true : false
                    }></Form.Check>
                </Form.Group>
                <Form.Group controlId='jobGuarantee'>
                  <Form.Label>Job Guarantee</Form.Label>
                  <Form.Check
                    label='false'
                    type='radio'
                    id='false'
                    name='jobGuarantee'
                    checked={formData.jobGuarantee === false ? true : false}
                    onChange={(e) =>
                      setFormData({ ...formData, jobGuarantee: false })
                    }></Form.Check>
                  <Form.Check
                    label='true'
                    type='radio'
                    id='true'
                    name='jobGuarantee'
                    checked={formData.jobGuarantee === true ? true : false}
                    onChange={(e) =>
                      setFormData({ ...formData, jobGuarantee: true })
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
