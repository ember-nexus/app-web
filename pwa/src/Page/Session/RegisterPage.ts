import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";

@customElement('ember-nexus-core-register-page')
class RegisterPage extends LitElement {
  static styles = [pageStyle];
  render(): TemplateResult {
    return html`<div class="page">
      <p>Register page :D</p>
      <p>Info field if user is already logged in</p>
      <p>Username input field, with custom name from API</p>
      <p>Password input field</p>
      <p>Second password field to check password</p>
      <p>Info if password is insecure (length only)</p>
      <p>Link to secure password guide</p>
      <p>Error message if registration is disabled</p>
      <p>Link to registration help article</p>
      <p>Error messages from API, if any problem is encountered</p>
      <p>Info text if registration was successful</p>
      <p>Link to login page</p>
    </div>`;
  }
}

export { RegisterPage };
