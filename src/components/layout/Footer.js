import React from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import Form from '../forms/FormSimple';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/TheSmokeryShed_WithTagline_RGB_Large.png';
export default ({ social }) => {
  const address = social.address ? social.address.split(', ') : [];
  return (
    <Container fluid className="footer p-0">
      <Container className="pv-4">
        <Row>
          <Col md={4} sm={{ span: 10, offset: 1 }} className="pt-2">
            <ListGroup variant="flush">
              <ListGroup.Item>The Smokery Shed</ListGroup.Item>
              {address.map(a => (
                <ListGroup.Item key={a}>{a}</ListGroup.Item>
              ))}
              <ListGroup.Item className="mt-2">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="mr-1" icon={faFacebookF} />
                  </a>
                )}
                {social.twitter && (
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="mr-1" icon={faTwitter} />
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="mr-1" icon={faInstagram} />
                  </a>
                )}
                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon className="mr-1" icon={faYoutube} />
                  </a>
                )}
              </ListGroup.Item>
              {social.phone && (
                <ListGroup.Item className="mt-2">
                  <a href={`tel:${social.phone}`}>
                    <FontAwesomeIcon className="mr-1" icon={faPhone} /> {social.phone}
                  </a>
                </ListGroup.Item>
              )}
              {social.email && (
                <ListGroup.Item className="mt-2">
                  <a href={`mailto:${social.email}`}>
                    <FontAwesomeIcon className="mr-1" icon={faEnvelope} /> {social.email}
                  </a>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          <Col md={4} sm={{ span: 10, offset: 1 }}>
            <Form rows={5} />
          </Col>
          <Col md={4} sm={{ span: 10, offset: 1 }} className="pt-2">
            <Image src={logo} fluid />
          </Col>
        </Row>
      </Container>
      <Container fluid className="pv-4 sub-footer">
        <Row className="text-center">
          <Col>
            {' '}
            <small>The Smokery Shed 2020, All rights Reserved</small>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            {' '}
            <small>The Smokery Shed Ltd registered in England and Wales, Company #08363710</small>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            {' '}
            <small className="text-muted">
              Site designed and developed by{' '}
              <a href="mailto:jackjwmcgregor@gmail.com" title="jackjwmcgregor@gmail.com" style={{ color: '#ccc' }}>
                Jack McGregor
              </a>
            </small>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
