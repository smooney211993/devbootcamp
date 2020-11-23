import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';

const BootcampCreateScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    formattedAddress: '',
    careers: '',
    housing: null,
    description: '',
    jobAssistance: null,
    website: '',
    jobGuarantee: null,
    phone: '',
    acceptGi: null,
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.value]: e.target.value });
  };
  return (
    <>
      <Container>
        <Row className='text-align-center'>
          <Col>
            <h3>
              <i className='fas fa-campground'></i> Create Bootcamp
            </h3>
          </Col>
          <Col className='text-right'>
            <Link to='/admin/bootcamps'>
              <Button variant='light'>Back</Button>
            </Link>
          </Col>
        </Row>
        <Row>
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
              <Form.Group controlId='number'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter The Number'
                  name='phone'
                  value={formData.phone}
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
                  onChange={(e) => setFormData({ ...formData, housing: false })}
                  checked={
                    formData.housing === false ? true : false
                  }></Form.Check>
                <Form.Check
                  label='true'
                  type='radio'
                  id='true'
                  name='housing'
                  onChange={(e) => setFormData({ ...formData, housing: true })}
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
              <Form.Group controlId='acceptGi'>
                <Form.Label>Accepts Gi</Form.Label>
                <Form.Check
                  label='true'
                  type='radio'
                  id='true'
                  name='acceptGi'
                  checked={formData.acceptGi === true ? true : false}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptGi: true })
                  }></Form.Check>
                <Form.Check
                  label='false'
                  type='radio'
                  id='false'
                  name='acceptGi'
                  checked={formData.acceptGi === false ? true : false}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptGi: false })
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

export default BootcampCreateScreen;
