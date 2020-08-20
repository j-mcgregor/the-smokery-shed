import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { stringify } from 'qs';
import { serialize } from 'dom-form-serializer';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: '',
      disabled: false
    };
  }

  static defaultProps = {
    name: 'Form',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage: 'There is a problem, your message has not been sent, please try contacting us via email'
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.disabled) return;

    const form = e.target;
    const data = serialize(form);

    this.setState({ disabled: true });

    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res;
        } else {
          throw new Error('Network error');
        }
      })
      .then(() => {
        form.reset();
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        });
      });
  };

  render() {
    const { subject, enquiryType = [], showLabels = true, formName } = this.props;

    return (
      <Fragment>
        <form
          className="Form m-0"
          onSubmit={this.handleSubmit}
          name={formName}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {this.state.alert && <div className="Form--Alert">{this.state.alert}</div>}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Firstname"
                name="firstname"
                required
              />
              {showLabels && <span>Firstname</span>}
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
              />
              {showLabels && <span>Lastname</span>}
            </label>
          </div>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
            />
            {showLabels && <span>Email address</span>}
          </label>
          <label className="Form--Label has-arrow">
            <select className="Form--Input Form--Select" name="type" defaultValue="Type of Enquiry" required>
              <option disabled hidden>
                Type of Enquiry
              </option>
              {enquiryType.length && enquiryType.map((et, i) => <option key={`${et.type}-${i}`}>{et.type}</option>)}
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
            />
            {showLabels && <span>Message</span>}
          </label>
          <label className="Form--Label Form-Checkbox">
            <input className="Form--Input Form--Textarea Form--CheckboxInput" name="newsletter" type="checkbox" />
            <span>Get news updates</span>
          </label>
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={this.props.formName} />
          <input className="Button Form--SubmitButton" type="submit" value="Send" disabled={this.state.disabled} />
          <p className="hidden">
            <label>
              <input name="bot-field" type="hidden" />
            </label>
          </p>
        </form>
      </Fragment>
    );
  }
}

export default Form;
