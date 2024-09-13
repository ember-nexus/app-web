import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ember-nexus-router')
class Router extends LitElement {
  render(): TemplateResult {
    return html`<div>
      <p>Router :D</p>
    </div>`;
  }
}

export { Router };
