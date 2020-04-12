import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const simpleForm = ({
  name = 'Simple Form',
  subject = '', // optional subject of the notification email
  action = '',
  rows = 10
}) => (
  <form className="Form" name={name} action={action} data-netlify="" data-netlify-honeypot="_gotcha">
    <label className="Form--Label">
      <input className="Form--Input" type="text" placeholder="Name" name="name" required />
    </label>
    <label className="Form--Label">
      <input className="Form--Input" type="email" placeholder="Email" name="email" required />
    </label>
    <label className="Form--Label has-arrow">
      <select className="Form--Input Form--Select" name="type" defaultValue="Type of Enquiry" required>
        <option disabled hidden>
          Type of Enquiry
        </option>
        <option>Need to know more</option>
        <option>Found a bug</option>
        <option>Want to say hello</option>
      </select>
    </label>
    <label className="Form--Label">
      <textarea className="Form--Input Form--Textarea" placeholder="Message" name="message" rows={rows} required />
    </label>
    <input type="text" name="_gotcha" style={{ display: 'none' }} />
    {!!subject && <input type="hidden" name="subject" value={subject} />}
    <input type="hidden" name="form-name" value={name} />
    <input className="Button Form--SubmitButton" type="submit" value="Enquire" />
  </form>
);

export default ({ rows = 10, subject = '' }) => {
  return (
    <Form name="footer-form" data-netlify="true" data-netlify-honeypot="bot-field" className="fz-2">
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control size="lg" type="text" placeholder="Name" name="name" className="fz-2" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control size="lg" type="email" placeholder="Enter email" name="email" className="fz-2" />
      </Form.Group>
      <Form.Group controlId="formBasicEnquiryType">
        <Form.Label>Type of Enquiry</Form.Label>
        <Form.Control size="lg" as="select" className="fz-2" name="enquiry">
          <option>Need to know more</option>
          <option>Found a bug</option>
          <option>Want to say hello</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control size="lg" as="textarea" rows={rows} className="fz-2" name="message" />
      </Form.Group>
      <input type="text" name="_gotcha" style={{ display: 'none' }} />
      {!!subject && <input type="hidden" name="subject" value={subject} />}
      <input type="hidden" name="form-name" value="footer-form" />
      <Button variant="dark" type="submit" className="fz-2">
        Send message
      </Button>
    </Form>
  );
};
