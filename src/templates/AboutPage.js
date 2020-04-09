import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './AboutPage.scss';

// Export Template for use in CMS preview
export const AboutTemplate = ({ title, subtitle, featuredImage, section1, image1, section2, image2 }) => (
  <main className="About">
    <PageHeader title={title} subtitle={subtitle} backgroundImage={featuredImage} />

    <section className="section__1">
      <div className="container">
        <Content source={section1} />
      </div>
    </section>

    <section className="section__2">
      <div className="container">
        <Content source={section2} />
      </div>
    </section>
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
