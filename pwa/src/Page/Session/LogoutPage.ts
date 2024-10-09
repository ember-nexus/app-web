import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { pageStyle } from '../../Style/PageStyle';

@customElement('ember-nexus-core-logout-page')
class LogoutPage extends LitElement {
  static styles = [pageStyle];
  render(): TemplateResult {
    return html`<div class="page">
      <p>Logout page :D</p>
      <p>Info field to show whether user is already logged out</p>
      <p>Button to log out</p>
      <p>Link to login page</p>
      <p>Link to register page, if enabled</p>
      <p>Link to help article?</p>
    </div>`;
  }
}

export { LogoutPage };
