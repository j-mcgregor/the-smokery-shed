import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Meta from '../Meta';
import Nav from './Nav';
import Footer from './Footer';

import 'modern-normalize/modern-normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../stylesheets/main.scss';
import 'typeface-amatic-sc';
import 'typeface-josefin-slab';

export default ({ children, meta, title }) => {
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            googleTrackingId
            socialMediaCard {
              image
            }
          }
          allPosts: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "postCategories" } } }
            sort: { order: DESC, fields: [frontmatter___date] }
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
          services: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "services" } } }
            sort: { order: DESC, fields: [frontmatter___date] }
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
          social: markdownRemark(fields: { slug: {} }, frontmatter: { slug: { glob: "contact" } }) {
            frontmatter {
              facebook
              twitter
              youtube
              instagram
              address
              email
              phone
              enquiryType {
                type
              }
            }
          }
        }
      `}
      render={data => {
        const { siteTitle, socialMediaCard, googleTrackingId } = data.settingsYaml || {};
        const subNav = {
          posts: data.allPosts.hasOwnProperty('edges')
            ? data.allPosts.edges.map(post => {
                return { ...post.node.fields, ...post.node.frontmatter };
              })
            : false,
          services: data.services.hasOwnProperty('edges')
            ? data.services.edges.map(service => {
                return { ...service.node.fields, ...service.node.frontmatter };
              })
            : false,
          social: data.social.hasOwnProperty('frontmatter') ? data.social.frontmatter : false
        };

        return (
          <Fragment>
            <Helmet defaultTitle={siteTitle} titleTemplate={`%s | ${siteTitle}`}>
              {title}
              <link href="https://ucarecdn.com" rel="preconnect" crossorigin />
              <link rel="dns-prefetch" href="https://ucarecdn.com" />
              {/* Add font link tags here */}
            </Helmet>
            <Meta
              googleTrackingId={googleTrackingId}
              absoluteImageUrl={socialMediaCard && socialMediaCard.image && socialMediaCard.image}
              {...meta}
              {...data.settingsYaml}
            />

            <Nav subNav={subNav} />

            <Fragment>{children}</Fragment>

            <Footer social={subNav.social} />
          </Fragment>
        );
      }}
    />
  );
};
