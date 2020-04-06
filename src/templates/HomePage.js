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
  section3image,
  section3title
}) => {
  const hero = {
    background: `url(${featuredImage})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right center',
    minHeight: '700px'
  };
  return (
    <main className="Home">
      {/* HERO */}
      <div className="jumbotron jumbotron-fluid hero flex flex-center" style={{ ...hero }}>
        <Container>
          <h1 className="PageHeader--Title">{title}</h1>
          {subtitle && <Content className="PageHeader--Subtitle" src={subtitle} />}
        </Container>
      </div>

      {/* SECTION 1 */}
      <Container className="p-10 section__1">
        <Content source={body} />
      </Container>

      {/* SECTION 2 */}
      <PageHeader title={section2title} backgroundImage={section2image} />

      {/* SECTION 3 */}
      <Container className="p-10">
        <Row className="text-center">
          <Col md={6} sm={12}>
            <Image src={section3image} rounded width="200" />
          </Col>
          <Col md={6} sm={12} className="flex flex-center">
            <h2>{section2title}</h2>
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
        section3image
        section3title
      }
    }
  }
`;
