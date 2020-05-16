import React from 'react';
import { graphql } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import { Container, Row, Col, Image } from 'react-bootstrap';
import logo from '../img/Logo large with tagline black_large.png';
import './HomePage.scss';

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body,
  section2image,
  section2title,
  section2subtitle,
  section3image,
  section3title,
  section3subtitle,
  section4image,
  section4title,
  section4subtitle
}) => {
  const hero = (image, minHeight) => ({
    background: `url(${image})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right center',
    minHeight: `${minHeight}px`
  });
  return (
    <main className="Home">
      {/* HERO */}
      <div className="jumbotron jumbotron-fluid hero flex flex-center" style={{ ...hero(featuredImage, 800) }}>
        <Container>
          <Row>
            <Col sm={6}>
              <Image src={logo} fluid />
            </Col>
          </Row>
        </Container>
      </div>

      {/* SECTION 1 */}
      <Container className="p-10 p-5-md p-1-sm section__1">
        <Content source={body} />
      </Container>

      {/* SECTION 2 */}
      <div className="jumbotron jumbotron-fluid hero flex flex-center" style={{ ...hero(section2image, 400) }}>
        <Container className="section__2">
          <Row>
            <Col md={6} sm={0} />
            <Col md={6} sm={12} className="flex flex-center flex-column text-center">
              <h2 className="title-banner">{section2title}</h2>
              {section2subtitle && <Content className="PageHeader--Subtitle" src={section2subtitle} />}
            </Col>
          </Row>
        </Container>
      </div>

      {/* SECTION 3 */}
      <Container className="p-10 p-5-md p-1-sm section__3">
        <Row className="text-center">
          <Col md={6} sm={12} className="flex flex-column flex-center">
            <h2 className="title-banner">{section3title}</h2>
            {section3subtitle && <Content className="PageHeader--Subtitle" src={section3subtitle} />}
          </Col>
          <Col md={6} sm={12}>
            <Image src={section3image} rounded width="300" />
          </Col>
        </Row>
      </Container>

      {/* SECTION 4 */}
      <div
        className="jumbotron jumbotron-fluid hero flex flex-center mb-0"
        style={{ ...hero(section4image, 400), backgroundAttachment: 'scroll' }}
      >
        <Container className="section__4">
          <Row>
            <Col className="flex flex-center flex-column">
              <h2 className="title-banner">
                <FontAwesomeIcon icon={faQuoteLeft} />
                {section4title}
                <FontAwesomeIcon icon={faQuoteRight} />
              </h2>
              {section4subtitle && <Content className="PageHeader--Subtitle ml-auto mr-2" src={section4subtitle} />}
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
);

export default HomePage;

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        section2image
        section2title
        section2subtitle
        section3image
        section3title
        section3subtitle
        section4image
        section4title
        section4subtitle
      }
    }
  }
`;
