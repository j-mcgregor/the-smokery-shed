import React from 'react';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import Accordion from '../components/shared/Accordion';
import './DefaultPage.scss';

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        accordion {
          title
          content
        }
      }
    }
  }
`;

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({ title, subtitle, featuredImage, body, accordion }) => (
  <main className="DefaultPage">
    <PageHeader title={title} subtitle={subtitle} backgroundImage={featuredImage} />

    <Container className="pv-5">
      <Row className="section__1">
        <Col md={{ span: 8, offset: 2 }}>
          <Content source={body} />
        </Col>
      </Row>
      <Row className="section__2">
        <Col md={{ span: 8, offset: 2 }}>
          <Accordion items={accordion} />
        </Col>
      </Row>
    </Container>
  </main>
);

const DefaultPage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false} title={page.frontmatter.title || false}>
    <DefaultPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
);

export default DefaultPage;
