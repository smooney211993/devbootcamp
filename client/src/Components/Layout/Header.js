import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { userLogOut } from '../../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state) => state.userLoginRegister
  );
  return (
    <header className='mb-2'>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>DEVBOOTCAMP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {isAuthenticated && user && user.name ? (
                <NavDropdown title={user.name}>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i className='fas fa-user'></i>Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={(e) => dispatch(userLogOut())}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
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
              )}
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
