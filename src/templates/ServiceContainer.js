import React from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';
import qs from 'qs';

import PageHeader from '../components/pageComponents/PageHeader';
import ServiceSection from '../components/serviceComponents/ServiceSection';
import ServiceCategoriesNav from '../components/serviceComponents/ServiceCategoriesNav';
import Layout from '../components/layout/Layout';

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
  services = [],
  serviceCategories = [],
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
        <main className="Blog">
          <PageHeader title={title} subtitle={subtitle} backgroundImage={featuredImage} />

          {!!serviceCategories.length && (
            <section className="section thin">
              <div className="container">
                <ServiceCategoriesNav enableSearch categories={serviceCategories} />
              </div>
            </section>
          )}

          {!!services.length && (
            <section className="section">
              <div className="container">
                <ServiceSection services={filteredServices} />
              </div>
            </section>
          )}
        </main>
      );
    }}
  </Location>
);

// Export Default ServiceContainer for front-end
const ServiceContainer = ({ data: { page, services, serviceCategories } }) => (
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
