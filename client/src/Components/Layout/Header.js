import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>DEVBOOTCAMP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown title={'Account'}>
                <LinkContainer to='/login'>
                  <NavDropdown.Item>
                    {' '}
                    <i className='fas fa-user'></i>Login
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <NavDropdown.Item>
                    {' '}
                    <i className='fas fa-user-plus'></i>Register
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to='/homepage'>
                <Nav.Link>Browse BootCamps</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
