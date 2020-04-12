import React from 'react';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import { Fade } from 'react-slideshow-image';

import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './AboutPage.scss';

const CustomSlider = ({ slides = [], title, subtitle = '' }) => {
  const settings = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: false,
    arrows: false,
    onChange: (oldIndex, newIndex) => {
      console.log(`fade transition from ${oldIndex} to ${newIndex}`);
    },
    autoplay: true
  };
  return (
    <div className="PageHeader p-0 slide-container " style={{ height: '600px' }}>
      <Fade {...settings}>
        {slides.map(s => (
          <div className="each-fade">
            <div
              className="image-container flex flex-center"
              style={{
                background: `url(${s.image})`,
                height: 600,
                backgroundSize: 'cover',
                backgroundRepeat: 'no repeat'
              }}
            >
              <h1 className="PageHeader--Title">
                <span />
                {title}
              </h1>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

// Export Template for use in CMS preview
export const AboutTemplate = ({ title, subtitle, featuredImage, section1, image1, section2, image2, slideshow }) => (
  <main className="About">
    <CustomSlider slides={slideshow} title={title} subtitle={subtitle} />
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
        slideshow {
          image
          alt
        }
      }
    }
  }
`;
