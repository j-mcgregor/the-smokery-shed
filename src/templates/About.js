import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './About.scss';

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
  query About($id: String!) {
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
