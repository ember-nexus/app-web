import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ember-nexus-layout-page')
class PageLayout extends LitElement {
  render(): TemplateResult {
    return html`<div>
      <p>Page Layout :D</p>
    </div>`;
  }
}

export { PageLayout };
