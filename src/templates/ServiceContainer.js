import React from 'react';
import { graphql, Link } from 'gatsby';
import { Location } from '@reach/router';
import qs from 'qs';
import { Container, Row, Col } from 'react-bootstrap';

import Layout from '../components/layout/Layout';
import Content from '../components/layout/Content';
import PageHeader from '../components/pageComponents/PageHeader';
import ServiceSection from '../components/serviceComponents/ServiceSection';

/**
 * Filter services by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {services} object
 */
export const byDate = services => {
  const now = Date.now();
  return services.filter(service => Date.parse(service.date) <= now);
};

/**
 * filter services by category.
 *
 * @param {services} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (services, title, contentType) => {
  const isCategory = contentType === 'serviceCategories';
  const byCategory = service => service.categories && service.categories.filter(cat => cat.category === title).length;
  return isCategory ? services.filter(byCategory) : services;
};

// Export Template for use in CMS preview
export const ServiceContainerTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  services = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredServices = services && !!services.length ? byCategory(byDate(services), title, contentType) : [];

      let queryObj = location.search.replace('?', '');
      queryObj = qs.parse(queryObj);

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase();
        filteredServices = filteredServices.filter(service =>
          service.frontmatter.title.toLowerCase().includes(searchTerm)
        );
      }

      return (
        <main className="service">
          <PageHeader title={title} subtitle={subtitle} backgroundImage={featuredImage} />
          <div className="sticky-top sidebar">
            <ul>
              {filteredServices.map(f => (
                <li className="mv-2" key={f.slug}>
                  <Link to={f.slug}>{f.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Container className="pv-5">
            <Row className="pv-2 font-secondary fz-2">
              <Col md={{ span: 8, offset: 2 }}>
                {' '}
                <Content source={section1} />
              </Col>
            </Row>
            {!!services.length && (
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <ServiceSection services={filteredServices} />
                </Col>
              </Row>
            )}
          </Container>
        </main>
      );
    }}
  </Location>
);

// Export Default ServiceContainer for front-end
const ServiceContainer = ({ data: { page, services, serviceCategories } }) => {
  return (
    <Layout meta={page.frontmatter.meta || false} title={page.frontmatter.title || false}>
      <ServiceContainerTemplate
        {...page}
        {...page.fields}
        {...page.frontmatter}
        services={services.edges.map(service => ({
          ...service.node,
          ...service.node.frontmatter,
          ...service.node.fields
        }))}
        serviceCategories={serviceCategories.edges.map(service => ({
          ...service.node,
          ...service.node.frontmatter,
          ...service.node.fields
        }))}
      />
    </Layout>
  );
};

export default ServiceContainer;

export const pageQuery = graphql`
  ## Query for ServiceContainer data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ServiceContainer($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
        section1
      }
    }

    services: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    serviceCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "serviceCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
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
