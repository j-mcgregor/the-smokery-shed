import React, { useEffect } from 'react';
import _get from 'lodash/get';
import { Link, graphql } from 'gatsby';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import PageHeader from '../components/pageComponents/PageHeader';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import _kebabCase from 'lodash/kebabCase';
import parseDiet from '../lib/parseDiet';
import checkArray from '../lib/checkArray';
import { PDFMenu, savePdf } from '../components/shared/PDFTemplate';

import './Service.scss';

export const SingleServiceTemplate = ({ title, body, featuredImage, nextServiceURL, prevServiceURL, serviceMenu }) => {
  const mappedMenu = {};

  if (serviceMenu) {
    const {
      node: { id, frontmatter }
    } = serviceMenu;
    if (id) mappedMenu.id = id;
    if (frontmatter.name) mappedMenu.name = frontmatter.name;
    if (frontmatter.price) mappedMenu.price = frontmatter.price;
    if (frontmatter.menuSections) {
      mappedMenu.sections = frontmatter.menuSections.map(ms => ({
        section: ms.menuItemGroup,
        dishes: ms.dishes.map(d => ({
          dish: d.menuItem,
          dietRestrictions: d.dietList
        }))
      }));
    }
    if (frontmatter.extra) {
      mappedMenu.extras = frontmatter.extra.map(e => e.info);
    }
  }

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

  const handleDownload = async () => {
    const doc = <PDFMenu menu={mappedMenu} />;
    await savePdf(doc, mappedMenu.name);
  };

  const menuCard = (
    <Card className="text-center font-primary fz-3 ls-1">
      <Card.Body>
        <Card.Title>
          <h2 className="fz-4-5">{mappedMenu.name} menu</h2>
          <hr />
        </Card.Title>
        {checkArray(mappedMenu, 'sections')
          ? mappedMenu.sections.map(mm => {
              return (
                <div key={_kebabCase(mm.section)} className="py-4">
                  <h3 className="fz-3-5">{mm.section}</h3>
                  {checkArray(mm, 'dishes')
                    ? mm.dishes.map(d => {
                        return (
                          <Card.Text className="fz-2-5" key={_kebabCase(d.dish)}>
                            {d.dish}{' '}
                            {checkArray(d, 'dietRestrictions')
                              ? d.dietRestrictions.map(dt => (
                                  <small key={dt.diet} className="px-2 fz-2" title={dt.diet}>
                                    ({parseDiet(dt.diet)})
                                  </small>
                                ))
                              : null}
                          </Card.Text>
                        );
                      })
                    : null}
                </div>
              );
            })
          : null}
        <hr />
        {mappedMenu.price}
        <div className="pt-4 pb-4" />
        {mappedMenu.extras &&
          mappedMenu.extras.map(e => (
            <p className="fz-1-5 font-secondary" key={_kebabCase(e)}>
              {e}
            </p>
          ))}
      </Card.Body>
    </Card>
  );

  return (
    <main className="service">
      <PageHeader title={title} backgroundImage={featuredImage} />
      <Container className="pv-5">
        <Row className="pv-2">
          <Col sm={{ span: 8, offset: 2 }}>
            <div className="Service--Pagination flex space-between">
              {prevServiceURL && (
                <Link className="Service--Pagination--Link prev" to={prevServiceURL}>
                  Previous
                </Link>
              )}
              {nextServiceURL && (
                <Link className="Service--Pagination--Link next" to={nextServiceURL}>
                  Next
                </Link>
              )}
            </div>
          </Col>
        </Row>
        <Row className="pv-2 font-secondary fz-2">
          <Col sm={{ span: 8, offset: 2 }}>
            <Content source={body} />
          </Col>
        </Row>
        <Row className="pv-2 text-center">
          <Col sm={{ span: 8, offset: 2 }}>
            {mappedMenu && mappedMenu.hasOwnProperty('sections') ? menuCard : null}
            {mappedMenu && mappedMenu.name && mappedMenu.price && mappedMenu.sections ? (
              <Button variant="dark" onClick={handleDownload} className="fz-3 my-5 font-primary px-5 py-2">
                <FontAwesomeIcon icon={faDownload} size="1x" /> Download Menu
              </Button>
            ) : null}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

// Export Default Service for front-end
const Service = ({ data: { service, allServices, allMenus } }) => {
  const thisEdge = allServices.edges.find(edge => edge.node.id === service.id);
  const menu = allMenus.edges.find(edge => _get(edge, 'node.frontmatter.name') === service.frontmatter.menu);
  return (
    <Layout meta={service.frontmatter.meta || false} title={service.frontmatter.title || false}>
      <SingleServiceTemplate
        {...service}
        {...service.frontmatter}
        serviceMenu={menu}
        body={service.html}
        nextServiceURL={_get(thisEdge, 'next.fields.slug')}
        prevServiceURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  );
};

export default Service;

// Srvice has a menu which has menuItems
export const pageQuery = graphql`
  ## Query for Service data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file

  query Service($id: String!) {
    service: markdownRemark(id: { eq: $id }) {
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
        menu
      }
    }

    allServices: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "services" } } }
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
    allMenus: allMarkdownRemark(filter: { fields: { contentType: { eq: "menus" } } }) {
      edges {
        node {
          id
          frontmatter {
            name
            price
            extra {
              info
            }
            menuSections {
              menuItemGroup
              dishes {
                menuItem
                dietList {
                  diet
                }
              }
            }
          }
        }
      }
    }
  }
`;
