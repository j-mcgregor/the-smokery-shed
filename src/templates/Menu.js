import React, { Fragment } from 'react';
import _get from 'lodash/get';
import { Link, graphql } from 'gatsby';
import { ChevronLeft } from 'react-feather';

import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
// import './Menu.scss';

export const MenuTemplate = ({ title, body, nextMenuURL, prevMenuURL, categories = [] }) => (
  <main>
    <article className="Menu section light" itemScope itemType="http://schema.org/BlogMenuing">
      <div className="container skinny">
        <Link className="Menu--BackButton" to="/blog/">
          <ChevronLeft /> BACK
        </Link>
        <div className="Menu--Content relative">
          <div className="Menu--Meta">
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span key={cat.category} className="Menu--Meta--Category">
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="Menu--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="Menu--InnerContent">
            <Content source={body} />
          </div>

          <div className="Menu--Pagination">
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
        </div>
      </div>
    </article>
  </main>
);

// Export Default Menu for front-end
const Menu = ({ data: { menu, allMenus } }) => {
  const thisEdge = allMenus.edges.find(edge => edge.node.id === menu.id);
  return (
    <Layout meta={menu.frontmatter.meta || false} title={menu.frontmatter.title || false}>
      <MenuTemplate
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
