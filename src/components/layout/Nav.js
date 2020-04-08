import React, { useState } from 'react';
import { Location } from '@reach/router';
import { Link } from 'gatsby';
import logo from '../../img/logo-simplified-inverted.png';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavLink = ({ to, currentPath, children }) => (
  <Link to={to} className={`nav-link ${to === currentPath ? 'active' : ''}`}>
    {children}
  </Link>
);

export const Navigation = ({ location, subNav, ...props }) => {
  const [currentPath] = useState(location.pathname);
  const { social } = subNav;
  return (
    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="React Bootstrap logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/about" currentPath={currentPath}>
              About
            </NavLink>
            {/* <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/blog">Home</NavDropdown.Item>
              {subNav.posts.map((l, i) => {
                return (
                  <NavDropdown.Item href={l.slug} key={l.slug}>
                    {l.title}
                  </NavDropdown.Item>
                );
              })}
              <NavDropdown.Item href="/default">Default</NavDropdown.Item>
              <NavDropdown.Item href="/components">Components</NavDropdown.Item>
            </NavDropdown> */}
            <NavDropdown title="Catering" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/menus">All</NavDropdown.Item>
              {subNav.menus.map((l, i) => {
                return (
                  <NavDropdown.Item href={l.slug} key={l.slug}>
                    {l.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavLink to="/weddings" currentPath={currentPath}>
              Weddings
            </NavLink>
            <NavLink to="/faq" currentPath={currentPath}>
              FAQ
            </NavLink>
            <NavLink to="/contact/">Contact</NavLink>
            {social.facebook && (
              <a className="nav-link" href={social.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            )}
            {social.twitter && (
              <a className="nav-link" href={social.twitter} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            )}
            {social.instagram && (
              <a className="nav-link" href={social.instagram} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            )}
            {social.youtube && (
              <a className="nav-link" href={social.youtube} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ({ subNav }) => <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>;
