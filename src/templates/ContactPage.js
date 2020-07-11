import React from 'react';
import { MapPin, Smartphone, Mail, Facebook, Twitter, Instagram, Youtube } from 'react-feather';
import { faPinterest, faEtsy } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';

import PageHeader from '../components/pageComponents/PageHeader';
import FormSimpleAjax from '../components/forms/FormSimpleAjax';
import Content from '../components/layout/Content';
import Layout from '../components/layout/Layout';
import './ContactPage.scss';

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  featuredImage,
  address,
  phone,
  facebook,
  twitter,
  instagram,
  youtube,
  etsy,
  pinterest,
  email,
  enquiryType
}) => (
  <main className="Contact">
    <PageHeader title={title} backgroundImage={featuredImage} />
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <div>
          <Content source={body} />
          <div className="Contact--Details">
            {address && (
              <div className="Contact--Details--Item">
                <a
                  href={`https://www.google.com.au/maps/search/${encodeURI(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin /> {address}
                </a>
              </div>
            )}
            {phone && (
              <div className="Contact--Details--Item">
                <a href={`tel:${phone}`}>
                  <Smartphone /> {phone}
                </a>
              </div>
            )}
            {email && (
              <div className="Contact--Details--Item">
                <a href={`mailto:${email}`}>
                  <Mail /> {email}
                </a>
              </div>
            )}
            <div className="flex">
              {facebook && (
                <a className="Contact--Details--Item" href={facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook />
                </a>
              )}
              {twitter && (
                <a className="Contact--Details--Item" href={twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </a>
              )}
              {instagram && (
                <a className="Contact--Details--Item" href={instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </a>
              )}
              {youtube && (
                <a className="Contact--Details--Item" href={youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube />
                </a>
              )}
              {pinterest && (
                <a className="Contact--Details--Item" href={pinterest} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
              )}
              {etsy && (
                <a className="Contact--Details--Item" href={etsy} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faEtsy} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div>
          <FormSimpleAjax formName="Contact Form" name="Contact page" enquiryType={enquiryType} />
        </div>
      </div>
    </section>
  </main>
);

const ContactPage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false} title={page.frontmatter.title || false}>
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
);

export default ContactPage;

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        address
        phone
        email
        facebook
        twitter
        instagram
        youtube
        locations {
          mapLink
          lat
          lng
        }
        enquiryType {
          type
        }
      }
    }
  }
`;
