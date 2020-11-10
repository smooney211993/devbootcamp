import React from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';

const AdminScreen = () => {
  return (
    <header className='py-2 bg-primary text-white expand-sm'>
      <Container>
        <Row>
          <Col>
            <h4>
              <i className='fas fa-users-cog'></i> Dashboard
            </h4>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default AdminScreen;
