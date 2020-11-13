import React, { useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';

const ProfileScreen = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>
              {' '}
              <i className='fas fa-edit '></i>Profile
            </h3>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
