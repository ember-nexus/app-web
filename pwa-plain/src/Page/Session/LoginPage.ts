import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {pageStyle} from "../../Style/PageStyle";

@customElement('ember-nexus-core-login-page')
class LoginPage extends LitElement {
  static styles = [pageStyle];
  render(): TemplateResult {
    return html`<div class="page">
      <p>Login page :D</p>
      <p>Username field (dynamic name from API)</p>
      <p>Password field</p>
      <p>Login button</p>
      <p>Error message, if any</p>
      <p>Link to help page, if any</p>
      <p>Link to register page, if enabled</p>
      <p>Link to special token login page?</p>
    </div>`;
  }
}

export { LoginPage };
