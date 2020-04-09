import React from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';
import qs from 'qs';

import PageHeader from '../components/pageComponents/PageHeader';
import MenuSection from '../components/menuComponents/MenuSection';
import MenuCategoriesNav from '../components/menuComponents/MenuCategoriesNav';
import Layout from '../components/layout/Layout';

/**
 * Filter menus by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {menus} object
 */
export const byDate = menus => {
  const now = Date.now();
  return menus.filter(menu => Date.parse(menu.date) <= now);
};

/**
 * filter menus by category.
 *
 * @param {menus} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (menus, title, contentType) => {
  const isCategory = contentType === 'menuCategories';
  const byCategory = menu => menu.categories && menu.categories.filter(cat => cat.category === title).length;
  return isCategory ? menus.filter(byCategory) : menus;
};

// Export Template for use in CMS preview
export const MenuContainerTemplate = ({
  title,
  subtitle,
  featuredImage,
  menus = [],
  menuCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredMenus = menus && !!menus.length ? byCategory(byDate(menus), title, contentType) : [];

      let queryObj = location.search.replace('?', '');
      queryObj = qs.parse(queryObj);

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase();
        filteredMenus = filteredMenus.filter(menu => menu.frontmatter.title.toLowerCase().includes(searchTerm));
      }

      return (
        <main className="Blog">
          <PageHeader title={title} subtitle={subtitle} backgroundImage={featuredImage} />

          {!!menuCategories.length && (
            <section className="section thin">
              <div className="container">
                <MenuCategoriesNav enableSearch categories={menuCategories} />
              </div>
            </section>
          )}

          {!!menus.length && (
            <section className="section">
              <div className="container">
                <MenuSection menus={filteredMenus} />
              </div>
            </section>
          )}
        </main>
      );
    }}
  </Location>
);

// Export Default MenuContainer for front-end
const MenuContainer = ({ data: { page, menus, menuCategories } }) => (
  <Layout meta={page.frontmatter.meta || false} title={page.frontmatter.title || false}>
    <MenuContainerTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      menus={menus.edges.map(menu => ({
        ...menu.node,
        ...menu.node.frontmatter,
        ...menu.node.fields
      }))}
      menuCategories={menuCategories.edges.map(menu => ({
        ...menu.node,
        ...menu.node.frontmatter,
        ...menu.node.fields
      }))}
    />
  </Layout>
);

export default MenuContainer;

export const pageQuery = graphql`
  ## Query for MenuContainer data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query MenuContainer($id: String!) {
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

    menus: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "menus" } } }
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
    menuCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "menuCategories" } } }
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
