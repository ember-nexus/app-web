import {LitElement, TemplateResult, html, css} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import iconArrowRight from '@mdi/svg/svg/arrow-right.svg';
import iconArrowTopRight from '@mdi/svg/svg/arrow-top-right.svg';

@customElement('ember-nexus-core-link-with-icon')
class LinkWithIconComponent extends LitElement {
  static styles = [
    css`div {
      color: red;
    }`
  ];

  @property()
  href?: string;

  @property()
  text?: string;

  render(): TemplateResult {
    let icon = iconArrowRight;
    if (true) {
      icon = iconArrowTopRight;
    }
    return html`
      <a href="${this.href}">
        <ember-nexus-core-icon src="${icon}"></ember-nexus-core-icon>
        ${this.text}
      </a>
    `;
  }
}

export { LinkWithIconComponent };
