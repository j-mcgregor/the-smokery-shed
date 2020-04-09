import React, { useEffect } from 'react';
import _get from 'lodash/get';
import { Link, graphql } from 'gatsby';
import { ChevronLeft } from 'react-feather';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './Menu.scss';
import { Container, Row, Col } from 'react-bootstrap';

export const SingleMenuTemplate = ({ title, body, featuredImage, nextMenuURL, prevMenuURL, ...props }) => {
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
    <main className="menu">
      <PageHeader title={title} backgroundImage={featuredImage} />
      <Container className="pv-5">
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Link className="Menu--BackButton" to="/menus">
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
            <div className="Menu--Pagination flex space-between">
              {prevMenuURL && (
                <Link className="Menu--Pagination--Link prev" to={prevMenuURL}>
                  Previous Menu
                </Link>
              )}
              {nextMenuURL && (
                <Link className="Menu--Pagination--Link next" to={nextMenuURL}>
                  Next Menu
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

// Export Default Menu for front-end
const Menu = ({ data: { menu, allMenus } }) => {
  const thisEdge = allMenus.edges.find(edge => edge.node.id === menu.id);
  return (
    <Layout meta={menu.frontmatter.meta || false} title={menu.frontmatter.title || false}>
      <SingleMenuTemplate
        {...menu}
        {...menu.frontmatter}
        body={menu.html}
        nextMenuURL={_get(thisEdge, 'next.fields.slug')}
        prevMenuURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  );
};

export default Menu;

export const pageQuery = graphql`
  ## Query for Menu data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file

  query Menu($id: String!) {
    menu: markdownRemark(id: { eq: $id }) {
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

    allMenus: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "menus" } } }
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
