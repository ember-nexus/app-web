import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ember-nexus-error-page-not-found')
class PageNotFound extends LitElement {
  render(): TemplateResult {
    return html`<div>
      <h1>404</h1>
      <p>Page not found</p>
    </div>`;
  }
}

export { PageNotFound };
