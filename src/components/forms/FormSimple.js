import React from 'react';
import { Form, Button } from 'react-bootstrap';

const { Group, Label, Control } = Form;

export default ({ rows = 10, subject = '', dropdownOptions = [] }) => {
  return (
    <Form name="footer-form" data-netlify="true" data-netlify-honeypot="bot-field" className="fz-2">
      <Group controlId="formBasicName">
        <Label>Name</Label>
        <Control size="lg" type="text" placeholder="Name" name="name" className="fz-2" />
      </Group>
      <Group controlId="formBasicEmail">
        <Label>Email</Label>
        <Control size="lg" type="email" placeholder="Enter email" name="email" className="fz-2" />
      </Group>
      <Group controlId="formBasicEnquiryType">
        <Label>Type of Enquiry</Label>
        <Control size="lg" as="select" className="fz-2" name="enquiry">
          {dropdownOptions.length && dropdownOptions.map((et, i) => <option key={`${et.type}-${i}`}>{et.type}</option>)}
        </Control>
      </Group>
      <Group controlId="formBasicMessage">
        <Label>Message</Label>
        <Control size="lg" as="textarea" rows={rows} className="fz-2" name="message" />
      </Group>
      <input type="text" name="_gotcha" style={{ display: 'none' }} />
      {!!subject && <input type="hidden" name="subject" value={subject} />}
      <input type="hidden" name="form-name" value="footer-form" />
      <Button variant="dark" type="submit" className="fz-2">
        Send message
      </Button>
    </Form>
  );
};
