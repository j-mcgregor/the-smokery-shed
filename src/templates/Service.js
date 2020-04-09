import React, { useEffect } from 'react';
import _get from 'lodash/get';
import { Link, graphql } from 'gatsby';
import { ChevronLeft } from 'react-feather';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './Service.scss';
import { Container, Row, Col } from 'react-bootstrap';

export const SingleServiceTemplate = ({ title, body, featuredImage, nextServiceURL, prevServiceURL, ...props }) => {
  useEffect(() => {
    const paragraphs = document.getElementsByTagName('p');
    if (paragraphs) {
      Array.from(paragraphs).forEach((p, i) => {
        const hasChildren = !!Array.from(p.children).length;
        if (hasChildren) {
          paragraphs[i].classList.add('flex');
          paragraphs[i].classList.add('flex-center');
        }
      });
    }
  }, []);

  return (
    <main className="service">
      <PageHeader title={title} backgroundImage={featuredImage} />
      <Container className="pv-5">
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Link className="Service--BackButton" to="/services">
              <ChevronLeft /> BACK
            </Link>
          </Col>
        </Row>
        <Row className="pv-2">
          <Col sm={{ span: 8, offset: 2 }}>
            <Content source={body} />
          </Col>
        </Row>
        <Row className="pv-2">
          <Col sm={{ span: 8, offset: 2 }}>
            <div className="Service--Pagination flex space-between">
              {prevServiceURL && (
                <Link className="Service--Pagination--Link prev" to={prevServiceURL}>
                  Previous Service
                </Link>
              )}
              {nextServiceURL && (
                <Link className="Service--Pagination--Link next" to={nextServiceURL}>
                  Next Service
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

// Export Default Service for front-end
const Service = ({ data: { service, allServices } }) => {
  const thisEdge = allServices.edges.find(edge => edge.node.id === service.id);
  return (
    <Layout meta={service.frontmatter.meta || false} title={service.frontmatter.title || false}>
      <SingleServiceTemplate
        {...service}
        {...service.frontmatter}
        body={service.html}
        nextServiceURL={_get(thisEdge, 'next.fields.slug')}
        prevServiceURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  );
};

export default Service;

export const pageQuery = graphql`
  ## Query for Service data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file

  query Service($id: String!) {
    service: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        featuredImage
        categories {
          category
        }
      }
    }

    allServices: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
