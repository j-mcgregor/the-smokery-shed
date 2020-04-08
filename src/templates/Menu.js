import React, { Fragment } from 'react';
import _get from 'lodash/get';
import { Link, graphql } from 'gatsby';
import { ChevronLeft } from 'react-feather';

import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './Menu.scss';

export const SingleMenuTemplate = ({ title, date, body, nextMenuURL, prevMenuURL, categories = [] }) => (
  <main>
    <article className="Menu section light" itemScope itemType="http://schema.org/BlogPosting">
      <div className="container skinny">
        <Link className="Menu--BackButton" to="/menus">
          <ChevronLeft /> BACK
        </Link>
        <div className="Menu--Content relative">
          <div className="Menu--Meta">
            {date && (
              <time className="Menu--Meta--Date" itemProp="dateCreated pubdate datePublished" date={date}>
                {date}
              </time>
            )}
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
                Previous Post
              </Link>
            )}
            {nextMenuURL && (
              <Link className="Menu--Pagination--Link next" to={nextMenuURL}>
                Next Post
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
);

// Export Default Menu for front-end
const Menu = ({ data: { post, allMenus } }) => {
  const thisEdge = allMenus.edges.find(edge => edge.node.id === post.id);
  return (
    <Layout meta={post.frontmatter.meta || false} title={post.frontmatter.title || false}>
      <SingleMenuTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
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
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
      }
    }

    allMenus: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
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
