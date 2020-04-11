import React from 'react';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './AboutPage.scss';

// Export Template for use in CMS preview
export const AboutTemplate = ({ title, subtitle, featuredImage, section1, image1, section2, image2 }) => (
  <main className="About">
    <PageHeader title={title} subtitle={subtitle} backgroundImage={featuredImage} />

    <Container className="pv-5">
      <Row className="section__1">
        <Col md={{ span: 8, offset: 2 }}>
          <Content source={section1} />
        </Col>
      </Row>
      <Row className="section__2">
        <Col md={{ span: 8, offset: 2 }}>
          <Content source={section2} />
        </Col>
      </Row>
    </Container>
  </main>
);

const About = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false} title={page.frontmatter.title || false}>
    <AboutTemplate {...page.frontmatter} body={page.html} />
  </Layout>
);

export default About;

export const pageQuery = graphql`
  ## Query for About data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        section1
        image1
        section2
        image2
      }
    }
  }
`;
