import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../store/slice/searchSlice';
import { logout } from '../../store/slice/authSlice'; 
import { Link, useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../images/Logo.svg';

function NavbarMenu() {


  const [searchTerm, setSearchTerm] = useState('');
  const [showLogout, setShowLogout] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchTerm));
  };

// Logout
  const handleSignOut = () => {
    dispatch(logout());
    navigate('/'); 
  };

  return (
    <Navbar expand="lg" className="bg-amber-100 shadow-md fixed-top">
      <Container fluid>
        <Link to={'/home'} className="no-underline">
          <Navbar.Brand className="flex flex-row space-x-2 lg:mr-5">
            <img src={logo} alt="course image" className="w-36 h-12" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          {/* Navigation Links */}

          <Nav className="me-auto space-x-5 font-bold" navbarScroll>
            <Link to="/home" className="no-underline">
              <Navbar.Text className='ml-5'>Home</Navbar.Text>
            </Link>
            <Link to="/user-list" className="no-underline">
              <Navbar.Text>User List</Navbar.Text>
            </Link>
            <Link to="/about" className="no-underline">
              <Navbar.Text>About Us</Navbar.Text>
            </Link>
            <Link to="/contact" className="no-underline">
              <Navbar.Text>Contact Me</Navbar.Text>
            </Link>
          </Nav>

            {/* Search Bar */}

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search by name or instructor"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>

          {/* Profile Icon */}
          <div className="ml-4 relative">
            <FaUserCircle
              size={32}
              className="text-gray-800 cursor-pointer"
              onClick={() => setShowLogout((prev) => !prev)} 
            />
            {showLogout && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded">
                <Button variant="outline-danger" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
