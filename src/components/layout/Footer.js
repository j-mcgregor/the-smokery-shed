import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

export default () => (
  <Container fluid className="footer p-0">
    <Container className="pv-4">
      <Row>
        <Col md={4} sm={12}>
          <ListGroup variant="flush">
            <ListGroup.Item>Item 1</ListGroup.Item>
            <ListGroup.Item>Item 2</ListGroup.Item>
            <ListGroup.Item>Item 3</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} sm={12}>
          <ListGroup>
            <ListGroup.Item>Item 1</ListGroup.Item>
            <ListGroup.Item>Item 2</ListGroup.Item>
            <ListGroup.Item>Item 3</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} sm={12}>
          <ListGroup>
            <ListGroup.Item>Item 1</ListGroup.Item>
            <ListGroup.Item>Item 2</ListGroup.Item>
            <ListGroup.Item>Item 3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
    <Container fluid className="pv-4 sub-footer">
      <Row className="text-center">
        <Col>Made by Jack McGregor</Col>
      </Row>
    </Container>
  </Container>
);
