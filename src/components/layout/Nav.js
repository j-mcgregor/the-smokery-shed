import React, { Component, useState } from 'react';
import { Location } from '@reach/router';
import { Link } from 'gatsby';
import { Menu, X } from 'react-feather';
import logo from '../../img/logo-simplified.png';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const NavLink = ({ to, currentPath, children }) => (
  <Link to={to} className={`nav-link ${to === currentPath ? 'active' : ''}`}>
    {children}
  </Link>
);

export const Navigation = ({ location, subNav }) => {
  const [currentPath] = useState(location.pathname);

  return (
    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/" currentPath={currentPath}>
              Home
            </NavLink>
            <NavLink to="/components/" currentPath={currentPath}>
              Components
            </NavLink>
            <NavDropdown title="Catering" id="collasible-nav-dropdown">
              {subNav.posts.map((l, i) => {
                console.log(l);
                return (
                  <NavDropdown.Item href={l.slug} key={l.slug}>
                    {l.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavLink to="/default/">Default</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export class Navigation2 extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  };

  componentDidMount = () => this.setState({ currentPath: this.props.location.pathname });

  handleMenuToggle = () => this.setState({ active: !this.state.active });

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle();

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    });

  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${to === this.state.currentPath ? 'active' : ''} ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      );

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <div className="Nav--Links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/components/">Catering</NavLink>
            <div className={`Nav--Group ${this.state.activeSubNav === 'posts' ? 'active' : ''}`}>
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('posts') ||
                  this.props.location.pathname.includes('blog') ||
                  this.props.location.pathname.includes('post-categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('posts')}
              >
                Blog
                <div className="Nav--GroupLinks">
                  <NavLink to="/blog/" className="Nav--GroupLink">
                    All Posts
                  </NavLink>
                  {subNav.posts.map((link, index) => (
                    <NavLink to={link.slug} key={'posts-subnav-link-' + index} className="Nav--GroupLink">
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </span>
            </div>
            <NavLink to="/default/">Default</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </div>
          <button className="Button-blank Nav--MenuButton" onClick={this.handleMenuToggle}>
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    );
  }
}

export default ({ subNav }) => <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>;
