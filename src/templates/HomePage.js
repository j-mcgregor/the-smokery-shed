import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import { Container, Row, Col, Image, Jumbotron } from 'react-bootstrap';

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
  section3subtitle
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
      <div className="jumbotron jumbotron-fluid hero flex flex-center" style={{ ...hero(featuredImage, 700) }}>
        <Container>
          <Row>
            <Col>
              <h1 className="PageHeader--Title title-banner">{title}</h1>
              {subtitle && <Content className="PageHeader--Subtitle" src={subtitle} />}
            </Col>
          </Row>
        </Container>
      </div>

      {/* SECTION 1 */}
      <Container className="p-10 section__1">
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
      <Container className="p-10 section__3">
        <Row className="text-center">
          <Col md={6} sm={12} className="flex flex-column flex-center">
            <h2>{section3title}</h2>
            {section3subtitle && <Content className="PageHeader--Subtitle" src={section3subtitle} />}
          </Col>
          <Col md={6} sm={12}>
            <Image src={section3image} rounded width="300" />
          </Col>
        </Row>
      </Container>

      {/* SECTION 4 */}
      <PageHeader title={section3title} backgroundImage={section3image} />
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
      }
    }
  }
`;
